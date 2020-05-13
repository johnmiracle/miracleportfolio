const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const auth = require("../config/nodemailer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" });
});

/* GET contact page. */
router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact" });
});

/* POST contact page. */
router.post("/contact", function (req, res, next) {
  const quoteDetail = `
    You have a Contact Us request.\n\n
    Client Details:\n 
    FIrst Name: ${req.body.name}\n
    Last Name: ${req.body.surname}\n
    Email: ${req.body.email}\n
    Phone: ${req.body.phone}\n

    Message:\n ${req.body.message}\n
  `;

  const nodemailerMailgun = nodemailer.createTransport(mailgun(auth));

  // mail detail
  nodemailerMailgun.sendMail(
    {
      from: "salesontws@gmail.com",
      to: "anajemiracle@gmail.com", // An array if you have multiple recipients.
      subject: "Contact Us Request",
      "h:Reply-To": `${req.body.email}`,
      //You can use "text:" to send plain-text content. It's oldschool!
      text: quoteDetail,
    },
    (err, info) => {
      if (err) {
        console.log(`Error: ${err}`);
        req.flash("Danger", "error sending request!!!");
        return res.redirect("/contact");
      } else {
        req.flash("success", "Request sent!!!");
        return res.redirect("/contact");
      }
    }
  );
});

/* GET project page. */
router.get("/projects", function (req, res, next) {
  res.render("project", { title: "Projects" });
});

/* GET phdproject page. */
router.get("/phd_project", function (req, res, next) {
  res.render("phdproject", { title: "Projects" });
});


/* GET weddingproject page. */
router.get("/weddingshop_project", function (req, res, next) {
  res.render("weddingshop_project", { title: "Projects" });
});

/* GET scrollcardproject page. */
router.get("/scrollcard_project", function (req, res, next) {
  res.render("scrollcard_project", { title: "Projects" });
});


/* GET resume page. */
router.get("/resume", function (req, res, next) {
  res.render("resume", { title: "My Resume" });
});

module.exports = router;
