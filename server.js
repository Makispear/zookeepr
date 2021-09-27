// getting the json in the data folder 
const { animals } = require('./data/animals');
// npm express.js 
const express = require('express');
// const { query } = require('express');

const app = express();

// filter the url according to the passed in query
filterByQuery = (query, animalsArray) => {
    let personalityTraitsArray = []

    let filteredResults = animalsArray
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
          personalityTraitsArray = [query.personalityTraits];
        } else {
          personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
          filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
          );
        });
      }

    // if the query is a diet ?diet 
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet)
    }
    // if the query is a species ?species 
    if (query.species) {
        filteredResults =  filteredResults.filter(animal => query.species === animal.species)
    }
    // if the query is a name ?name
    if (query.name) {
        filteredResults = filteredResults.filter(animal => query.name === animal.name)
    }

    return filteredResults
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    // if the url has a query 
    if (req.query) {
        // filter it 
        results = filterByQuery(req.query, results)
    }
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});