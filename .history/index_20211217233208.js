const express = require('express');
const app = express();
app.set('view engine', view);
app.get('/', (req, res) => {

    fetch('https://imdb-api.com/en/API/InTheaters/k_v4pkaxw1')
        .then((res) => { return res.json(); })
        .then((data) => {
            let arr = [];
            for (let el of data['items']) {
                arr.push(el.image)


            }

        })


    res.render('home', { arr })
})
app.listen(3000, () => { console.log("running on port 3000") })