const express = require('express');

const axios = require('axios');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.get('/', async(req, res) => {

    let a = await axios.get('https://imdb-api.com/en/API/ComingSoon/k_v4pkaxw1')
    let mov = [];
    let data = a.data.items;
    let arr = [];
    for (movie of data) {
        arr.push(movie.id);
    }
    console.log(arr)

    for (el of arr) {
        let pos = await axios.get(`https://imdb-api.com/en/API/Posters/k_v4pkaxw1/${el}`)
        let ratioLink = "";
        let link = pos.data.posters;
        for (el of link) {
            console.log(el.aspectRatio)
            if (el.aspectRatio >= 1.7) {
                ratioLink = el.link;

            }

        }
        mov.push(ratioLink);


    }


    res.render('home', { mov })
})
app.listen(3000, () => { console.log("running on port 3000") })