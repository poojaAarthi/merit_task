var express=require("express");
var app=express();
const{MongoClient,ObjectId}=require("mongodb");
var url="mongodb://127.0.0.1:27017";
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','pug');
app.set('views','./views');
app.get("/all",function(req,res){
    MongoClient.connect(url,(err,conn)=>{
        var db=conn.db("delta")
        db.collection("tracking").find().toArray((err,data)=>{
            console.log(data)
            res.send(data)
        })
    })
})
app.post("/come",function(req,res){
    MongoClient.connect(url,(err,conn)=>{
        var db=conn.db("delta")
        db.collection('tracking').insertOne(req.body,function(err,data){
            console.log(data)
            res.send(data)
        })
    })
})



//delete
/*
app.post("/del/:id",function(req,res){
    MongoClient.connect(url,(err,conn)=>{
       var db=conn.db("delta")
        db.collection('tracking').deleteOne({_id: ObjectId(req.params.id)},(function(err,den){
            res.redirect("/all");
        })
    })
})

*/
app.post("/del/:id",function(req,res){

    MongoClient.connect(url,(err,conn)=>{

        var db=conn.db("delta")

        db.collection('tracking').deleteOne({_id: ObjectId(req.params.id)},function(err,data){

            res.redirect("/all")

        })

    })

})

//update
/*
app.post('/up/:id',function(req,res){
    MongoClient.connect(url,(err,conn)=>{

        var db=conn.db("delta")
        
        db.collection('tracking').updateOne({_id: req.params.id},req.body),(function(dat){
            db.collection('tracking').findOne({_id: req.params.id}),(function(dat){
            res.redirect("/all");
        });
    });
});

});


ap.get("/up/:id",function(req,res){
    res.render("upmob",{
        id:req.params.id

    })
})
*/
app.post("/up2/:id",function(req,res){
    MongoClient.connect(url,function(err,conn){
        console.log(req.body)
        var db = conn.db("delta");
        db.collection("tracking")
        .updateOne(
            {_id:ObjectId(req.params.id)},
            {
                $set:{
                        status:req.body.status
                    
                     }
            },
            function(err,data){
                console.log(data)
                res.redirect("/all")
            }
        )
    })
})  




app.listen(7070,function(){
    console.log("we are in localhost:7070")
})
