const express = require('express');

const axios = require('axios');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.get('/', async(req, res) => {

    let a = await axios.get('https://imdb-api.com/en/API/ComingSoon/k_1c5sb914')
    let mov = [];
    let data = a.data.items;
    let arr = [];
    for (movie of data) {
        arr.push(movie.id);
    }


    for (el of arr) {
        let pos = await axios.get(`https://imdb-api.com/en/API/Posters/k_1c5sb914/${el}`)
        for (el of pos.data.posters) {
            if (parseInt(el.aspectRatio) > 1.7) { mov.push(el.link); break; }
        }




    }
    console.log(mov);


    res.render('home', { mov })
})
app.listen(3000, () => { console.log("running on port 3000") })