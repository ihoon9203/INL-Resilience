/*
* This file seeds the INL database using promises
*/

// Connect to database using MySQL
const mysql = require('mysql2');
const Database = require('../resources/database');
const config = require('../resources/config');

// Connect to AWS RDS
const connection = mysql.createConnection(config);

// Create database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  connection.query('CREATE DATABASE IF NOT EXISTS inl_db', (e) => {
    if (e) {
      console.log(e.message);
    }
    console.log('Database created');
  });
  connection.end();
});

// Now that the database is created, we can connect to it and add tables
config.database = 'inl_db';
const con = new Database(config);

/*
* All the query strings written below
*
********************************************************************************* */
// Create User table
const createUsers = `CREATE TABLE IF NOT EXISTS Users(
    UserId INT PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(255) NOT NULL)`;

// Check if Users table has been seeded already
// TOFIX: should be able to just select UserId, getting error for some reason
const checkUsersTable = 'SELECT * FROM Users LIMIT 1;';

// Create Survey Table
const createSurveys = `CREATE TABLE IF NOT EXISTS Surveys(
      SurveyId INT PRIMARY KEY AUTO_INCREMENT,
      SurveyCategory VARCHAR(255) NOT NULL
      )`;
// Check if Surveys table has been seeded already
const checkSurveysTable = 'SELECT SurveyId FROM Surveys LIMIT 1';

// Create Scores table
const createScores = `CREATE TABLE IF NOT EXISTS Scores(
  ScoreId INT PRIMARY KEY AUTO_INCREMENT,
  Score INT NOT NULL, 
  UserId INT NOT NULL,
  SurveyId INT NOT NULL,
  CONSTRAINT FK_UserId FOREIGN KEY (UserId)
  REFERENCES Users(UserId),
  CONSTRAINT FK_Survey FOREIGN KEY (SurveyId)
  REFERENCES Surveys(SurveyId)
  )`;

// Check if Scores table has been seeded already
const checkScoresTable = 'SELECT ScoreId FROM Scores LIMIT 1;';

// Create Questions table
const createQuestions = `CREATE TABLE IF NOT EXISTS Questions(
    QuestionId INT PRIMARY KEY AUTO_INCREMENT,
    SurveyId INT NOT NULL,
    Weight INT NOT NULL,
    Question VARCHAR(500) NOT NULL,
    CONSTRAINT FK_SurveyId FOREIGN KEY (SurveyId)
    REFERENCES Surveys(SurveyId)
    )`;
// Check if Questions table has been seeded already
const checkQuestionsTable = 'SELECT QuestionId FROM Questions LIMIT 1';

// Create Subquestions table
const createSubquestions = `CREATE TABLE IF NOT EXISTS Subquestions(
  SubquestionId INT PRIMARY KEY AUTO_INCREMENT,
  QuestionId INT NOT NULL,
  Weight INT NOT NULL,
  Subquestion VARCHAR(500) NOT NULL,
  CONSTRAINT FK_QuestionId FOREIGN KEY (QuestionId)
  REFERENCES Questions(QuestionId)
  )`;

// Check if Subquestions table has been seeded already
const checkSubquestionsTable = 'SELECT SubquestionId FROM Subquestions LIMIT 1';

// Create Answers table
const createAnswers = `CREATE TABLE IF NOT EXISTS Answers(
  AnswerId INT PRIMARY KEY AUTO_INCREMENT,
  UserId INT NOT NULL,
  QuestionId INT DEFAULT NULL,
  SubquestionId INT DEFAULT NULL,
  Answer VARCHAR(20) NOT NULL,
  CONSTRAINT FK_User FOREIGN KEY (UserId)
  REFERENCES Users(UserId),
  CONSTRAINT FK_Question FOREIGN KEY (QuestionId)
  REFERENCES Questions(QuestionId),
  CONSTRAINT FK_SubquestionId FOREIGN KEY (SubquestionId)
  REFERENCES Subquestions(SubquestionId)
  )`;
// Check if Answers table has been seeded already
const checkAnswersTable = 'SELECT AnswerId FROM Answers LIMIT 1';

