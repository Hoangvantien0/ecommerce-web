require('dotenv').config();

const mongoose = require('mongoose') ;

const connectionStr =`mongodb+srv://mobileshop:1NuvkMdzOmZeF9m6@cluster0.y4issvr.mongodb.net/mobileshop?retryWrites=true&w=majority`;
// const connectionStr = 'mongodb+srv://mobileshop:123456@a@cluster0.y4issvr.mongodb.net/mobileshop?retryWrites=true&w=majority'
mongoose.connect(connectionStr, {useNewUrlParser: true})
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})

// 1NuvkMdzOmZeF9m6
// mobileshop 


