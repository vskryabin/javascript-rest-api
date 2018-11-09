DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS positions;

CREATE TABLE candidates (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    address varchar(255),
    resume varchar(255),
    PRIMARY KEY (id)
);
INSERT INTO candidates (name, address, resume)
VALUES 
('John Doe', '4970 El Camino Real, Los Altos, CA 94022', 'Director, Product Development, 15 years of experience'),
('Maria  Becker', '3944 Millbrook Road, Naperville, IL 60540', 'Principal Automation Engineer, 8 years of experience'),
('Frederick  Grant', '1985 Clousson Road, Sergeant Bluff, IA 51054', 'Automation Engineer, 2 years of experience'),
('Janessa  Houston', '3865 Evergreen Lane, Los Angeles, CA 90031', 'Senior Automation Engineer, 5 years of experience'),
('Owen  Kelley', '2162 Henery Street, Wichita, KS 67203', 'Principal Automation Engineer, 8 years of experience');

CREATE TABLE positions (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    address varchar(255),
    description varchar(255),
    PRIMARY KEY (id)
);
INSERT INTO positions (title, address, description)
VALUES 
('Director, Product Development', '4135 Thunder Road, Palo Alto, CA 94306', 'Director, Product Development requirements'),
('Principal Automation Engineer', '4287 Station Street, San Francisco, CA 94104', 'Principal Automation Engineer requirements'),
('Principal Applications Developer', '1789 Holden Street, San Diego, CA 92103', 'Principal Applications Developer requirements'),
('Senior Automation Engineer', '343 Bright Ct, Menlo Park, CA 94025', 'Senior Automation Engineer requirements'),
('Automation Engineer', '4792 Canis Heights Drive, Los Angeles, CA 90017', 'Automation Engineer requirements');

CREATE TABLE applications (
    id int NOT NULL AUTO_INCREMENT,
    candidateId int NOT NULL,
    positionId int NOT NULL,
    date date NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (candidateId) REFERENCES candidates(id),
    FOREIGN KEY (positionId) REFERENCES positions(id)
);

INSERT INTO applications (candidateId, positionId, date)
VALUES 
('1', '1', '2018-10-25'),
('2', '2', '2018-09-20'),
('3', '5', '2018-09-19'),
('4', '4', '2018-10-23'),
('5', '3', '2018-09-18'),
('5', '4', '2018-09-24');

SELECT name, address from candidates;

SELECT title, address from positions;

SELECT name, title, date FROM applications INNER JOIN candidates ON applications.candidateId = candidates.id INNER JOIN positions ON applications.positionId = positions.id;