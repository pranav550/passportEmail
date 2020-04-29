const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const passport = require("passport");


// config
dotenv.config({path:'./config/config.env'})

//passport config
require('./config/passport')(passport)

// connnection

mongoose.connect(process.env.MongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>console.log('Mongoose Connected'))
.catch(err=> console.log(err))

const app = express()
// bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(passport.initialize());
app.use(passport.session());


app.use('/', require("./routes/index"))
app.use('/users', require("./routes/user"))


const PORT = process.env.PORT || 5000; 

app.listen(PORT, console.log(`server started on ${process.env.PORT}`));