import * as express from 'express'
import {Server} from 'ws'
import * as path from "path";

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
export class Comment {
    constructor(public id :number,
                public productId:number,
                public timestamp:string,
                public user:string,
                public rating:number,
                public content:string){

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

const  comments :Comment[] =[
    new Comment(1,1,"2018-07-1 22:22:23" ,"张三",3,"东西不错"),
    new Comment(2,1,"2018-08-1 22:22:23" ,"李四",4,"东西很不错"),
    new Comment(3,1,"2018-09-1 22:22:23" ,"王五",2,"东西确实不错"),
    new Comment(4,2,"2018-10-1 22:22:23" ,"赵六",4,"东西的确不错"),
];


const app = express();
// app.get('/',(req,res)=>{
//     res.send("Hello Express!!!");
// });
app.use('/', express.static(path.join(__dirname, '..', 'client')))
app.get('/api/products',(req,res)=>{
    // res.send("接收到商品查询请求！");
    let result = products;
    let params = req.query;

    if(JSON.stringify(params) =='{}'){
        result = products;

    }else {

        if(params.title){
            result = result.filter((p)=>p.title.indexOf(params.title)!==-1);
        }

        if(params.price!="null" && result.length>0){
            result = result.filter((p)=>p.price <= parseInt(params.price));
        }

        if(params.category!="-1" && result.length>0){
            result = result.filter((p)=>p.categories.indexOf(params.category)!==-1);
        }
        console.log(result);

    }
    console.log("111111");
    console.log(result);
    res.json(result);
});
app.get('/api/product/:id',(req,res)=>{
    res.json(products.find((product)=>product.id ==req.params.id ));
});
app.get('/api/product/:id/comments',(req,res)=>{
    res.json(comments.filter((comment:Comment)=>comment.productId ==req.params.id ));
});



const server = app.listen(8000,"localhost",()=>{
    console.log("服务器已启动，地址是：http://localhost:8000");
})

const subscription = new Map<any ,number[]>();
const wsServer = new Server({port:8085});
wsServer.on("connection",websocket =>{
    websocket.send("这个消息是服务器主动推送的");
    websocket.on('message',(message:string)=>{
        // console.log("接收到的消息："+message);
        let messageObj = JSON.parse(message);
        let productIds = subscription.get(websocket) || [];
        subscription.set(websocket,[...productIds,messageObj.productId]);

    })
});

const currentBids = new Map<number,number>();

setInterval(()=>{
    products.forEach(p=>{
       let currentBid = currentBids.get(p.id) ||p.price;
       let newBid = currentBid+Math.random() * 5 ;
       currentBids.set(p.id,newBid);
    });
    subscription.forEach((productIds:number[],ws)=>{
        let newBids = productIds.map( pid=>({
                productId:pid,
                bid:currentBids.get(pid)
        }));

        ws.send(JSON.stringify(newBids));
    })
    },2000);

// setInterval(()=>{
//     if(wsServer.clients){
//         wsServer.clients.forEach(client =>{
//             client.send("这是定时推送");
//         })
//     }
// },2000);
