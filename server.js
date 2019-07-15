const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use("/assets",express.static(__dirname+"/assets"));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    // res.send('Hello World!')
});

app.listen(port);
console.log("I'm listening on port ", port);