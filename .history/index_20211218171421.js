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
    for (movie of data) {
        arr.push(movie.id);
    }


    for (el of arr) {
        let poster = await axios.get(`https://imdb-api.com/en/API/Posters/k_3pxoshah/${el}`)
        let ratioLink = "";
        let link = poster.data.posters;
        console.log(link)
        for (el of link) {
            console.log(el)
            console.log(el.aspectRatio)
            if (el.aspectRatio >= 1.7) {
                ratioLink = el.link;
                console.log(ratioLink)
            }

        }
        mov.push(ratioLink);


    }
    console.log(mov);

    res.render('home', { mov })
})
app.listen(3000, () => { console.log("running on port 3000") })