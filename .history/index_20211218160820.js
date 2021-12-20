const express = require('express');

const axios = require('axios');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.get('/', async(req, res) => {

    let a = await axios.get('https://imdb-api.com/en/API/InTheaters/k_3pxoshah')

    let data = a.data.items;
    let arr = [];
    for (movie of data) {
        arr.push(movie.image);
    }
    console.log(arr);



    res.render('home')
})
app.listen(3000, () => { console.log("running on port 3000") })