// Create Correct Answers table
const createCorrectAnswers = `CREATE TABLE IF NOT EXISTS CorrectAnswers(
  CorrectAnswerId INT PRIMARY KEY AUTO_INCREMENT,
  QuestionId INT DEFAULT NULL,
  SubquestionId INT DEFAULT NULL,
  CorrectAnswer VARCHAR(20) NOT NULL,
  CONSTRAINT FK_Questions FOREIGN KEY (QuestionId)
  REFERENCES Questions(QuestionId),
  CONSTRAINT FK_Subquestions FOREIGN KEY (SubquestionId)
  REFERENCES Subquestions(SubquestionId)
  )`;
// Check if Correct Answers table has been seeded already
const checkCorrectAnswersTable = 'SELECT CorrectAnswerId FROM CorrectAnswers LIMIT 1';

/*
* Seeding functions below
*/
/* *************************************************************************************** */
// Seed User table if empty
function seedUsers() {
  const seedUsersSmt = 'INSERT INTO Users (Email) VALUES ?';
  const users = [
    ['John@gmail.com'],
    ['Peter@gmail.com'],
    ['Amy@gmail.com'],
    ['Hannah@gmail.com'],
    ['Michael@gmail.com'],
    ['Sandy@gmail.com'],
    ['Betty@gmail.com'],
    ['Richard@gmail.com'],
    ['Susan@gmail.com'],
    ['Vicky@gmail.com'],
    ['Ben@gmail.com'],
    ['William@gmail.com'],
    ['Chuck@gmail.com'],
    ['Viola@gmail.com'],
  ];
  con.query(seedUsersSmt, [users], (err) => {
    if (err) console.log(err.message);
  });
}

// Seed Survey table if empty
function seedSurvey() {
  const seedSurveys = 'INSERT INTO Surveys (SurveyCategory) VALUES ?';
  const surveys = [
    ['finance'],
    ['emergency'],
    ['health'],
    ['cyber'],
  ];
  con.query(seedSurveys, [surveys], (err) => {
    if (err) console.log(err.message);
  });
}

// Seed Scores table if empty
function seedScores() {
  const seedScoresSmt = 'INSERT INTO Scores (Score, UserId, SurveyId) VALUES ?';
  const scores = [
    [50, 1, 1],
    [70, 1, 2],
    [80, 1, 3],
    [90, 1, 4],
    [0, 2, 1],
    [0, 2, 2],
    [0, 2, 3],
    [0, 2, 4],
    [50, 3, 1],
    [0, 3, 2],
    [90, 3, 3],
    [0, 3, 4],
  ];
  con.query(seedScoresSmt, [scores], (err) => {
    if (err) console.log(err.message);
  });
}

