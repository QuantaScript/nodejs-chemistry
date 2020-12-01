const express = require('express');
const getElements = require('./getElements');

const port = process.env.PORT || 4242;

const app = express();

app.use(express.static('public'));

app.get('/api/elements', async (req, res) => {
    const elements = await getElements();
    res.json(elements);
});

app.listen(port, () => {
    console.log(`Listening at http://www.localhost:${port}`);
});