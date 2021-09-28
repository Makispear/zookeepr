// getting the json in the data folder 
const { animals } = require('./data/animals');
// requirements  
const fs = require('fs');
const path = require('path');
// npm express.js 
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

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

findById = (id, animalsArray) => {
    const result = animalsArray.filter(animal => animal.id === id)[0]
    return result
  }

createNewAnimal = (body, animalsArray) => {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
      path.join(__dirname, './data/animals.json'),
      JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
}

validateAnimal = animal => {
  if (!animal.name || typeof animal.name !== 'string') {
    return false 
  }
  if (!animal.species || typeof animal.species !== 'string') {
    return false 
  }
  if (!animal.diet || typeof animal.diet !== 'string') {
    return false 
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false 
  }
}

app.get('/api/animals', (req, res) => {
    let results = animals
    // if the url has a query 
    if (req.query) {
        // filter it 
        results = filterByQuery(req.query, results)
    }
    res.json(results)
});

app.get('/api/animals/:id', (req, res) => {
    // params are usually after the : sign 
    const result = findById(req.params.id, animals)
    if (result) {
        res.json(result)
    } else {
        res.send(404)
    }
})

app.post('/api/animals', (req, res) => {
    // set id
    req.body.id = animals.length.toString();
    if (!validateAnimal(req.body)) {
      res.status(400).send('The Animal is not properly formatted.')
    } else {
      const animal = createNewAnimal(req.body, animals); // passing in the body of the json and the animalsArr
      res.json(animal);
    }
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});