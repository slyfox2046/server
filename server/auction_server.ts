import * as express from 'express'
import {Server} from 'ws'
export class Product {
    constructor(
        public  id:number,
        public title:string,
        public price:number,
        public rating:number,
        public desc:string,
        public categories:Array<string>

    ){
    }
}
const products :Product[] = [
    new Product(1,"第一个商品",1.99,3.5,"这是第1个商品，是我在学习慕课网Angular入门实战时创建的",["电子产品","硬件设备"]),
    new Product(2,"第二个商品",2.99,2.5,"这是第2个商品，是我在学习慕课网Angular入门实战时创建的",["图书"]),
    new Product(3,"第三个商品",3.99,4.5,"这是第3个商品，是我在学习慕课网Angular入门实战时创建的",["硬件设备"]),
    new Product(4,"第四个商品",4.99,1.5,"这是第4个商品，是我在学习慕课网Angular入门实战时创建的",["电子产品","硬件设备"]),
    new Product(5,"第五个商品",5.99,3.5,"这是第5个商品，是我在学习慕课网Angular入门实战时创建的",["电子产品"]),
    new Product(6,"第六个商品",6.99,2.5,"这是第6个商品，是我在学习慕课网Angular入门实战时创建的",["图书"]),
    new Product(7,"第七个商品",4.99,3.5,"这是第7个商品，是我在学习慕课网Angular入门实战时创建的",["图书"])
];

const app = express();
app.get('/',(req,res)=>{
    res.send("Hello Express!!!");
});
app.get('/api/products',(req,res)=>{
    // res.send("接收到商品查询请求！");
    res.json(products);
});
app.get('/api/products/:id',(req,res)=>{
    res.json(products.find((product)=>product.id ==req.params.id ));
});
const server = app.listen(8000,"localhost",()=>{
    console.log("服务器已启动，地址是：http://localhost:8000");
})

const wsServer = new Server({port:8085});
wsServer.on("connection",websocket =>{
    websocket.send("这个消息是服务器主动推送的");
    websocket.on("message",message=>{
        console.log("接收到的消息："+message);
    })
})

setInterval(()=>{
    if(wsServer.clients){
        wsServer.clients.forEach(client =>{
            client.send("这是定时推送");
        })
    }
},2000);
