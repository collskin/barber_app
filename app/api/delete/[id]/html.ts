import { IServiceResponse } from "@/app/admin/types";
import { months } from "@/app/data";

export const rejectHTML = (text?:string) => {


  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #333;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px;
    }
    .content h2 {
      color: #333;
      font-size: 22px;
      margin-top: 0;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      color: #666;
    }
    .appointment-details {
      background-color: #f9f9f9;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
      border: 1px solid #ddd;
    }
    .appointment-details h3 {
      font-size: 18px;
      margin-top: 0;
      color: #333;
    }
    .appointment-details p {
      margin: 5px 0;
      color: #555;
    }
    .footer {
      background-color: #333;
      color: #fff;
      padding: 10px;
      text-align: center;
    }
    .footer p {
      margin: 0;
      font-size: 14px;
    }
    .footer a {
      color: #fff;
      text-decoration: underline;
    }
    .button {
      display: inline-block;
      background-color: #ff7b54;
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      margin-top: 20px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Section -->
    <div class="header">
      <h1>Termin odbijen!</h1>
    </div>

    <!-- Main Content Section -->
    <div class="content">
      <h2>Pozdrav,</h2>
      <p>${text ?? 'Termin koji Ste zahtevali je odbijen, zakažite ponovo u nekim drugim teminima.'}</p>
      
      <!-- Call to Action -->
      <p>U koliko imate nekih pitanja, pozovite nas na +381 64 11 52 273</p>
    </div>

    <!-- Footer Section -->
    <div class="footer">
      <p>Saša Barber</p>
    </div>
  </div>
</body>
</html>
`;
};
