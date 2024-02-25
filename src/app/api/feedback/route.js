// feedbackController.js

import { Feedback } from "@/app/models/Feedback";
const nodemailer = require("nodemailer");

export async function submitFeedback(req, res) {
  try {
    const { name, email, category, message } = req.body;

    // Create a new feedback document
    const feedback = new Feedback({
      name,
      email,
      category,
      message,
    });

    // Save the feedback to the database
    await feedback.save();

    // Send email notification to your Gmail address
    await sendEmailNotification(feedback);

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to send email notification
async function sendEmailNotification(feedback) {
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "yourgmail@gmail.com", // Your Gmail address
      pass: "yourgmailpassword", // Your Gmail password or App Password
    },
  });

  // Compose email message
  const mailOptions = {
    from: "peterpausianlian2020@gmail.com",
    to: "peterpausianlian2020@gmail.com",
    subject: "New Feedback Submitted",
    text: `Name: ${feedback.name}\nEmail: ${feedback.email}\nCategory: ${feedback.category}\nMessage: ${feedback.message}`,
  };

  // Send email
  await transporter.sendMail(mailOptions);
}
