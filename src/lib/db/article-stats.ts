import { promisePool } from "./config";

export interface ArticleStats {
  slug: string;
  views: number;
  likes: number;
  likedBy?: string[];
}

export class ArticleStatsService {
  static async getStats(slug: string): Promise<ArticleStats> {
    const [rows] = await promisePool.query(
      `SELECT 
        i.article_slug, 
        i.views, 
        i.likes,
        GROUP_CONCAT(al.user_id) as liked_by
      FROM article_interactions i
      LEFT JOIN article_likes al ON i.article_slug = al.article_slug
      WHERE i.article_slug = ?
      GROUP BY i.article_slug`,
      [slug]
    );

    if (Array.isArray(rows) && rows.length > 0) {
      const row = rows[0] as any;
      return {
        slug: row.article_slug,
        views: row.views,
        likes: row.likes,
        likedBy: row.liked_by ? row.liked_by.split(",") : [],
      };
    }

    // 如果文章不存在，创建新记录
    await promisePool.query(
      "INSERT INTO article_interactions (article_slug, views, likes) VALUES (?, 0, 0)",
      [slug]
    );

    return { slug, views: 0, likes: 0, likedBy: [] };
  }

  static async incrementViews(slug: string): Promise<void> {
    await promisePool.query(
      "INSERT INTO article_interactions (article_slug, views, likes) VALUES (?, 1, 0) ON DUPLICATE KEY UPDATE views = views + 1",
      [slug]
    );
  }

  static async toggleLike(slug: string, userId: string): Promise<boolean> {
    const conn = await promisePool.getConnection();
    try {
      await conn.beginTransaction();

      // 确保用户存在
      const [userRows] = await conn.query("SELECT 1 FROM users WHERE id = ?", [
        userId,
      ]);

      if (!Array.isArray(userRows) || userRows.length === 0) {
        // 创建匿名用户
        await conn.query("INSERT INTO users (id, name) VALUES (?, ?)", [
          userId,
          "Anonymous User",
        ]);
      }

      // 检查是否已经点赞
      const [rows] = await conn.query(
        "SELECT 1 FROM article_likes WHERE article_slug = ? AND user_id = ?",
        [slug, userId]
      );

      if (Array.isArray(rows) && rows.length > 0) {
        // 取消点赞
        await conn.query(
          "DELETE FROM article_likes WHERE article_slug = ? AND user_id = ?",
          [slug, userId]
        );
        await conn.query(
          "UPDATE article_interactions SET likes = GREATEST(likes - 1, 0) WHERE article_slug = ?",
          [slug]
        );
        await conn.commit();
        return false;
      } else {
        // 添加点赞
        await conn.query(
          "INSERT INTO article_likes (article_slug, user_id) VALUES (?, ?)",
          [slug, userId]
        );
        await conn.query(
          "INSERT INTO article_interactions (article_slug, views, likes) VALUES (?, 0, 1) ON DUPLICATE KEY UPDATE likes = likes + 1",
          [slug]
        );
        await conn.commit();
        return true;
      }
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  static async toggleFavorite(slug: string, userId: string): Promise<boolean> {
    const conn = await promisePool.getConnection();
    try {
      await conn.beginTransaction();

      // 确保用户存在
      const [userRows] = await conn.query("SELECT 1 FROM users WHERE id = ?", [
        userId,
      ]);

      if (!Array.isArray(userRows) || userRows.length === 0) {
        // 创建匿名用户
        await conn.query("INSERT INTO users (id, name) VALUES (?, ?)", [
          userId,
          "Anonymous User",
        ]);
      }

      // 检查是否已经收藏
      const [rows] = await conn.query(
        "SELECT 1 FROM article_favorites WHERE article_slug = ? AND user_id = ?",
        [slug, userId]
      );

      if (Array.isArray(rows) && rows.length > 0) {
        // 取消收藏
        await conn.query(
          "DELETE FROM article_favorites WHERE article_slug = ? AND user_id = ?",
          [slug, userId]
        );
        await conn.query(
          "UPDATE article_interactions SET favorites = GREATEST(favorites - 1, 0) WHERE article_slug = ?",
          [slug]
        );
        await conn.commit();
        return false;
      } else {
        // 添加收藏
        await conn.query(
          "INSERT INTO article_favorites (article_slug, user_id) VALUES (?, ?)",
          [slug, userId]
        );
        await conn.query(
          "INSERT INTO article_interactions (article_slug, views, likes, favorites) VALUES (?, 0, 0, 1) ON DUPLICATE KEY UPDATE favorites = favorites + 1",
          [slug]
        );
        await conn.commit();
        return true;
      }
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}
