import { promisePool } from "./config";
import { ArticleStats } from "./types";

// 更新文章收藏数
export async function updateFavorites(
  slug: string,
  userId: string,
  action: "favorite" | "unfavorite"
): Promise<void> {
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

    if (action === "favorite") {
      // 确保文章存在于 article_interactions 表中
      await conn.query(
        `INSERT INTO article_interactions (article_slug, views, likes, favorites)
         VALUES (?, 0, 0, 0)
         ON DUPLICATE KEY UPDATE article_slug = article_slug`,
        [slug]
      );
      
      await conn.query(
        "INSERT INTO article_favorites (article_slug, user_id) VALUES (?, ?)",
        [slug, userId]
      );
      await conn.query(
        `UPDATE article_interactions 
         SET favorites = COALESCE(favorites, 0) + 1 
         WHERE article_slug = ?`,
        [slug]
      );
    } else {
      await conn.query(
        "DELETE FROM article_favorites WHERE article_slug = ? AND user_id = ?",
        [slug, userId]
      );
      await conn.query(
        `UPDATE article_interactions 
         SET favorites = GREATEST(COALESCE(favorites, 0) - 1, 0) 
         WHERE article_slug = ?`,
        [slug]
      );
    }

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

// 检查用户是否已收藏
export async function hasUserFavorited(
  slug: string,
  userId: string
): Promise<boolean> {
  const [rows] = await promisePool.query(
    "SELECT 1 FROM article_favorites WHERE article_slug = ? AND user_id = ?",
    [slug, userId]
  );
  return Array.isArray(rows) && rows.length > 0;
}

// 更新文章浏览量
export async function incrementViews(slug: string): Promise<void> {
  const conn = await promisePool.getConnection();
  try {
    await conn.beginTransaction();

    // 记录具体的访问记录
    await conn.query(
      "INSERT INTO article_views (article_slug) VALUES (?)",
      [slug]
    );

    // 更新文章总访问量
    await conn.query(
      `INSERT INTO article_interactions (article_slug, views) 
       VALUES (?, 1) 
       ON DUPLICATE KEY UPDATE views = views + 1`,
      [slug]
    );

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

// 更新文章点赞数
export async function updateLikes(
  slug: string,
  userId: string,
  action: "like" | "unlike"
): Promise<void> {
  const conn = await promisePool.getConnection();
  try {
    await conn.beginTransaction();

    if (action === "like") {
      await conn.query(
        "INSERT INTO article_likes (article_slug, user_id) VALUES (?, ?)",
        [slug, userId]
      );
      await conn.query(
        `UPDATE article_interactions 
         SET likes = likes + 1 
         WHERE article_slug = ?`,
        [slug]
      );
    } else {
      await conn.query(
        "DELETE FROM article_likes WHERE article_slug = ? AND user_id = ?",
        [slug, userId]
      );
      await conn.query(
        `UPDATE article_interactions 
         SET likes = GREATEST(likes - 1, 0) 
         WHERE article_slug = ?`,
        [slug]
      );
    }

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

// 检查用户是否已点赞
export async function hasUserLiked(
  slug: string,
  userId: string
): Promise<boolean> {
  const [rows] = await promisePool.query(
    "SELECT 1 FROM article_likes WHERE article_slug = ? AND user_id = ?",
    [slug, userId]
  );
  return Array.isArray(rows) && rows.length > 0;
}

// 更新文章阅读时间统计
export async function updateReadingStats(
  slug: string,
  readTime: number
): Promise<void> {
  await promisePool.query(
    `INSERT INTO article_stats 
     (article_slug, total_read_time, avg_read_time) 
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE 
     total_read_time = total_read_time + ?,
     avg_read_time = (total_read_time + ?) / 2`,
    [slug, readTime, readTime, readTime, readTime]
  );
}

// 获取文章统计数据
export async function getArticleStats(
  slug: string
): Promise<ArticleStats | null> {
  const [interactions] = await promisePool.query(
    `SELECT i.views, i.likes, i.favorites, COALESCE(s.avg_read_time, 0) as avg_read_time, 
            COALESCE(s.total_comments, 0) as total_comments
     FROM article_interactions i
     LEFT JOIN article_stats s ON i.article_slug = s.article_slug
     WHERE i.article_slug = ?`,
    [slug]
  );

  if (Array.isArray(interactions) && interactions.length > 0) {
    const stats = interactions[0] as any;
    return {
      views: stats.views,
      likes: stats.likes,
      totalComments: stats.total_comments,
      avgReadTime: stats.avg_read_time,
      favorites: stats.favorites || 0,
    };
  }
  return null;
}