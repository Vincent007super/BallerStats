-- Create the BallerStats database
CREATE DATABASE IF NOT EXISTS BallStats;
USE BallStats;

-- Create coaches table
CREATE TABLE coaches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create players table
CREATE TABLE players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    jersey_number INT,
    position VARCHAR(50),
    height VARCHAR(10),
    weight VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create games table
CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    opponent VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    team_score INT,
    opponent_score INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create player_stats table
CREATE TABLE player_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    game_id INT NOT NULL,
    points INT DEFAULT 0,
    assists INT DEFAULT 0,
    rebounds INT DEFAULT 0,
    steals INT DEFAULT 0,
    blocks INT DEFAULT 0,
    field_goals_made INT DEFAULT 0,
    field_goals_attempted INT DEFAULT 0,
    three_pointers_made INT DEFAULT 0,
    three_pointers_attempted INT DEFAULT 0,
    free_throws_made INT DEFAULT 0,
    free_throws_attempted INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- Create recommended_trainings table
CREATE TABLE recommended_trainings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    coach_id INT NOT NULL,
    training_type VARCHAR(100),
    description TEXT,
    date_recommended DATE,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (coach_id) REFERENCES coaches(id) ON DELETE CASCADE
);

-- Create self_reflections table
CREATE TABLE self_reflections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    game_id INT,
    reflection_text TEXT,
    date_submitted DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- Insert sample data

-- Sample coaches
INSERT INTO coaches (name, email, phone) VALUES
('Coach Johnson', 'johnson@ballerstats.com', '555-0101'),
('Coach Smith', 'smith@ballerstats.com', '555-0102'),
('Coach Williams', 'williams@ballerstats.com', '555-0103');

-- Sample players
INSERT INTO players (name, jersey_number, position, height, weight) VALUES
('Michael Jordan', 23, 'Shooting Guard', '6\'6"', '218 lbs'),
('LeBron James', 6, 'Small Forward', '6\'9"', '250 lbs'),
('Stephen Curry', 30, 'Point Guard', '6\'2"', '185 lbs'),
('Kobe Bryant', 24, 'Shooting Guard', '6\'6"', '212 lbs'),
('Magic Johnson', 32, 'Point Guard', '6\'9"', '220 lbs');

-- Sample games
INSERT INTO games (date, opponent, location, team_score, opponent_score) VALUES
('2024-01-15', 'Lakers', 'Home', 112, 108),
('2024-01-18', 'Warriors', 'Away', 98, 105),
('2024-01-22', 'Celtics', 'Home', 115, 110),
('2024-01-25', 'Heat', 'Away', 102, 99),
('2024-01-28', 'Nets', 'Home', 120, 115);

-- Sample player stats
INSERT INTO player_stats (player_id, game_id, points, assists, rebounds, steals, blocks, field_goals_made, field_goals_attempted, three_pointers_made, three_pointers_attempted, free_throws_made, free_throws_attempted) VALUES
-- Game 1 stats
(1, 1, 28, 6, 8, 2, 1, 10, 18, 3, 7, 5, 6),
(2, 1, 25, 8, 12, 1, 2, 9, 15, 2, 5, 5, 7),
(3, 1, 22, 5, 4, 3, 0, 8, 16, 6, 12, 0, 0),
(4, 1, 18, 4, 6, 2, 1, 7, 14, 2, 6, 2, 2),
(5, 1, 12, 10, 8, 1, 0, 5, 10, 0, 2, 2, 3),

-- Game 2 stats
(1, 2, 24, 4, 7, 1, 0, 9, 17, 2, 6, 4, 5),
(2, 2, 20, 7, 10, 2, 1, 8, 14, 1, 4, 3, 4),
(3, 2, 18, 6, 3, 2, 0, 6, 14, 4, 10, 2, 2),
(4, 2, 16, 3, 5, 1, 2, 6, 13, 1, 5, 3, 4),
(5, 2, 14, 9, 7, 0, 0, 6, 11, 0, 1, 2, 2),

-- Game 3 stats
(1, 3, 32, 5, 9, 3, 1, 12, 20, 4, 8, 4, 4),
(2, 3, 28, 9, 11, 1, 2, 10, 16, 2, 6, 6, 8),
(3, 3, 26, 7, 5, 2, 0, 9, 17, 5, 11, 3, 3),
(4, 3, 20, 2, 4, 2, 0, 8, 15, 2, 7, 2, 3),
(5, 3, 15, 12, 9, 1, 1, 6, 12, 1, 3, 2, 2);

-- Sample recommended trainings
INSERT INTO recommended_trainings (player_id, coach_id, training_type, description, date_recommended, status) VALUES
(1, 1, 'Shooting Drills', 'Focus on mid-range shooting consistency', '2024-01-20', 'completed'),
(2, 2, 'Conditioning', 'Improve endurance for fourth quarter performance', '2024-01-21', 'in_progress'),
(3, 1, 'Ball Handling', 'Work on dribbling under pressure', '2024-01-22', 'pending'),
(4, 3, 'Defense', 'Improve lateral movement and positioning', '2024-01-23', 'pending'),
(5, 2, 'Leadership', 'Team communication and court vision exercises', '2024-01-24', 'completed');

-- Sample self reflections
INSERT INTO self_reflections (player_id, game_id, reflection_text, date_submitted) VALUES
(1, 1, 'Great game overall. Need to work on free throw shooting in clutch moments.', '2024-01-16'),
(2, 1, 'Good rebounding performance but need to be more aggressive on offense.', '2024-01-16'),
(3, 2, 'Shot selection was poor in the second half. Need to be more patient.', '2024-01-19'),
(4, 2, 'Defensive effort was solid but need to communicate better with teammates.', '2024-01-19'),
(5, 3, 'Best passing game of the season. Team chemistry is improving.', '2024-01-23');

-- Create user for the application
CREATE USER IF NOT EXISTS 'BallStats-Admin'@'localhost' IDENTIFIED BY 'BallStats123';
GRANT ALL PRIVILEGES ON BallerStats.* TO 'BallStats-Admin'@'localhost';
FLUSH PRIVILEGES;