// Seed questions table if empty
function seedQuestions() {
  const seedQuestionsSmt = 'INSERT INTO Questions (SurveyId, Weight, Question) VALUES ?';
  const questions = [
    [1, 1, 'Do you maintain an emergency fund of at least three month\'s expenses?'],
    [1, 1, 'Do you know the organizations that can help you immediately after a disaster for financial assistance?'],
    [1, 1, 'In the event of an evacuation, do you have an easily accessible inventory of your financial and banking information?'],
    [1, 1, 'Do you know the steps to take after a disaster to protect your finances?'],
    [1, 1, 'Do you or your beneficiary have estate planning documents such as a will, living will, life insurance policy or health insurance plan?'],
    [1, 1, 'Do you have a disaster and financial planning checklist for preparedness and recovery?'],
    [2, 1, 'Do you have your (or your family) financial, household, and medical information in a secure but easily accessible location? '],
    [2, 1, 'Do you have property (homeowners or renters), health, life or hazard insurance?'],
    [2, 1, 'Do you have a first-aid kit, three-day survival kit and car survival kit? '],
    [2, 1, 'Do you check your emergency supply kit every six months to ensure the supplies are still up-to-date? '],
    [2, 1, 'Do you have enough water and means to purify if clean water becomes unavailable?'],
    [2, 1, 'Do you have a post-disaster safety and recovery plan?'],
    [2, 1, 'Are you prepared in the events of a power outage?'],
    [2, 1, 'Do you have an individual plan in case of an emergency? '],
    [2, 1, 'Do you have the ability to help others around you in a disaster event?'],
    [2, 1, 'Do you know how to access government aid after an emergency or disaster?'],
    [2, 1, 'Do you have an emergency plan in place for your pets?'],
    [2, 1, 'Do you or your family practice your emergency plan?'],
    [2, 1, 'Have you ever received any training on disaster preparation?'],
    [2, 1, 'Are you or someone in your family considered part of a vulnerable population with special health-care needs?'],
    [2, 1, 'Do you know where to get prenatal care or delivery help if your doctor’s office or hospital is closed?'],
    [2, 1, 'Do you have a plan in order to help your baby sleep safely if you evacuate your home?'],
    [2, 1, 'Do you have ready-to-feed formula available if clean water isn’t available? '],
    [3, 1, 'Do you believe that you maintain a healthy lifestyle that includes a balance of recommended physical activity and nutritious food choices?'],
    [3, 1, 'Do you feel that you have a comfortable social network that includes neighbors, friends and family that would come to your aid in an emergency?'],
    [3, 1, 'Do you have access to media sources (television, radio and/or internet) that would alert you of an emergency event that is occurring in your area?'],
    [3, 1, 'Can you safely and efficiently evacuate from your living location by yourself with no assistance?'],
    [3, 1, 'Are there any individual physical health impairments that prevent you from acting in an emergency situation?'],
    [3, 1, 'Would you feel comfortable handling anxiety that may be created in an emergency situation?'],
    [3, 1, 'Are there underlying individual mental health impairments that could result in delays in evacuation?'],
    [3, 1, 'Do you know how to prepare and pack your prescription medications that would last 7-10 days?'],
    [3, 1, 'Do you have a list of medical organizations in your area, including routes to hospitals and emergency centers?'],
    [3, 1, 'Do you have an emergency preparedness kit available and ready to be used in an emergency situation (items of inclusion would be food and water to sustain you for 3 days, personal essentials including a change in clothing, medications, electronics including and AM/FM radio, copies of critical documents such as passport, and an adequate supply of cash )?'],
    [4, 1, 'Do you have secure internet connection?'],
    [4, 1, 'Are you protecting yourself when using public Wi-Fi?'],
    [4, 1, 'Are you protecting yourself against spyware, malware, and phishing?'],
    [4, 1, 'Have you installed antivirus or anti-malware protection software on your devices?'],
    [4, 1, 'Are you using safe passwords to secure your personal and private accounts?'],
    [4, 1, 'Do you have automatic security updates turned on for your operating systems, PCs, applications and smart devices?'],
    [4, 1, 'Is your data protected on external hard drives, USBs or the cloud?'],
    [4, 1, 'Have you installed antivirus or anti-malware protection software on your devices?'],
    [4, 1, 'Do you have automatic updates turned on for antivirus or anti-malware software?'],
    [4, 1, 'Do you regularly backup your data?'],
    [4, 1, 'Do you have a plan in place to recover your data after an emergency?'],
    [4, 1, 'Are you protecting your smart home user devices?'],
    [4, 1, 'Is your workstation, laptop, or mobile device clear of any high-level protected information?'],
    [4, 1, 'Do you review your banking and credit reports frequently?'],
    [4, 1, 'Are you trained on how to identify internet and social media scams?'],
  ];
  con.query(seedQuestionsSmt, [questions], (err) => {
    if (err) console.log(err.message);
  });
}

