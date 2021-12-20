const express = require('express');

const axios = require('axios');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.get('/', async(req, res) => {

    let a = await axios.get('https://imdb-api.com/en/API/ComingSoon/k_3pxoshah')
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
        let pos = await axios.get(`https://imdb-api.com/en/API/Posters/k_3pxoshah/${el}`)

        mov.push(pos.data.backdrops[0].link);
    }
    res.render('home', { mov, title, date })
})

app.get('/:movie', async(req, res) => {
    let movie = req.params.movie;
    let movieList = await axios.get(`https://imdb-api.com/en/API/SearchTitle/k_3pxoshah/${movie}`);
    let img = [];
    let title = [];

    for (el of movieList.data.results) {
        img.push(el.image);
        title.push(el.title);
    }
    console.log(img);

    res.render('movie', { img, title, movie });

})




app.listen(3000, () => { console.log("running on port 3000") })