-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 文章互动表
CREATE TABLE IF NOT EXISTS article_interactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    article_slug VARCHAR(255) NOT NULL,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    favorites INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_article (article_slug)
);

-- 用户点赞记录表
CREATE TABLE IF NOT EXISTS article_likes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    article_slug VARCHAR(255) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_like (article_slug, user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 用户收藏记录表
CREATE TABLE IF NOT EXISTS article_favorites (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    article_slug VARCHAR(255) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_favorite (article_slug, user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 评论表
CREATE TABLE IF NOT EXISTS comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    article_slug VARCHAR(255) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    parent_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- 文章统计表
CREATE TABLE IF NOT EXISTS article_stats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    article_slug VARCHAR(255) NOT NULL,
    total_read_time INT DEFAULT 0,
    avg_read_time INT DEFAULT 0,
    total_comments INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_article_stats (article_slug)
);

-- 文章访问记录表
CREATE TABLE IF NOT EXISTS article_visits (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    article_slug VARCHAR(255) NOT NULL,
    user_id VARCHAR(36),
    ip_address VARCHAR(45),
    user_agent TEXT,
    visit_duration INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 用户活动记录表
CREATE TABLE IF NOT EXISTS user_activities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    activity_type ENUM('view', 'like', 'favorite', 'comment') NOT NULL,
    article_slug VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);