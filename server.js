const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");   //esprime il supporto ai partials
app.set("view engine", "hbs");  //render con estensione hbs
app.use(express.static(__dirname + "/public")); //dirname -> PATH del direttorio del progetto

//helpers
//sono template per funzioni che possono essere riusate
hbs.registerHelper("getCurrentYear",()=>{
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text)=>{
  return text.toUpperCase();
});

//express middleware
app.use((req,res, next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log+"\n",(err)=>{
    if(err){
      console.log("[ERROR]: Unable to log request");
    }
  })
  next();
});

/*app.use((req,res, next)=>{
    res.render("maintenanceTemplate.hbs",{
      titlePage:"Under maintenance",
      maintenanceMessage:"Site will be up soon!",
    })
});*/

app.get("/",(req,res)=>{
  res.render("homeTemplate.hbs",{
    titlePage:"Main Page",
    welcomeMessage:"Hey, Welcome to my website!",
    //currentYear: new Date().getFullYear()
  })
});

app.get("/about",(req,res)=>{
  res.render("aboutTemplate.hbs",{
    titlePage:"About Page",
    //currentYear: new Date().getFullYear()
  })
});

app.get("/bad",(req,res)=>{
  res.send({
    errorMessage:"Something gone wrong!"
  });
});

app.get("/portfolio",(req,res)=>{
  res.render("portfolio.hbs",{
    messagePortfolio:"Welcome to my portfolio, it will be updated soon!",
    titlePage:"Portfolio"
  });
});

app.listen(port,()=>{
  console.log(`Server listening on port ${port}`);
});
