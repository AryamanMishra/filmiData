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
    let imgi = [];
    let title = [];
    let id = [];
    for (el of movieList.data.results) {
        imgi.push(el.image);
        title.push(el.title);
        id.push(el.id);
    }
    res.render('movie', { imgi, title, movie, id });

})
app.get('/:movie/:id', async(req, res) => {
    const { movie, id } = req.params;
    let imag = await axios.get(`https://imdb-api.com/en/API/Title/k_3pxoshah/${id}`)
    image = imag.data.image;
    let video = await axios.get(`https://imdb-api.com/en/API/YouTubeTrailer/k_3pxoshah/${id}`)
    video = video.data.videoUrl;
    video = `${video.replace('watch?v=', 'embed/')}`;
    res.render('match', { movie, id, image, video });
})




app.listen(3000, () => { console.log("running on port 3000") })