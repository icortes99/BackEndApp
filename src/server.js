const http = require('http')
const port = process.env.PORT||8080
const app = require('./app.js')

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`);
});