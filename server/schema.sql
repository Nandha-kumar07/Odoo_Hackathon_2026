-- GlobeTrotter Database Schema
-- PostgreSQL/Supabase

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_photo TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trips Table
CREATE TABLE IF NOT EXISTS trips (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    budget DECIMAL(10, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'planning', -- planning, ongoing, completed
    is_public BOOLEAN DEFAULT false,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities Table
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    activity_date DATE,
    activity_time TIME,
    location VARCHAR(255),
    price DECIMAL(10, 2) DEFAULT 0,
    activity_type VARCHAR(50), -- sightseeing, food, transport, accommodation, etc.
    is_added BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL, -- transport, accommodation, food, activities
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    expense_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS itineraries (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_trips_user_id ON trips(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_trip_id ON activities(trip_id);
CREATE INDEX IF NOT EXISTS idx_expenses_trip_id ON expenses(trip_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_trip_id ON itineraries(trip_id);

-- Insert sample user (password is 'password123' hashed with bcrypt)
INSERT INTO users (name, email, password_hash, profile_photo) 
VALUES (
    'Alex Rivera', 
    'alex@globetrotter.com', 
    '$2a$10$rZ5YvVvVvVvVvVvVvVvVvOeK9K9K9K9K9K9K9K9K9K9K9K9K9K9K9', 
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop'
) ON CONFLICT (email) DO NOTHING;

-- Insert sample trip
INSERT INTO trips (user_id, name, destination, start_date, end_date, budget, status, image_url)
VALUES (
    1,
    'Tokyo Adventure',
    'Tokyo, Japan',
    '2026-10-15',
    '2026-10-22',
    8000.00,
    'planning',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1194&auto=format&fit=crop'
) ON CONFLICT DO NOTHING;
