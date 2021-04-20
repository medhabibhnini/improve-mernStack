require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const Comments = require('./models/commentModel')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))





// Routes
app.use('/user', require('./routes/userRouter'))

const postRoute= require('./routes/postRouter')

//const postRoute= require('./routes/posts')


app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/courseRouter'))


app.use('/forum', require('./routes/postRouter'))
app.use('/comments', require('./routes/commentRouter'))
app.use('/soft',require('./routes/skills'))
app.use('/hard',require('./routes/hardskills'))


/*
const postRoute= require('./routes/posts')
app.use('/forum',postRoute);

*/
// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})






if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})