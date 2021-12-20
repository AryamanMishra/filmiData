const express = require('express');

const axios = require('axios');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.get('/', async(req, res) => {

    let a = await axios.get('https://imdb-api.com/en/API/ComingSoon/k_jazr8em7')
    let mov = [];
    let data = a.data.items;
    let arr = [];
    let title = [];
    let date = [];
    for (movie of data) {
        arr.push(movie.id);
        title.push(movie.fullTitle);
        date.push(movie.releaseState);
    }


    for (el of arr) {
        let pos = await axios.get(`https://imdb-api.com/en/API/Posters/k_jazr8em7/${el}`)

        mov.push(pos.data.backdrops[0].link);
    }

    console.log(mov);
    res.render('home', { mov, title, date })
})
app.listen(3000, () => { console.log("running on port 3000") })