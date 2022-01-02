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
        let pos = await axios.get(`https://imdb-api.com/API/Posters/k_jazr8em7/${el}`)
        console.log(pos.data.backdrops[0]);
        mov.push(pos.data.backdrops[0].link);
    }

    res.render('home', { mov, title, date })
})

app.get('/:movie', async(req, res) => {
    let movie = req.params.movie;
    let movieList = await axios.get(`https://imdb-api.com/en/API/SearchTitle/k_jazr8em7/${movie}`);
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
    let imag = await axios.get(`https://imdb-api.com/en/API/Title/k_jazr8em7/${id}`)
    image = imag.data.image;
    let video = await axios.get(`https://imdb-api.com/en/API/YouTubeTrailer/k_jazr8em7/${id}`)
    video = video.data.videoUrl;
    console.log(video);
    if (video != null && video != "")
        video = `${video.replace('watch?v=', 'embed/')}`;
    let details = await axios.get(`https://imdb-api.com/en/API/Title/k_jazr8em7/${id}`)
    let actor = details.data.stars;
    let director = details.data.directors;
    let genre = details.data.genres;
    let plot = details.data.plot;
    let time = details.data.runtimeMins;
    let rating = details.data.imDbRating;
    let fullTitle = details.data.fullTitle;

    res.render('match', { movie, fullTitle, id, image, video, actor, director, genre, plot, time, rating });
})




app.listen(8000, () => { console.log("running on port 3000") })