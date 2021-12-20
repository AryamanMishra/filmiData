const express = require('express');

const axios = require('axios');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    let f = "ki";
    let arr = axios.get('https://imdb-api.com/en/API/InTheaters/k_v4pkaxw1')
        .then((resi) => {
            let a = [];
            for (movie of resi.data.items) {
                a.push(movie.image);
            }
            return arr;
        })

    console.log(arr)
    res.render('home')
})
app.listen(3000, () => { console.log("running on port 3000") })