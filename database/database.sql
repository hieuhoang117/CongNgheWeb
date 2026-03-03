Create database BTLWeb
Use BTLWeb

CREATE TABLE Movie (
    IDmovie NVARCHAR(10) PRIMARY KEY,
    NameMovie NVARCHAR(50),
    Category NVARCHAR(50),
	ReleaseDate Date,
	Director NVARCHAR(50),
	Duration INT,
    Country NVARCHAR(50),
    Description NVARCHAR(MAX),
    Status BIT DEFAULT 1
);
CREATE TABLE Director (
    IDdirector NVARCHAR(10) PRIMARY KEY,
    DirectorName NVARCHAR(100) NOT NULL,
    BirthDate DATE,
    Nationality NVARCHAR(50)
);
CREATE TABLE Actor (
    IDactor NVARCHAR(10) PRIMARY KEY,
    ActorName NVARCHAR(100) NOT NULL,
    BirthDate DATE,
    Nationality NVARCHAR(50)
);
CREATE TABLE MovieActor (
    IDmovie NVARCHAR(10),
    IDactor NVARCHAR(10),
    RoleName NVARCHAR(100), 
    PRIMARY KEY (IDmovie, IDactor),
    FOREIGN KEY (IDmovie) REFERENCES Movie(IDmovie),
    FOREIGN KEY (IDactor) REFERENCES Actor(IDactor)
);
CREATE TABLE DirectorActor (
    IDmovie NVARCHAR(10),
    IDdirector NVARCHAR(10),
    PRIMARY KEY (IDmovie, IDdirector),
    FOREIGN KEY (IDmovie) REFERENCES Movie(IDmovie),
    FOREIGN KEY (IDdirector) REFERENCES Director(IDdirector)
);
CREATE TABLE MovieView (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    IDmovie NVARCHAR(10),
    UserID NVARCHAR(10),
    ViewDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IDmovie) REFERENCES Movie(IDmovie)
);
ALTER TABLE MovieView
ADD FOREIGN KEY (UserID) REFERENCES Users(UserID);
CREATE TABLE Users (
    UserID NVARCHAR(10) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(15),
    Role NVARCHAR(20) DEFAULT 'User', -- User / Admin
    CreatedAt DATETIME DEFAULT GETDATE(),
    Status BIT DEFAULT 1 ,-- 1: hoạt động, 0: khóa
);
CREATE TABLE Series (
    IDseries NVARCHAR(10) PRIMARY KEY,
    SeriesName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    ReleaseYear INT,
    Country NVARCHAR(50),
    Status BIT DEFAULT 1
);
CREATE TABLE Episode (
    IDEpisode NVARCHAR(10) PRIMARY KEY,
    IDseries NVARCHAR(10),
    SeasonNumber INT,
    EpisodeNumber INT,
    EpisodeName NVARCHAR(100),
    Duration INT,
    ReleaseDate DATE,
    FOREIGN KEY (IDseries) REFERENCES Series(IDseries)
);
CREATE TABLE SeriesActor (
    IDseries NVARCHAR(10),
    IDactor NVARCHAR(10),
    RoleName NVARCHAR(100),
    PRIMARY KEY (IDseries, IDactor),
    FOREIGN KEY (IDseries) REFERENCES Series(IDseries),
    FOREIGN KEY (IDactor) REFERENCES Actor(IDactor)
);
CREATE TABLE SeriesDirector (
    IDseries NVARCHAR(10),
    IDdirector NVARCHAR(10),
    PRIMARY KEY (IDseries, IDdirector),
    FOREIGN KEY (IDseries) REFERENCES Series(IDseries),
    FOREIGN KEY (IDdirector) REFERENCES Director(IDdirector)
);
CREATE TABLE Content (
    ContentID NVARCHAR(10) PRIMARY KEY,
    ContentName NVARCHAR(100),
    ContentType NVARCHAR(20) -- Movie / Series / Episode
);
ALTER TABLE Movie
ADD ContentID NVARCHAR(10),
FOREIGN KEY (ContentID) REFERENCES Content(ContentID);
ALTER TABLE Series
ADD ContentID NVARCHAR(10),
FOREIGN KEY (ContentID) REFERENCES Content(ContentID);
ALTER TABLE Episode
ADD ContentID NVARCHAR(10),
FOREIGN KEY (ContentID) REFERENCES Content(ContentID);
CREATE TABLE Review (
    ReviewID INT IDENTITY(1,1) PRIMARY KEY,
    UserID NVARCHAR(10),
    ContentID NVARCHAR(10),
    CommentText NVARCHAR(1000),
    Score INT CHECK (Score BETWEEN 1 AND 5),
    ReviewDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ContentID) REFERENCES Content(ContentID)
);