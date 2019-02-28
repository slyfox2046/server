"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var products = [
    new Product(1, "第一个商品", 1.99, 3.5, "这是第1个商品，是我在学习慕课网Angular入门实战时创建的", ["电子产品", "硬件设备"]),
    new Product(2, "第二个商品", 2.99, 2.5, "这是第2个商品，是我在学习慕课网Angular入门实战时创建的", ["图书"]),
    new Product(3, "第三个商品", 3.99, 4.5, "这是第3个商品，是我在学习慕课网Angular入门实战时创建的", ["硬件设备"]),
    new Product(4, "第四个商品", 4.99, 1.5, "这是第4个商品，是我在学习慕课网Angular入门实战时创建的", ["电子产品", "硬件设备"]),
    new Product(5, "第五个商品", 5.99, 3.5, "这是第5个商品，是我在学习慕课网Angular入门实战时创建的", ["电子产品"]),
    new Product(6, "第六个商品", 6.99, 2.5, "这是第6个商品，是我在学习慕课网Angular入门实战时创建的", ["图书"]),
    new Product(7, "第七个商品", 4.99, 3.5, "这是第7个商品，是我在学习慕课网Angular入门实战时创建的", ["图书"])
];
var app = express();
app.get('/', function (req, res) {
    res.send("Hello Express!!!");
});
app.get('/api/products', function (req, res) {
    // res.send("接收到商品查询请求！");
    res.json(products);
});
app.get('/api/products/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已启动，地址是：http://localhost:8000");
});
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (websocket) {
    websocket.send("这个消息是服务器主动推送的");
    websocket.on("message", function (message) {
        console.log("接收到的消息：" + message);
    });
});
setInterval(function () {
    if (wsServer.clients) {
        wsServer.clients.forEach(function (client) {
            client.send("这是定时推送");
        });
    }
}, 2000);
//# sourceMappingURL=auction_server.js.map