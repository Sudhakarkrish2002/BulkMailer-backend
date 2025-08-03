const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("connected to Db successfully");
})
.catch(()=>{
    console.log("failed to connect with DB")
})

const userdetails = mongoose.model("bulkmail", {}, "bulkmail");

app.post("/sendmail", (req, res) => {
  const input = req.body.input;
  const EmailList = req.body.EmailList;

  console.log("Received request:", { input, EmailList });

  // Validate input
  if (!input || !EmailList || EmailList.length === 0) {
    console.log("Invalid input:", { input, EmailList });
    return res.status(400).send(false);
  }

  // Filter out empty or invalid emails
  const validEmails = EmailList.filter(email => email && email.trim() !== '');
  
  if (validEmails.length === 0) {
    console.log("No valid emails found");
    return res.status(400).send(false);
  }

  console.log("Valid emails to send:", validEmails);

  userdetails.find()
    .then((data) => {
      if (!data || data.length === 0) {
        console.log("No email credentials found in database");
        return res.status(500).send(false);
      }
      
      const { user, pass } = data[0].toJSON();
      console.log("Using email credentials for:", user);
      
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: user,
          pass: pass,
        },
      });

      new Promise(async function (resolve, reject) {
        try {
          let successCount = 0;
          for (var i = 0; i < validEmails.length; i++) {
            try {
              await transporter.sendMail({
                from: user,
                to: validEmails[i],
                subject: "a message from bulkmail",
                text: input,
              });
              console.log("email sent to :" + validEmails[i]);
              successCount++;
            } catch (emailError) {
              console.log("Failed to send to " + validEmails[i] + ":", emailError.message);
            }
          }
          
          if (successCount > 0) {
            console.log("Successfully sent " + successCount + " out of " + validEmails.length + " emails");
            resolve("success");
          } else {
            reject("No emails sent successfully");
          }
        }
         catch (err) {
          console.log("Email sending error:", err);
          reject("failed");
        }

      })
        .then(() => {
          console.log("Sending success response");
          res.send(true);
        })
        .catch((error) => {
          console.log("Sending failure response:", error);
          res.send(false);
        });
    })
    .catch((err) => {
      console.log("Database error:", err);
      res.status(500).send(false);
    });
});

app.listen(3000, () => {
  console.log("server started on port 3000...");
});



