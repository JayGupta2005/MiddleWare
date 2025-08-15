const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
//middle Ware

// app.use((req,res,next)=>{
//     console.log("I am MiddleWare");
//     next();
// })
// app.use((req,res,next)=>{
//     console.log("I am  2nd MiddleWare");
//     next();
// })

//utility middleware (logger) -- builtin morgan
// app.use((req,res,next)=>{
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.time);
//     next();
// })

app.use("/random", (req,res,next)=>{
    console.log("I am random middleware");
    next();
})

const checkToken = (req,res,next)=>{
    let {token } = req.query;
    if(token === "giveaccess"){
        next();
    }
    throw new ExpressError(401, "Access Deneied !");
}

app.get("/api", checkToken,  (req,res)=>{
    res.send("data");
})

app.get("/err", (req,res)=>{
    abcd = abcd;
})

app.use((err,req,res,next)=>{
    console.log("-----------Error--------------");
    next(err);
})

app.get("/", (req,res)=>{
    res.send("Hi I am Root");
})

app.get("/random", (req,res)=>{
    res.send("This is a random Page");
})

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
})