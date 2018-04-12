var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var express = require("express")
var ip = require("ip")
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")
io.on('connection', function (socket) {
    console.log("co nguoi ket noi")
    socket.on("clientsendmau", function (data) {
        console.log(data)

        io.sockets.emit("serversendmau", data)

    })
    socket.on("buttonsenddata", function(data){
        console.log(data)
        io.sockets.emit("serversendbutton", data)
    })
});
server.listen(1000);
console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + 1000)

app.get("/", function (req, res) {
    res.render("trangchu.ejs")
})

//giải nén chuỗi JSON thành các OBJECT
function ParseJson(jsondata) {
    try {
        return JSON.parse(jsondata);
    } catch (error) {
        return null;
    }
}

//Gửi dữ liệu thông qua 
/*function sendTime() {
	
	//Đây là một chuỗi JSON
	var json = {
		khanh_dep_trai: "khanh dep trai", 	//kiểu chuỗi
        ESP8266: 12,									//số nguyên
		soPi: 3.14,										//số thực
		time: new Date()							//Đối tượng Thời gian
    }
    io.sockets.emit('testRID', json);
}*/

//Khi có mệt kết nối được tạo giữa Socket Client và Socket Server
io.on('connection', function (socket) {	//'connection' (1) này khác gì với 'connection' (2)
    //hàm console.log giống như hàm Serial.println trên Arduino
    console.log("Connected"); //In ra màn hình console là đã có một Socket Client kết nối thành công.

    //Gửi đi lệnh 'welcome' với một tham số là một biến JSON. Trong biến JSON này có một tham số và tham số đó tên là message. Kiểu dữ liệu của tham số là một chuối.
    socket.emit('welcome', {
        message: 'Connected !!!!'
    });

    //Khi lắng nghe được lệnh "connection" với một tham số, và chúng ta đặt tên tham số là message. Mình thích gì thì mình đặt thôi.
    //'connection' (2)
    socket.on('connection', function (message) {
        console.log(message);
    });

    //khi lắng nghe được lệnh "atime" với một tham số, và chúng ta đặt tên tham số đó là data. Mình thích thì mình đặt thôi
    /*socket.on('atime', function(data) {
        sendTime();
        console.log(data);
    });*/

    socket.on('arduino', function (data) {
        io.sockets.emit('arduino', { message: 'R0' });
        console.log(data);
    });
});