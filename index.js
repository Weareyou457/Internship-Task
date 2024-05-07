const express=require("express")
const app =express()
const mongoose=require("mongoose")
const helmet=require("helmet")
const morgan=require("morgan")
const bodyParser = require("body-parser")
const cors = require('cors')

mongoose.connect('mongodb+srv://alfaizmalwa567:q2J9mhYPo1qqWy8a@cluster0.vdwbfxd.mongodb.net/customer?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("mongodb Database Connected");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


const userRouter=require("./routes/user")
const customerRouter=require("./routes/customer")
const purchaseRouter=require("./routes/purchase")
const shippingRouter=require("./routes/shipping")

app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());  //for api Express.js, you need to include middleware like body-parser to parse incoming request bodies. 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


app.use("/Admin/user", userRouter)
app.use("/Admin/customer",customerRouter )
app.use("/Admin/purchase", purchaseRouter)
app.use("/Admin/shipping", shippingRouter)

app.get("/",(req,res)=>{
    res.send("hello")
})


app.listen(8080,()=>{
    console.log("app is Runnig on Port 8080")
})