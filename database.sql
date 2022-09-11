CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"listItem" VARCHAR (150) NOT NULL,
	"checked" BOOLEAN DEFAULT FALSE,
	"timeCompleted" VARCHAR (20)
);

	-- "timeCompleted" column created in case future feature added.

INSERT INTO "tasks" ("listItem")
	VALUES
	('Finish homework.'),
	('Drink full gallon of water.'),
	('Walk the dog.'),
	('Get an oil change.'),
	('Write a letter to Alyse.'),
	('Put on new guitar string.'),
	('Pick up dry-cleaning.'),
	('Buy present for Mom''s birthday.'),
	('Book hotel for vacation.'),
	('Call Hannah.'),
	('Take your multi-vitamins.'),
	('Set up doctor appointment.'),
	('Vaccuum downstairs carpet.'),
	('Prune/harvest tomatoes.'),
	('Bake cake for Bailey.'),
	('Get a haircut.'), 
	('Finish cross-stitch.'),
	('Make dinner.');