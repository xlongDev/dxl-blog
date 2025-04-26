-- 创建文章访问记录表
CREATE TABLE IF NOT EXISTS article_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  article_slug VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_article_slug (article_slug),
  INDEX idx_created_at (created_at)
);

-- 创建文章评论表
CREATE TABLE IF NOT EXISTS article_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  article_slug VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_article_slug (article_slug),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);