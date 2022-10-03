const express = require('express'); 
const morgan = require("morgan");

const app = express(); 
const port = process.env.PORT ?? 3333; 

app.use(express.static("../client/dist")); 
// Client inside the dist folder.

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})