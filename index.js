var MongoClient=require('mongodb').MongoClient;
var url="mongodb+srv://duc:hiiamduc123@cluster0.kfhpu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const express = require("express");
const DATABASE_CONNECT_OPTION  = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const app = express();
var myDataTem = [];
var myDataHum=[];

//connect mongoose
mongoose.connect(url, DATABASE_CONNECT_OPTION);

//check connetc mongoose
mongoose.connection.on("connected", function (){
    console.log("connect successful");
})
mongoose.connection.on("disconnected", function (){
    console.log("connect fail");
});
var db=mongoose.connection;
//create model

// var DHT11Schema = new mongoose.Schema({
//     userId: {type:Number,default:123},
//     fullName:{type:String,default:"admin"},
//     password:{type:String,default:"admin"},
//     numberPhone:{type:Number,default:"0123456789"},
//     email:{type:String,default:"nduc99911@gmail.com"},
//     numberRoom:{type:Number,default:1},
//     keyDevice:{type:String,default:"ABC123"},
//     bodyTemperature:[
//         {
//             userId: Number,
//             value:Number,
//         }
//     ],
//     date: {type: Date, default:Date.now},
// });
var DHT11Schema = new mongoose.Schema({
    id: Number,
    key:{type:String,default:"key123"},
    temperature: [
        {
            id: Number,
            data: {type: Date, default:Date.now},
            value: Number
        }
    ],
    humidity :  [
        {
            id: Number,
            data: {type: Date, default:Date.now},
            value: Number
        }
    ],

});
var DHT11 = mongoose.model("DHT11", DHT11Schema);

app.post("/dht11", (req,res) =>{
    console.log("Received create dht11 data request post dht11");
    //get data request
    console.log(req.query.temperature);
    myDataTem.push(req.query.temperature);
    console.log(myDataTem);
    console.log(req.query.humidity);
    myDataHum.push(req.query.humidity);
    console.log(myDataHum);
    var newDHT11 = DHT11({
        key:'device123',
        temperature: [
            {
                id: Number,
                data: {type: Date, default:Date.now},
                value: req.query.temperature,
            }
        ],
        humidity:  [
            {
                id: Number,
                data: {type: Date, default:Date.now},
                value: req.query.humidity,
            }
        ],
    });

    // //thêm dữ liệu
    // db.collection("person").insertOne(newDHT11,(err,result)=> {
    //     if (err) throw  err;
    //     console.log("Thêm thành công");
    //     console.log(result);
    // });

    // cập nhật dữ liệu
    var oldValue={key:"device123"};
    var newValue={
        $push:{
            temperature: [
                {
                    id: Number,
                    data: {type: Date, default:Date.now},
                    value: req.query.temperature,
                }
            ],
            humidity:  [
                {
                    id: Number,
                    data: {type: Date, default:Date.now},
                    value: req.query.humidity,
                }
            ],
        }

    };
   db.collection("person").updateOne(oldValue,newValue,(err,obj)=>{
       if(err) throw  err;
        if(obj.length!=0) console.log("Cập nhật thành công");

   });

});
//api post data sensor dht11 on mongodb
// app.post("/dht11", (req,res) =>{
//     console.log("Received create dht11 data request post dht11");
//
//     //get data request
//     var newDHT11 = DHT11({
//         temperature: req.query.temperature,
//         humidity: req.query.humidity,
//     });
//
//     //action save mongodb
//     newDHT11.save((error => {
//         if(!error){
//             console.log("save new data dht11");
//             res.status(200).json({"message":" succesful"});
//         }else {
//             console.log("can not save data dht11");
//             res.status(400).json({"message":" error"});
//         }
//     }));
// })

app.listen(3000, function () {
    console.log("sever is listening on port: "+ 3000);
});
// // mongo.connect((err,db)=>{
// //     if(err) throw  err;
// //     console.log("Kết nối thành công");
// //
// //     var dbo=db.db("demo");
//     // tajo bảng
//     // dbo.createCollection("person",(err,res)=>{
//     //     if(err) throw err;
//     //     console.log("Tạo bảng thành côngg")
//     // });
//
//     var model={
//         "userId":2,
//         "fullName": "admin",
//         "password": "admin",
//         "numberPhone": "0394828791",
//         "email": "sowntc2001@gmail.com",
//         "numberRoom": 1,
//         "keyDevice": "32AC",
//         "bodyTemperature": [
//             {
//                 "id": 1,
//                 "date": "20/09/2020",
//                 "value": 30.0
//             },
//             {
//                 "id": 2,
//                 "date": "21/09/2020",
//                 "value": 30.0
//             },
//             {
//                 "id": 3,
//                 "date": "22/09/2020",
//                 "value": 35.0
//             },
//             {
//                 "id": 4,
//                 "date": "23/09/2020",
//                 "value": 30.0
//             }
//         ],
//         "spo2": [
//             {
//                 "id": 1,
//                 "date": "20/09/2020",
//                 "value": 30.0
//             },
//             {
//                 "id": 2,
//                 "date": "21/09/2020",
//                 "value": 39.0
//             },
//             {
//                 "id": 3,
//                 "date": "22/09/2020",
//                 "value": 37.0
//             },
//             {
//                 "id": 4,
//                 "date": "23/09/2020",
//                 "value": 60.0
//             }
//         ],
//         "heartBeat": [
//             {
//                 "id": 1,
//                 "date": "20/09/2020",
//                 "value": 30.0
//             },
//             {
//                 "id": 2,
//                 "date": "21/09/2020",
//                 "value": 50.0
//             },
//             {
//                 "id": 3,
//                 "date": "22/09/2020",
//                 "value": 58.0
//             },
//             {
//                 "id": 4,
//                 "date": "23/09/2020",
//                 "value": 80.0
//             }
//         ]
//
//     };
//     // thực hiện insert
//     // dbo.collection("person").insertOne(model,(err,result)=>{
//     //     if(err) throw  err;
//     //     console.log("Thêm thành côngg");
//     //     console.log(result);
//     //     db.close();
//     // })
//     //lấy dữ liệu
//     // dbo.collection("person").find().toArray((err,obj)=>{
//     //     if(err) throw  err;
//     //     if(obj.length!=0) console.log("Lấy dữ liệu thành công");
//     //     console.log(obj);
//     //     db.close();
//     // });
//     //xóa dữ liệu
//     // var query={name: "Nguyen Van Duc"}
//     // dbo.collection("person").deleteOne(query,(err,obj)=>{
//     //     if(err) throw  err;
//     //     if(obj.length!=0) console.log("Xóa thành công");
//     //     console.log(obj);
//     //     db.close();
//     // });
//     //update
//     var oldValue={keyDevice:"32AC"};
//     var newValue={
//         $set:{bodyTemperature:[
//                 {
//                     "id": 1,
//                     "date": "20/09/2020",
//                     "value": 32.0
//                 },
//                 {
//                     "id": 2,
//                     "date": "21/09/2020",
//                     "value": 32.0
//                 },
//                 {
//                     "id": 3,
//                     "date": "22/09/2020",
//                     "value": 32.0
//                 },
//                 {
//                     "id": 4,
//                     "date": "23/09/2020",
//                     "value": 32.0
//                 }
//             ]}
//
//     };
//     // dbo.collection("person").updateOne(oldValue,newValue,(err,obj)=>{
//     //     if(err) throw  err;
//     //     if(obj.length!=0) console.log("Cập nhật thành công");
//     //     db.close();
//     // })
// // }
// );
