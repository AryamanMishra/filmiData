const express = require('express');
const axios = require('axios');

const app = express();
app.set('view engine', 'views');
app.get('/', (req, res) => {

    axios.get('https://imdb-api.com/en/API/InTheaters/k_v4pkaxw1')
        .then((data) => {
            let arr = ['https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg'];
            for (let el of data.items) {
                arr.push(el.image)


            }

        })


    res.render('home', { arr })
})
app.listen(3000, () => { console.log("running on port 3000") })