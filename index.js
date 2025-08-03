const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/passkey")
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

  userdetails.find()
    .then((data) => {
      const { user, pass } = data[0].toJSON();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: user,
          pass: pass,
        },
      });

      new Promise(async function (resolve, reject) {
        try {
          for (var i = 0; i < EmailList.length; i++) {
            await transporter.sendMail({
              from:user,
              to: EmailList[i],
              subject: "a message from bulkmail",
              text: input,
            });
            console.log("email sent to :" + EmailList[i]);
          }
          resolve("success");
        }
         catch (err) {
          reject("failed");
        }

      })
        .then(() => {
          res.send(true);
        })
        .catch(() => {
          res.send(false);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("server started on port 3000...");
});