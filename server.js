// JSON ==================================================
const { animals } = require('./data/animals');
// REQUIREMENTS ==================================================
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// NPM EXPRESS ==================================================
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// USE ==================================================
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// comes first 
app.use(express.static('public'));
// then these 
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// LISTEN ==================================================
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});