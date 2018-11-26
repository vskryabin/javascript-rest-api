DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS positions;

CREATE TABLE candidates (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    address varchar(255),
    summary varchar(255),
    resume MEDIUMBLOB,
    PRIMARY KEY (id),
    UNIQUE(email)
);
INSERT INTO candidates (name, email, password, address, summary)
VALUES 
('John Doe', 'john@example.com', '$2a$08$Lbv.Alq2TxnafjcBgR2cQeoFwhfco.k70tnUPERyhoRN430d93LHq', '4970 El Camino Real, Los Altos, CA 94022', 'Director, Product Development, 15 years of experience'),
('Maria  Becker', 'maria@example.com', '$2a$08$SpaOMmudfYEPI7tstciC/O8klTO3zdn7FCDFWc2pcch2HLtu0LKHm', '3944 Millbrook Road, Naperville, IL 60540', 'Principal Automation Engineer, 8 years of experience'),
('Frederick  Grant', 'frederick@example.com', '$2a$08$L2Px/ViCwiiW7kSQEwv.VujOCvmN/Ivnz/cz.9N62zxHx6991Z/gO', '1985 Clousson Road, Sergeant Bluff, IA 51054', 'Automation Engineer, 2 years of experience'),
('Janessa  Houston', 'janessa@example.com', '$2a$08$qeM7PW7/gK5AgRfuMgPQI.5dqHtBF5lkUzQbp1JxuXUPEb.TSBSdO', '3865 Evergreen Lane, Los Angeles, CA 90031', 'Senior Automation Engineer, 5 years of experience'),
('Owen  Kelley', 'owen@example.com', '$2a$08$fzLxATVb4Z9fnX0YYyi3mOgwiQCtS86huDBq9NVDFhM3HdgAWyfqO', '2162 Henery Street, Wichita, KS 67203', 'Principal Automation Engineer, 8 years of experience');

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

SELECT * from candidates;

SELECT * from positions;

SELECT applications.id, candidateId, positionId, name, title, date, summary, description, candidates.address AS candidate_address, positions.address AS position_address FROM applications INNER JOIN candidates ON applications.candidateId = candidates.id INNER JOIN positions ON applications.positionId = positions.id;