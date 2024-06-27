CREATE TABLE user_role(
    id SERIAL PRIMARY KEY,
    rolename VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    mobile_no VARCHAR(50) NOT NULL,
    country_code VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    bio TEXT,
    role INTEGER REFERENCES user_role(id),
    profile_picture_url TEXT,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_mobile_no_verified BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add a column to track who created the user
ALTER TABLE users
ADD COLUMN created_by INTEGER REFERENCES users(id);

CREATE TABLE user_sessions(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token VARCHAR(255),
    refresh_token VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by INTEGER REFERENCES users(id)
);

CREATE TABLE error_logs(
    id SERIAL PRIMARY KEY,
    error_message TEXT,
    stack_trace TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_audit_logs(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    created_by INTEGER REFERENCES users(id),
    action VARCHAR(100),
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);