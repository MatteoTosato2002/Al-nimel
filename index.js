const express = require("express");
const path = require("path");
const url = require('url');
const server = express();
const port = 8080;
const nodemailer = require("nodemailer");
server.use(express.static(path.join(__dirname, "/.")));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "reggio.ciano.srl@gmail.com",
    pass: "RegiumLepidi"
  }
});

const mailOptions = (ind) =>{
  let q = url.parse(ind, true);
  let qdata = q.query
  return{
  from: "reggio.ciano.srl@gmail.com",
  to: qdata.email,
  subject: "Il tuo acquisto su www.al-nimel.it",
  html: "<h1>Grazie per il tuo acquisto</h1><p>Quantità muso =" + qdata.mus + " kg." + "<br>Quantità orecchio =" + qdata.ore + " kg." + "<br>Quantità testa =" + qdata.tes + " kg." +  "<br>Quantità guanciale =" + qdata.gua + " kg." + "<br>Quantità gola =" + qdata.gol + " kg." + "<br>Quantità carrè =" + qdata.car + " kg." + "<br>Quantità capocollo =" + qdata.cap + " kg." + "<br>Quantità spalla =" + qdata.spa + " kg." + "<br>Quantità lombo =" + qdata.lom + " kg." + "<br>Quantità costato =" + qdata.cos + " kg." + "<br>Quantità pancetta =" + qdata.pan + " kg." + "<br>Quantità prosciutto =" + qdata.pro + " kg." + "<br>Quantità stinco =" + qdata.sti + " kg." + "</p><h4>Prezzo totale = " + qdata.tot + " €</h4>"
  };
};

server.get("/", (req, res)=>{
  res.setHeader("Content-type", "text/html");
  res.sendFile(__dirname + "/./index.html");
});

server.get("/about", (req, res)=>{
    res.setHeader("Content-type", "text/html");
    res.sendFile(__dirname + "/./about.html");
  });

  
server.get("/buy", (req, res)=>{
    res.setHeader("Content-type", "text/html");
    res.sendFile(__dirname + "/./buy.html");
});


server.get("/carni", (req, res)=>{
    res.setHeader("Content-type", "text/html");
    res.sendFile(__dirname + "/./carni.html");
  });

server.get("/pay", (req, res)=>{
    res.setHeader("Content-type", "text/html");
    res.sendFile(__dirname + "/./pay.html");
    transporter.sendMail(mailOptions(req.url), function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  });

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});