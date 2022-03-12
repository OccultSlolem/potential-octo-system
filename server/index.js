const app = require('express')();
const PORT = 8080;

app.listen(
    PORT,
    () => { console.log('Listening on localhost:' + PORT); }
)

app.get('/hello', (req, res) => {
    res.status(200).send({
        message: 'Hello, world!'
    })
})