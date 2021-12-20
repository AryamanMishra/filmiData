const express = require('express');
const app = express();
app.set('view engine', view);
app.get('/', (req, res) => { res.render('home') })
app.listen(3000, () => { console.log("running on port 3000") })