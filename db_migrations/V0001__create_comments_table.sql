CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    story_id VARCHAR(50) NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_story_id ON comments(story_id);
