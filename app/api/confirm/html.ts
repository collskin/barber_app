import { IServiceResponse } from "@/app/admin/types";
import { months } from "@/app/data";

export const clientHtml = ({  time, date, barberName, services }:any) => {

  const dt = new Date(date)
  const dateString = dt.getDate()+'. '+months[dt.getMonth()]

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
      <h1>Termin potvrđen!</h1>
    </div>

    <!-- Main Content Section -->
    <div class="content">
      <h2>Pozdrav,</h2>
      <p>Termin koji ste zahtevali je potvrđen.</p>
      
      <!-- Appointment Details -->
      <div class="appointment-details">
        <h3>Detalji</h3>
        <p><strong>Datum:</strong> ${dateString}</p>
        <p><strong>Vreme:</strong> ${time}</p>
        <p><strong>Frizer:</strong> ${barberName == 'Saša' ? 'Saša Vučković' : 'Danijel Maksimović'}</p>
        <p><strong>Adresa:</strong> Cara Lazara 182, Kruševac</p>
        <p>Usluge:</p>
        ${services.map((s:IServiceResponse)=>`<p><strong>${s.name}</strong> ${s.price}</p>`).join(' ')}
      </div>

      <!-- Call to Action -->
      <p>U koliko imate nekih pitanja, pozovite nas na +381 64 11 52 273</p>
    </div>

    <!-- Footer Section -->
    <div class="footer">
      <p>Saša barber</p>
    </div>
  </div>
</body>
</html>
`;
};

export const ownerHtml = ({clientName, date, time, barberName, clientPhone,clientEmail}:any) =>{
  const dt = new Date(date)
  const dateString = dt.getDate()+'. '+months[dt.getMonth()]
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stigao je novi zahtev</title>
  <style>
    a{
    color:white;
    }
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
      background-color: #ff7b54;
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
      <h1>Novi Zahtev</h1>
    </div>

    <!-- Main Content Section -->
    <div class="content">
      <p>Stigao je novi zahtev za zakazivanje termina:</p>
      
      <!-- Appointment Details -->
      <div class="appointment-details">
        <h3>Detalji o mušteriji</h3>
        <p><strong>Ime: </strong> ${clientName}</p>
        <p><strong>Email: </strong> ${clientEmail}</p>
        <p><strong>Telefon: </strong> ${clientPhone}</p>

        <h3>Detalji o zahtevu</h3>
        <p><strong>Datum: </strong> ${dateString}</p>
        <p><strong>Vreme: </strong> ${time}</p>
        <p><strong>Frizer: </strong> ${barberName == 'Saša'? "Saša Vučković" : "Danijel Maksimović"}</p>
      </div>

      <!-- Call to Action -->
      <p>Da biste pregledali ceo zahtev i potvrdili ga ili obrisali, ulogujte se na kontrolnu tablu.</p>
      <a href="www.sasabarber.com/auth" class="button">Idi na kontrolnu tablu</a>
    </div>

    <!-- Footer Section -->
    <div class="footer">
      <p>Saša Barber</p>
    </div>
  </div>
</body>
</html>`
}