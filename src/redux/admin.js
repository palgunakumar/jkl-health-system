const admin = require("firebase-admin");
// import admin from 'firebase-admin'
var serviceAccount = require("../Config/Firebase/jkl-healthcare-firebase-adminsdk-llvfa-b3be8891cf.json");
 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jkl-healthcare-default-rtdb.firebaseio.com"
});
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });   
const auth = admin.auth();

export const createAccount = async (user , role) => {
    try{
        const password = 'password';
            const userRecord = await auth.createUser({
                email: user.email,
                emailVerified: false,
                password: password, // Set a strong password
                displayName: user.fullName,
                photoURL: user.photoUrl,
                disabled: false
            });
          const year = new Date().getFullYear();
            await db.collection('mail').add({
                to: user.email,
            message: {
              subject: `Welcome to JKL Health Services , ${user.displayName}!`,
              html: `
      <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Welcome to JKL Health Services </title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f6f6f6;
              margin: 0;
              padding: 0;
              line-height: 1.6;
          }
          .container {
              max-width: 600px;
              background-color: #ffffff;
              margin: 30px auto;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #e0e0e0;
          }
          h1 {
              color: #333333;
          }
          p {
              color: #555555;
          }
          .button {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff !important;
              padding: 12px 20px;
              margin: 20px 0;
              text-decoration: none;
              border-radius: 5px;
          }
          .button:hover {
              background-color: #0056b3;
          }
          .footer {
              text-align: center;
              color: #888888;
              font-size: 12px;
              margin-top: 30px;
          }
          .footer a {
              color: #888888;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Welcome to JKL Health Services , ${user.displayName}!</h1>
          </div>
          <div class="content">
              <p>Hello ${user.displayName},</p>
              <p>We are excited to have you on board! At JKL Health Services , we’re committed to providing you with the best experience. You can now explore all the features and get started with your journey.</p>
              <p>If you have any questions or need support, feel free to reach out to us at <a href="mailto:jklhealthcare85@gmail.com">jklhealthcare85@gmail.com</a>. We're here to help!</p>
              <p>To get started, click the button below:</p>
              <a href="https://jkl-healthcare.web.app/login" class="button">Get Started</a>
          </div>
          <div class="footer">
              <p>&copy; ${year} JKL Health Services . All rights reserved.</p>
              <p><a href="https://jkl-healthcare.web.app/">Visit our website</a></p>
          </div>
      </div>
  </body>
  </html>
  
    `
            },
  
            }
            );
            await db.collection('users').doc(userRecord.uid).set({
                email: userRecord.email,
                photoURL: userRecord.photoURL,
                uid: userRecord.uid,
                fullName: userRecord.displayName,
                phone: null,
                roles: ['USER', role],
                 providerData: userRecord.toJSON().providerData,
                creationTime: new Date(),
                emailVerified: userRecord.emailVerified,
            })
    }
    catch (error) {
        console.error(`Error creating new user: ${user.email}`, error);
    }
}