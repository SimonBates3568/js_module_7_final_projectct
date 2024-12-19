'use strict';
const prompt = require("prompt-sync")();
const cakeRecipes = require("./cake-recipes.json");
// console.log(cakeRecipes[0]);  // key-value pairs, arrays, and nested objects, which are all characteristic of JSON data.

// Your functions here

//function 1

// Create a function that returns all authors of a given recipe list. Use the .forEach method. The function takes recipes, such as cakeRecipes, as arguments and returns a list of unique authors. This means that each author can only be found once in the returned list. 

/**
 * Returns a list of unique authors from a given list of recipes.
 * @param {Array} recipes - An array of recipe objects.
 * @returns {Array} - An array of unique author names.
 */
const getAuthors = (recipes) => {
  let authors = []; // Initialize an empty array to store unique authors

  // Iterate over each recipe in the recipes array
  recipes.forEach(recipe => {
    // Check if the author is not already included in the authors array
    if (!authors.includes(recipe.Author)) {
      // Add the author to the authors array
      authors.push(recipe.Author);
    }
  });

  return authors; // Return the list of unique authors
};
// console.log(getAuthors(cakeRecipes));// array of strings of authors


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
//function 2

// Create a function that logs the name of each recipe. As input, it takes in a list of recipes with the same format as cakeRecipes. Use object destructuring in this function. If there are no recipes found in the input, then log that there are no recipes found.

/**
 * Logs the name of each recipe in the given list of recipes.
 * @param {Array} recipes - An array of recipe objects.
 */
const getRecipesName = (recipes) => {
  if(recipes.length === 0){
    console.log("No recipes found");
  } else {
    // Use object destructuring to get the name of each recipe
    // and log it to the console.
    recipes.forEach(({ Name }) => Name && console.log(Name));
  }  
};
// console.log(getRecipesName(cakeRecipes));
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function 3
//user will type author name, function will return recipes of given author.

// Now, create a function that returns all recipes of a given author. Use the .filter method. The function takes recipes and author (string) as arguments and returns all recipes from the given author. 

/**
 * Returns all recipes of a given author.
 * @param {Array} recipes - An array of recipe objects.
 * @param {string} author - The name of the author.
 * @returns {Array} - An array of recipes by the given author.
 */
const recipeOfGivenAuthor = (recipes, author) => {
  // Use the filter method to find recipes by the specified author
  const recipeByAuthor = recipes.filter(recipe => recipe.Author === author);
  return recipeByAuthor;// returns al recipes of given author
};

// console.log(recipeOfGivenAuthor(cakeRecipes, "Sara Buenfeld"));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function 4
//user will input an ingredient name, function will return recipes that contain the given ingredient.
//needs to search through each recipes and check recipe.ingredients for that ingredient maybe .includes or .contains something that chceks the array

// Create a function that returns a list of recipes that contain a given ingredient. The function takes a list of recipes as input and an ingredient as a string. Use the .filter() method ->returns a new array if condition satisfies, to filter the recipes and the .some() method -> returns boolean value to check if the ingredient list contains the given ingredient (input). 


const recipeByIgredient = (recipes, ingredient) => {
  return recipes.filter(recipe => recipe.Ingredients.some(ing => ing.toLowerCase().includes(ingredient.toLowerCase())));
};

// console.log(recipeByIgredient(cakeRecipes, "butter"));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function 5

/**
 * Finds a recipe matching a given name.
 * Uses .find() to search the recipes array.
 * Uses .includes() to allow partial matches.
 * Logs the details of the recipe.
 * Adds an option to save the recipe to a global variable for later use.
 * @param {Array} recipes - An array of recipe objects.
 * @param {string} name - The name of the recipe to find.
 * @returns {Object} - The recipe object that matches the given name.
 */
const getRecipeByName = (recipes, name) => {
  return recipes.find(recipe => recipe.Name.toLowerCase().includes(name.toLowerCase()));
};

// console.log(getRecipeByName(cakeRecipes, "Fruitcake"));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function 6
//Case 5 should only display the ingredients of saved recipes (as a kind of shopping list). At this point returns all possible ingredients use reduce method
// Function to get ingredients by recipe name
const getIngredientsByName = (recipes, recipeName) => {
  // Use .reduce() to find the recipe's ingredients
  const ingredients = recipes.reduce((acc, recipe) => {
    if (recipe.Name.toLowerCase() === recipeName.toLowerCase()) {
      return recipe.Ingredients; // Return ingredients if the name matches
    }
    return acc; // Otherwise, return the accumulator (unchanged)
  }, null);

  // Return the ingredients or null if not found
  return ingredients;
}


// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}


let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1: 
      console.log(getAuthors(cakeRecipes));

      break;
    case 2: 
      const author = prompt("Enter the author's name: ");
      console.log(recipeOfGivenAuthor(cakeRecipes, author));

      break;
    case 3: 
      const ingredient = prompt("Enter the ingredient:");
      console.log(recipeByIgredient(cakeRecipes, ingredient));

      break;
    case 4: 
      const name = prompt("Enter the recipe name: ");
      console.log(getRecipeByName(cakeRecipes, name));

        break;
    case 5: 
    const recipeName = prompt("Enter a list of recipe names (comma separated): ")
      console.log(getIngredientsByName(cakeRecipes, recipeName));

      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);