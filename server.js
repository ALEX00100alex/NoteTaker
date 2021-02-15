const express = require("express");
const fs = require("fs"); 
const path = require("path");

var app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "./notes.html"));
});

app.get("/api/notes", function(req,res){
    res.sendFile(path.join(__dirname, "./db.json"));
});

app.delete("/api/notes/:id", function(req,res){
    const file = fs.readFileSync("./db.json");
    const json = JSON.parse(file);
    const newJson = json.filter(note => note.id !== parseInt(req.params.id));
    fs.writeFileSync("./db.json", JSON.stringify(newJson));
    res.sendFile(path.join(__dirname, "./db.json"));
});

app.post("/api/notes", function(req,res){
    const note = req.body;
    note.id = Date.now();
    const file = fs.readFileSync("./db.json");
    const json = JSON.parse(file);
    json.push(note);
    fs.writeFileSync("./db.json", JSON.stringify(json));
    res.sendFile(path.join(__dirname, "./db.json"));
});

app.listen(PORT, function(){
    console.log("Express is listening on PORT 3000");
});