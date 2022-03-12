const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(
    PORT,
    () => { console.log('Listening on localhost:' + PORT); }
)

app.get('/hello', (req, res) => {
    res.status(200).send({
        message: 'Hello, world!'
    })
})

app.post('/hello/:id', (req,res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        res.status(418).send({ message: 'We need a logo! '})
    };

    res.status(200).send({
        tshirt: '👕 with your ' + logo + 'and ID of ' + id
    }); 
})