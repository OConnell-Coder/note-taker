const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({extended:false }));

app.use(require('./routes'));
app.use(express.static('public'));

app.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));