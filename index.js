var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var express=require("express")
app.use(express.static("public"))
app.set("view engine","ejs")
app.set("views","./views")
io.on('connection', function(socket){
    console.log("co nguoi ket noi")
    socket.on("clientsendmau",function(data){
        console.log(data)
        io.sockets.emit("serversendmau",data)
    })
});
server.listen(8000);

app.get("/",function(req,res){
    res.render("trangchu.ejs")
})