// Seed Subquestions table if empty
function seedSubquestions() {
  const seedSubquestionsSmt = 'INSERT INTO Subquestions (QuestionId, Weight, Subquestion) VALUES ?';
  const subquestions = [
    [1, 1, 'Do you believe that you maintain a healthy lifestyle that includes a balance of recommended physical activity and nutritious food choices?'],
    [4, 1, 'Do you feel that you have a comfortable social network that includes neighbors, friends and family that would come to your aid in an emergency?'],
    [4, 1, 'Do you have access to media sources (television, radio and/or internet) that would alert you of an emergency event that is occurring in your area?'],
    [4, 1, 'Can you safely and efficiently evacuate from your living location by yourself with no assistance?'],
    [4, 1, 'Are there any individual physical health impairments that prevent you from acting in an emergency situation?'],
    [4, 1, 'Would you feel comfortable handling anxiety that may be created in an emergency situation?'],
    [4, 1, 'Are there underlying individual mental health impairments that could result in delays in evacuation?'],
    [7, 1, 'Do you have paper copies?'],
    [7, 1, 'Do you have electronic copies?'],
    [13, 1, 'Do you have a backup generator with enough fuel to last several days?'],
    [13, 1, 'Do you have alternate plans for refrigerating medicine, food, and other necessitates?'],
    [13, 1, 'Do you have alternative power sources such as portable power banks and charges?'],
    [13, 1, 'Do you have enough flashlights for every member of the household?'],
    [13, 1, 'Do you have enough nonperishable food and water to last at least three days?'],
    [14, 1, 'Do you have an evacuation plan?'],
    [14, 1, 'Do you have a shelter-in-place plan?'],
    [14, 1, 'Do you have a communication plan?'],
    [18, 1, 'Do you know first aid?'],
    [18, 1, 'Do you know CPR?'],
    [23, 1, 'Do you have a plan in place for the vulnerable individual?'],
    [34, 1, 'Have you changed the default name of your router?'],
    [34, 1, 'Have you changed the routers original password?'],
    [34, 1, 'Do you regularly change your router’s password every three months?'],
    [34, 1, 'Do you regularly update your router’s firmware?'],
    [34, 1, 'Have you installed a network firewall?'],
    [34, 1, 'Do you have a guest network set up?'],
    [34, 1, 'Do you use a third party ISP (internet service provider) rental modem for your home networking?'],
    [35, 1, 'Are you aware of open service set identifiers (SSID)?'],
    [35, 1, 'Do you delete saved hotspots on your devices?'],
    [35, 1, 'Do you make it a priority to verify the security of all public networks when connecting to them?'],
    [35, 1, 'Do you use a virtual private network?'],
    [38, 1, 'Are your passwords at least 16 characters long?'],
    [38, 1, 'Are you using upper and lowercase letters, numbers and special characters?'],
    [38, 1, 'Are your passwords unique for each account?'],
    [38, 1, 'Are your passwords unique for each device?'],
    [38, 1, 'Are you using dual-factor authorization when available?'],
    [38, 1, 'Are you using unique passwords instead of variations of old ones?'],
    [38, 1, 'Are you regularly changing your password every three months?'],
    [38, 1, 'Are you using a password manager?'],
    [44, 1, 'Is your data backed up to the cloud?'],
    [44, 1, 's your data backed up on flash drives or other external drives?'],
    [44, 1, 'Do you test your plan every three months?'],
    [45, 1, 'Do you use a cloud-based firewall?'],
    [45, 1, 'Do you use commercial home network firewall?'],
    [45, 1, 'Do you keep your devices with sensative on a separate network?'],
    [46, 1, 'Is your information encrypted?'],
    [46, 1, 'Is your information password protected?'],
    [48, 1, 'Have you discussed the dangers of malware and how it can be downloaded?'],
    [48, 1, 'Have you discussed online frauds and scams?'],
    [48, 1, 'Have you discussed the dangers of online predators?'],
    [48, 1, 'Have you discussed how to properly use social media?'],
    [48, 1, 'Are you using internet filters?'],
  ];
  con.query(seedSubquestionsSmt, [subquestions], (err) => {
    if (err) console.log(err.message);
  });
}
// Seed Answers table if empty
function seedAnswers() {
  const seedAnswersSmt = 'INSERT INTO Answers (UserId, QuestionId, SubquestionId, Answer) VALUES ?';
  const answers = [
    [1, 1, null, 'Yes'],
    [1, 2, null, 'Yes'],
    [1, 3, null, 'No'],
    [1, 4, null, 'No'],
    [1, 5, null, 'No'],
    [1, 6, null, 'Yes'],
    [1, 7, null, 'Yes'],
    [1, 8, null, 'No'],
    [1, 9, null, 'Yes'],
    [1, 10, null, 'Yes'],
    [1, 11, null, 'Yes'],
    [1, 12, null, 'No'],
    [1, 13, null, 'Yes'],
    [1, 14, null, 'Yes'],
    [1, 15, null, 'No'],
    [1, 16, null, 'No'],
    [1, 17, null, 'Yes'],
    [1, 19, null, 'No'],
    [1, 20, null, 'Yes'],
    [1, 21, null, 'No'],
    [1, 22, null, 'Yes'],
    [1, 23, null, 'No'],
    [1, 24, null, 'Yes'],
    [1, 25, null, 'Yes'],
    [1, 26, null, 'Yes'],
    [1, 27, null, 'Yes'],
    [1, 28, null, 'No'],
    [1, 29, null, 'No'],
    [1, 30, null, 'Yes'],
    [1, 31, null, 'No'],
    [1, 32, null, 'Yes'],
    [1, 33, null, 'No'],
    [1, 34, null, 'No'],
    [1, 35, null, 'Yes'],
    [1, 36, null, 'Yes'],
    [1, 37, null, 'No'],
    [1, 38, null, 'No'],
    [1, 39, null, 'No'],
    [1, 40, null, 'No'],
    [1, 41, null, 'No'],
    [1, 42, null, 'Yes'],
    [1, 43, null, 'Yes'],
    [1, 44, null, 'No'],
    [1, 45, null, 'No'],
    [1, 46, null, 'Yes'],
    [1, 47, null, 'Yes'],
    [1, 48, null, 'No'],
    [1, null, 1, 'No'],
    [1, null, 2, 'No'],
    [1, null, 3, 'No'],
    [1, null, 4, 'No'],
    [1, null, 5, 'Yes'],
    [1, null, 6, 'Yes'],
    [1, null, 7, 'Yes'],
    [1, null, 8, 'Yes'],
    [1, null, 9, 'No'],
    [1, null, 10, 'Yes'],
    [1, null, 11, 'Yes'],
    [1, null, 12, 'Yes'],
    [1, null, 13, 'No'],
    [1, null, 14, 'No'],
    [1, null, 15, 'Yes'],
    [1, null, 16, 'Yes'],
    [1, null, 17, 'No'],
    [1, null, 18, 'Yes'],
    [1, null, 19, 'Yes'],
    [1, null, 20, 'No'],
    [1, null, 21, 'Yes'],
    [1, null, 22, 'No'],
    [1, null, 23, 'Yes'],
    [1, null, 24, 'Yes'],
    [1, null, 25, 'No'],
    [1, null, 26, 'No'],
    [1, null, 27, 'Yes'],
    [1, null, 28, 'Yes'],
    [1, null, 29, 'Yes'],
    [1, null, 30, 'Yes'],
    [1, null, 31, 'Yes'],
    [1, null, 32, 'Yes'],
    [1, null, 33, 'Yes'],
    [1, null, 34, 'Yes'],
    [1, null, 35, 'No'],
    [1, null, 36, 'No'],
    [1, null, 37, 'Yes'],
    [1, null, 38, 'No'],
    [1, null, 39, 'Yes'],
    [1, null, 40, 'Yes'],
    [1, null, 41, 'No'],
    [1, null, 42, 'Yes'],
    [1, null, 43, 'Yes'],
    [1, null, 44, 'Yes'],
    [1, null, 45, 'No'],
    [1, null, 46, 'Yes'],
    [1, null, 47, 'No'],
    [1, null, 48, 'No'],
    [1, null, 49, 'Yes'],
    [1, null, 50, 'Yes'],
    [1, null, 51, 'Yes'],
    [1, null, 52, 'Yes'],
  ];
  con.query(seedAnswersSmt, [answers], (err) => {
    if (err) console.log(err.message);
  });
}
// Seed Correct Answers table if empty
function seedCorrectAnswers() {
  const seedCorrectAnswersSmt = 'INSERT INTO CorrectAnswers (QuestionId, SubquestionId, CorrectAnswer) VALUES ?';
  const correctAnswers = [
    [1, null, 'Yes'],
    [2, null, 'Yes'],
    [3, null, 'Yes'],
    [4, null, 'Yes'],
    [5, null, 'Yes'],
    [6, null, 'Yes'],
    [7, null, 'Yes'],
    [8, null, 'Yes'],
    [9, null, 'Yes'],
    [10, null, 'Yes'],
    [11, null, 'Yes'],
    [12, null, 'No'],
    [13, null, 'Yes'],
    [14, null, 'Yes'],
    [15, null, 'Yes'],
    [16, null, 'No'],
    [17, null, 'Yes'],
    [19, null, 'Yes'],
    [20, null, 'Yes'],
    [21, null, 'Yes'],
    [22, null, 'Yes'],
    [23, null, 'No'],
    [24, null, 'Yes'],
    [25, null, 'Yes'],
    [26, null, 'Yes'],
    [27, null, 'Yes'],
    [28, null, 'Yes'],
    [29, null, 'Yes'],
    [30, null, 'Yes'],
    [31, null, 'No'],
    [32, null, 'Yes'],
    [33, null, 'Yes'],
    [34, null, 'Yes'],
    [35, null, 'Yes'],
    [36, null, 'Yes'],
    [37, null, 'No'],
    [38, null, 'Yes'],
    [39, null, 'Yes'],
    [40, null, 'Yes'],
    [41, null, 'No'],
    [42, null, 'Yes'],
    [43, null, 'Yes'],
    [44, null, 'Yes'],
    [45, null, 'Yes'],
    [46, null, 'Yes'],
    [47, null, 'Yes'],
    [48, null, 'Yes'],
    [null, 1, 'Yes'],
    [null, 2, 'Yes'],
    [null, 3, 'Yes'],
    [null, 4, 'No'],
    [null, 5, 'Yes'],
    [null, 6, 'Yes'],
    [null, 7, 'Yes'],
    [null, 8, 'Yes'],
    [null, 9, 'No'],
    [null, 10, 'Yes'],
    [null, 11, 'Yes'],
    [null, 12, 'Yes'],
    [null, 13, 'No'],
    [null, 14, 'No'],
    [null, 15, 'Yes'],
    [null, 16, 'Yes'],
    [null, 17, 'Yes'],
    [null, 18, 'Yes'],
    [null, 19, 'Yes'],
    [null, 20, 'Yes'],
    [null, 21, 'Yes'],
    [null, 22, 'Yes'],
    [null, 23, 'Yes'],
    [null, 24, 'Yes'],
    [null, 25, 'Yes'],
    [null, 26, 'Yes'],
    [null, 27, 'Yes'],
    [null, 28, 'Yes'],
    [null, 29, 'Yes'],
    [null, 30, 'Yes'],
    [null, 31, 'Yes'],
    [null, 32, 'Yes'],
    [null, 33, 'Yes'],
    [null, 34, 'Yes'],
    [null, 35, 'Yes'],
    [null, 36, 'Yes'],
    [null, 37, 'Yes'],
    [null, 38, 'Yes'],
    [null, 39, 'Yes'],
    [null, 40, 'Yes'],
    [null, 41, 'Yes'],
    [null, 42, 'Yes'],
    [null, 43, 'Yes'],
    [null, 44, 'Yes'],
    [null, 45, 'Yes'],
    [null, 46, 'Yes'],
    [null, 47, 'Yes'],
    [null, 48, 'Yes'],
    [null, 49, 'Yes'],
    [null, 50, 'Yes'],
    [null, 51, 'Yes'],
    [null, 52, 'Yes'],
  ];
  con.query(seedCorrectAnswersSmt, [correctAnswers], (err) => {
    if (err) console.log(err.message);
  });
}

