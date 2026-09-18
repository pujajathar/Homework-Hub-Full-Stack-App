CREATE DATABASE IF NOT EXISTS homework_hub
DEFAULT CHARACTER SET utf8mb4;
USE homework_hub;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS attachment;
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS assignment;
DROP TABLE IF EXISTS parent;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS teacher;

CREATE TABLE assignment (
    id BIGINT NOT NULL AUTO_INCREMENT,
    description VARCHAR(255),
    due_date DATE,
    title VARCHAR(255),
    category VARCHAR(255),
    status VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO assignment
(id, description, due_date, title, category, status)
VALUES
(1, 'Draw a picture showing how you feel today.', '2026-09-30',
 'My Feelings', 'Social-Studies', 'pending'),

(2, 'Practice addition, subtraction, place value, number comparisons, and word problems.',
 '2026-10-29', 'Numbers & Operations Worksheet', 'Math', 'pending'),

(3, 'Explore different types of lines, shapes, and colors.',
 '2026-09-25', 'Lines, Shapes & Colors', 'Art', 'pending');


CREATE TABLE attachment (
    id BIGINT NOT NULL AUTO_INCREMENT,
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    file_type VARCHAR(255),
    assignment_id BIGINT,
    PRIMARY KEY (id),
    FOREIGN KEY (assignment_id) REFERENCES assignment(id)
);

INSERT INTO attachment
(id, file_name, file_path, file_type, assignment_id)
VALUES
(1, '2nd Grade Math Worksheet.pdf',
 'uploads\\2nd Grade Math Worksheet.pdf',
 'application/pdf', 2),

(2, '2nd Grade Art Worksheet.pdf',
 'uploads\\2nd Grade Art Worksheet.pdf',
 'application/pdf', 3);


CREATE TABLE notification (
    id BIGINT NOT NULL AUTO_INCREMENT,
    created_at DATE,
    is_read BIT(1),
    message VARCHAR(255),
    recipient VARCHAR(255),
    `assignment-id` BIGINT,
    PRIMARY KEY (id),
    FOREIGN KEY (`assignment-id`) REFERENCES assignment(id)
);

INSERT INTO notification
(id, created_at, is_read, message, recipient, `assignment-id`)
VALUES
(1, '2026-09-18', 0,
 'New assignment created: My Feelings (Due: 2026-09-30)',
 'parent', 1),

(2, '2026-09-18', 1,
 'New assignment created: My Feelings (Due: 2026-09-30)',
 'student', 1),

(3, '2026-09-18', 0,
 'New assignment created: Numbers & Operations Worksheet (Due: 2026-10-29)',
 'parent', 2),

(4, '2026-09-18', 0,
 'New assignment created: Numbers & Operations Worksheet (Due: 2026-10-29)',
 'student', 2),

(5, '2026-09-18', 0,
 'New assignment created: Lines, Shapes & Colors (Due: 2026-09-25)',
 'parent', 3),

(6, '2026-09-18', 0,
 'New assignment created: Lines, Shapes & Colors (Due: 2026-09-25)',
 'student', 3);


CREATE TABLE parent (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO parent
(id, first_name, last_name, email)
VALUES
(1, 'Jane', 'Marie', 'janemarie@gmail.com'),
(2, 'Olivia', 'Broen', 'oliviabrown@gmail.com'),
(3, 'Denise', 'BroPattersonwn', 'denisepatterson@gmail.com');


CREATE TABLE student (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO student
(id, email, first_name, last_name)
VALUES
(1, 'mia.johnson@example.com', 'Mia', 'Johnson'),
(2, 'liam.brown@example.com', 'Liam', 'Brown'),
(3, 'sophia.williams@example.com', 'Sophia', 'Williams');


CREATE TABLE teacher (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO teacher
(id, email, first_name, last_name)
VALUES
(1, 'leahlee@schools.com', 'Leah', 'Lee'),
(2, 'danielpete@schools.com', 'Daniel', 'Pete'),
(3, 'emily.carter@example.com', 'Emily', 'Carter'),
(4, 'sarah.johnson@example.com', 'Sarah', 'Johnson'),
(5, 'david.williams@example.com', 'David', 'Williams');

SET FOREIGN_KEY_CHECKS = 1;