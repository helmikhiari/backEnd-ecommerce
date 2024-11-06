const nodemailer = require("nodemailer");
const ejs=require('ejs')
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "ecoartteampi@gmail.com",
    pass: "zwsb opga qbas fwnl",
  },
});

exports.sendEmail = async (email, token) => {
  const resetUrl = `http://localhost:3000/reset-password/${token}`
  const currentYear = new Date().getFullYear();
  const htmlContent = ejs.render(emailTemplate, { resetUrl, currentYear });
  const info = await transporter.sendMail({
    from: '"CHEZ SAHAR👻" <CHEZSAHAR@google.com>', // sender address
    to: email, // list of receivers
    subject: "RESET Password", // Subject line
    text: "Hello this is the link to change ur password ",
    html: htmlContent
  });
}

const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: auto;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; /* Centering vertically */
            width:100wh;
        }
        .container {
            max-width: 600px;
            width: 100%;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            text-align: center; /* Center text */
        }
        .header {
            background: #007bff; /* Header color */
            color: white;
            border-radius: 10px 10px 0 0;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        .btn {
            display: inline-block;
            padding: 12px 25px;
            color: white;
            background-color: #007bff; /* New button color */
            text-decoration: none;
            border-radius: 5px;
            margin: 15px 0;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #0056b3; /* Darker blue on hover */
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
            border-top: 1px solid #eaeaea;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reset Your Password</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>You requested a password reset. Click the button below to reset your password:</p>
            <a href="<%= resetUrl %>" class="btn">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>Thank you for using our service!</p>
            <p>&copy; <%= currentYear %> CHEZ SAHAR</p>
        </div>
    </div>
</body>
</html>

`;




