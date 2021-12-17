-- Up
CREATE TABLE Person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
);

CREATE TABLE Feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feedback TEXT,
    personId INTEGER REFERENCES Person(id)
);

INSERT INTO Person (name, email) values ('antonio', 'antonio.scarlat@gmail.com');
INSERT INTO Person (name, email) values ('gabriel', 'gabriel.scarlat@gmail.com');

INSERT INTO Feedback (feedback, personId) values('horrible ride with bus 335!', 1);
INSERT INTO Feedback (feedback, personId) values('pretty good road with 330', 1);
INSERT INTO Feedback (feedback, personId) values('Fabulous driver on train 1', 2);

-- Down
DROP TABLE Person;
DROP TABLE Feedback;