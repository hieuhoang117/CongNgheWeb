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

CREATE TRIGGER TRG_Movie_ID
ON Movie
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @NextID INT

    SELECT @NextID = ISNULL(MAX(CAST(SUBSTRING(IDmovie,3,10) AS INT)),0) + 1 FROM Movie

    INSERT INTO Movie(IDmovie, NameMovie, Category, ReleaseDate, Director, Duration, Country, Description, Status, ContentID)
    SELECT 
        'MV' + RIGHT('000' + CAST(@NextID AS VARCHAR),3),
        NameMovie, Category, ReleaseDate, Director, Duration, Country, Description, Status, ContentID
    FROM inserted
END

CREATE TRIGGER TRG_Actor_ID
ON Actor
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @NextID INT

    SELECT @NextID = ISNULL(MAX(CAST(SUBSTRING(IDactor,3,10) AS INT)),0) + 1 FROM Actor

    INSERT INTO Actor(IDactor, ActorName, BirthDate, Nationality)
    SELECT 
        'AC' + RIGHT('000' + CAST(@NextID AS VARCHAR),3),
        ActorName, BirthDate, Nationality
    FROM inserted
END

CREATE TRIGGER TRG_Director_ID
ON Director
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @NextID INT

    SELECT @NextID = ISNULL(MAX(CAST(SUBSTRING(IDdirector,3,10) AS INT)),0) + 1 FROM Director

    INSERT INTO Director(IDdirector, DirectorName, BirthDate, Nationality)
    SELECT 
        'DR' + RIGHT('000' + CAST(@NextID AS VARCHAR),3),
        DirectorName, BirthDate, Nationality
    FROM inserted
END

CREATE TRIGGER TRG_User_ID
ON Users
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @NextID INT

    SELECT @NextID = ISNULL(MAX(CAST(SUBSTRING(UserID,3,10) AS INT)),0) + 1 FROM Users

    INSERT INTO Users(UserID, FullName, Email, PasswordHash, Phone, Role, CreatedAt, Status)
    SELECT 
        'US' + RIGHT('000' + CAST(@NextID AS VARCHAR),3),
        FullName, Email, PasswordHash, Phone, Role, GETDATE(), Status
    FROM inserted
END

CREATE TRIGGER TRG_Series_ID
ON Series
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @NextID INT

    SELECT @NextID = ISNULL(MAX(CAST(SUBSTRING(IDseries,3,10) AS INT)),0) + 1 FROM Series

    INSERT INTO Series(IDseries, SeriesName, Description, ReleaseYear, Country, Status, ContentID)
    SELECT 
        'SR' + RIGHT('000' + CAST(@NextID AS VARCHAR),3),
        SeriesName, Description, ReleaseYear, Country, Status, ContentID
    FROM inserted
END

CREATE TRIGGER TRG_Episode_ID
ON Episode
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @NextID INT

    SELECT @NextID = ISNULL(MAX(CAST(SUBSTRING(IDEpisode,3,10) AS INT)),0) + 1 FROM Episode

    INSERT INTO Episode(IDEpisode, IDseries, SeasonNumber, EpisodeNumber, EpisodeName, Duration, ReleaseDate, ContentID)
    SELECT 
        'EP' + RIGHT('000' + CAST(@NextID AS VARCHAR),3),
        IDseries, SeasonNumber, EpisodeNumber, EpisodeName, Duration, ReleaseDate, ContentID
    FROM inserted
END

CREATE TRIGGER TRG_Content_ID
ON Content
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @NextID INT

    SELECT @NextID = ISNULL(MAX(CAST(SUBSTRING(ContentID,3,10) AS INT)),0) + 1 FROM Content

    INSERT INTO Content(ContentID, ContentName, ContentType)
    SELECT 
        'CT' + RIGHT('000' + CAST(@NextID AS VARCHAR),3),
        ContentName, ContentType
    FROM inserted
END
CREATE TRIGGER trg_SetCreatedAt
ON Users
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE u
    SET CreatedAt = GETDATE()
    FROM Users u
    INNER JOIN inserted i ON u.UserID = i.UserID
    WHERE i.CreatedAt IS NULL;
END;
CREATE TRIGGER TRG_InsertContent_WhenInsertMovie
ON Movie
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Content (ContentName, ContentType)
    SELECT NameMovie, 'Movie'
    FROM inserted;
END
DROP TRIGGER TRG_Movie_ID
CREATE TRIGGER TRG_Movie_AutoContent
ON Movie
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Tạo Content trước
    INSERT INTO Content (ContentName, ContentType)
    SELECT NameMovie, 'Movie'
    FROM inserted;

    -- 2. Insert Movie + gán ContentID tương ứng
    INSERT INTO Movie (
        IDmovie, NameMovie, Category, ReleaseDate, Director,
        Duration, Country, Description, Status, ContentID
    )
    SELECT 
        -- Tạo ID Movie
        'MV' + RIGHT('000' + 
            CAST(
                ROW_NUMBER() OVER (ORDER BY (SELECT 1)) 
                + ISNULL((SELECT MAX(CAST(SUBSTRING(IDmovie,3,10) AS INT)) FROM Movie),0)
            AS VARCHAR),3),

        i.NameMovie, 
        i.Category, 
        i.ReleaseDate, 
        i.Director,
        i.Duration, 
        i.Country, 
        i.Description, 
        i.Status,

        c.ContentID
    FROM inserted i
    JOIN Content c 
        ON c.ContentName = i.NameMovie
        AND c.ContentType = 'Movie'
END
select * from Actor
select * from Content
select * from Director
select * from DirectorActor
select * from Episode/**/
select * from Movie
select * from MovieActor
select * from MovieView/**/
select * from Review/**/
select * from Series/**/
select * from SeriesActor/**/
select * from SeriesDirector/**/
select * from Users


