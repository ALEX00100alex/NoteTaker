const express = require("express");
const fs = require("fs"); 
const path = require("path");

var app = express();
const PORT = 3000;

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "./notes.html"));
});

app.listen(PORT, function(){
    console.log("Express is listening on PORT 3000");
});