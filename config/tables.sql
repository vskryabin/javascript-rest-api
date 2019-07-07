DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS positions;

CREATE TABLE candidates (
    id int NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    middleName varchar(255),
    lastName varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    address varchar(255),
    city varchar(255),
    state varchar(255),
    zip varchar(255),
    summary varchar(65535),
    role varchar(255),
    resume MEDIUMBLOB,
    PRIMARY KEY (id),
    UNIQUE(email)
);
INSERT INTO candidates (firstName, lastName, email, password, address, city, state, zip, summary, role)
VALUES 
('John', 'Doe', 'john@example.com', '$2a$08$KWCVz7MZuJi88N9u4RoY7uuTh3gPR6dyG8EJ4Rhn42Q1fs3S7M.mW', '4970 El Camino Real', 'Los Altos', 'CA', '94022', 'Proven work experience as a Talent Acquisition Specialist or similar role. Hands-on experience with full-cycle recruiting using various interview techniques and evaluation methods', 'RA'),
('Maria', 'Becker', 'maria@example.com', '$2a$08$SpaOMmudfYEPI7tstciC/O8klTO3zdn7FCDFWc2pcch2HLtu0LKHm', '3944 Millbrook Road', 'Naperville', 'IL', '60540', 'Principal Automation Engineer, 8 years of experience', ''),
('Frederick', 'Grant', 'frederick@example.com', '$2a$08$L2Px/ViCwiiW7kSQEwv.VujOCvmN/Ivnz/cz.9N62zxHx6991Z/gO', '1985 Clousson Road', 'Sergeant Bluff', 'IA', '51054', 'Automation Engineer, 2 years of experience', ''),
('Janessa', 'Houston', 'janessa@example.com', '$2a$08$qeM7PW7/gK5AgRfuMgPQI.5dqHtBF5lkUzQbp1JxuXUPEb.TSBSdO', '3865 Evergreen Lane', 'Los Angeles', 'CA', '90031', 'Senior Automation Engineer, 5 years of experience', ''),
('Owen', 'Kelley', 'owen@example.com', '$2a$08$fzLxATVb4Z9fnX0YYyi3mOgwiQCtS86huDBq9NVDFhM3HdgAWyfqO', '2162 Henery Street', 'Wichita', 'KS', '67203', 'Principal Automation Engineer, 8 years of experience', 'R');

CREATE TABLE positions (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    address varchar(255),
    city varchar(255),
    state varchar(255),
    zip varchar(255),
    description varchar(65535),
    dateOpen date,
    company varchar(255),
    PRIMARY KEY (id)
);
INSERT INTO positions (title, address, city, state, zip, description, dateOpen)
VALUES 
('Director, Product Development', '4135 Thunder Road', 'Palo Alto', 'CA', '94306', 'Director, Development serves as a key leadership team member and an active participant in making strategic decisions. This position is responsible for all business and development activities. The successful candidate will help forge new relationships to build visibility of the organization.', '2019-01-17'),
('Principal Automation Engineer', '4287 Station Street', 'San Francisco', 'CA', '94104', 'Drive Test Strategy and Execution. Design and implement automation tests and oversee product automation for features under test. Prepare and implement software test plans, designs, objectives and cases.', '2018-12-02'),
('Principal Applications Developer', '1789 Holden Street', 'San Diego', 'CA', '92103', 'The highest level in the Engineer series and may be assigned to function as a supervisor, expert or project leader. When assigned as a supervisor, develops, coordinates and executes policies, methods and procedures, and supervises personnel; when assigned as an expert, performs work requiring a very high level of technical knowledge of a specific area or ability to integrate at a high level the knowledge of several areas', '2018-11-07'),
('Senior Automation Engineer', '343 Bright Ct', 'Menlo Park', 'CA', '94025', 'Hands-on knowledge to successfully develop and implement automation tests. Works with team to develop software applications from inception through completion.', '2020-01-08'),
('Automation Engineer', '4792 Canis Heights Drive', 'Los Angeles', 'CA', '90017', 'Experience with Selenium WebDriver. Testing using Agile development methodologies such as Scrum. Experience in testing on web-based applications', '2019-06-15');

CREATE TABLE applications (
    id int NOT NULL AUTO_INCREMENT,
    candidateId int NOT NULL,
    positionId int NOT NULL,
    dateApplied date NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (candidateId) REFERENCES candidates(id),
    FOREIGN KEY (positionId) REFERENCES positions(id),
    UNIQUE(candidateId, positionId)
);

INSERT INTO applications (candidateId, positionId, dateApplied)
VALUES 
('1', '1', '2018-10-25'),
('2', '2', '2018-09-20'),
('3', '5', '2018-09-19'),
('4', '4', '2018-10-23'),
('5', '3', '2018-09-18'),
('5', '4', '2018-09-24');

SELECT * from candidates;

SELECT * from positions;

SELECT applications.id, candidateId, positionId, firstName, middleName, lastName, email, title, dateApplied, summary, description, dateOpen, company, candidates.address AS candidate_address, candidates.city AS candidate_city, candidates.state AS candidate_state, candidates.zip AS candidate_zip, positions.address AS position_address, positions.city AS position_city, positions.state AS position_state, positions.zip AS position_zip FROM applications INNER JOIN candidates ON applications.candidateId = candidates.id INNER JOIN positions ON applications.positionId = positions.id;