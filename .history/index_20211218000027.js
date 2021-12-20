const express = require('express');
const axios = require('axios');

const app = express();
app.set('view engine', 'views');
app.get('/', (req, res) => {

    axios.get('https://imdb-api.com/en/API/InTheaters/k_v4pkaxw1')
        .then((resi) => {
            console.log(resi.data);
            let arr = [];
            for (let el of resi.data.items) {
                arr.push(el.image)


            }
            console.log(arr);

        })


    res.render('home', { arr })
})
app.listen(3000, () => { console.log("running on port 3000") })