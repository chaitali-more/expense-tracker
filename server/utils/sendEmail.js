import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  let transporter;

  // 1. Check if SMTP configuration is provided in env variables
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // 2. Fallback: Create a test Ethereal account for development
    console.log("No SMTP credentials found in .env. Creating test Ethereal email account...");
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  }

  // 3. Define the mail options
  const mailOptions = {
    from: `"Finance Tracker" <${process.env.SMTP_USER || "no-reply@financetracker.com"}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // 4. Send the email
  const info = await transporter.sendMail(mailOptions);

  console.log("Email sent: %s", info.messageId);
  
  // If using Ethereal, log the preview URL
  if (!process.env.SMTP_HOST) {
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("-----------------------------------------");
    console.log("📧 Ethereal Email Preview URL:");
    console.log(previewUrl);
    console.log("-----------------------------------------");
  }
};

export default sendEmail;