/* ***************************************************************************** */

con.query(createUsers)
  .then(() => con.query(checkUsersTable))
  .then((rows) => {
    if (rows.length === 0) seedUsers();
  })
  .then(() => con.query(createSurveys))
  .then(() => con.query(checkSurveysTable))
  .then((rows) => {
    if (rows.length === 0) seedSurvey();
  })
  .then(() => con.query(createScores))
  .then(() => con.query(checkScoresTable))
  .then((rows) => {
    if (rows.length === 0) seedScores();
  })
  .then(() => con.query(createQuestions))
  .then(() => con.query(checkQuestionsTable))
  .then((rows) => {
    if (rows.length === 0) seedQuestions();
  })
  .then(() => con.query(createSubquestions))
  .then(() => con.query(checkSubquestionsTable))
  .then((rows) => {
    if (rows.length === 0) seedSubquestions();
  })
  .then(() => con.query(createAnswers))
  .then(() => con.query(checkAnswersTable))
  .then((rows) => {
    if (rows.length === 0) seedAnswers();
  })
  .then(() => con.query(createCorrectAnswers))
  .then(() => con.query(checkCorrectAnswersTable))
  .then((rows) => {
    if (rows.length === 0) seedCorrectAnswers();
    return con.close();
  })
  .catch((err) => {
    console.log(err);
    con.close();
  });

module.exports = {
  db: Database,
  config,
};
