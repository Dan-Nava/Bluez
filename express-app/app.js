const log = console.log;
let express = require('express');
let path = require('path');

let app = express();

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    log(`Listening on port ${port}...`)
})

module.exports = app;
