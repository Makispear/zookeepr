// REQUIREMENTS 
const fs = require("fs");
const path = require("path");

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
      path.join(__dirname, '../data/animals.json'),
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
  return true
}

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
}