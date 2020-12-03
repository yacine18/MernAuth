const mongoose = require('mongoose')

const uri = process.env.MONGO_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err){
        console.log(err)
    }
    console.log('DB Connected Successfully')
})