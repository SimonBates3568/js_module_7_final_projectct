'use strict';
const prompt = require("prompt-sync")();
const cakeRecipes = require("./cake-recipes.json");

// Function 1: Get unique authors
const getAuthors = (recipes) => {
  let authors = [];
  recipes.forEach(recipe => {
    if (!authors.includes(recipe.Author)) {
      authors.push(recipe.Author);
    }
  });
  return authors;
};
// console.log("Unique Authors:", getAuthors(cakeRecipes));

// Function 2: Log recipe names
const getRecipesName = (recipes) => {
  if (recipes.length === 0) {
    console.log("No recipes found");
  } else {
    recipes.forEach(({ Name }) => Name && console.log(Name));
  }
};
// console.log("Recipe Names:");
getRecipesName(cakeRecipes);

// Function 3: Get recipes by author
const recipeOfGivenAuthor = (recipes, author) => {
  return recipes.filter(recipe => recipe.Author === author);
};
const authorRecipes = recipeOfGivenAuthor(cakeRecipes, "Sara Buenfeld");
// console.log("Recipes by Sara Buenfeld:");
getRecipesName(authorRecipes);

// Function 4: Get recipes by ingredient
const recipeByIngredient = (recipes, ingredient) => {
  return recipes.filter(recipe => recipe.Ingredients.some(ing => ing.toLowerCase().includes(ingredient.toLowerCase())));
};
const ingredientRecipes = recipeByIngredient(cakeRecipes, "butter");
// console.log("Recipes with butter:");
getRecipesName(ingredientRecipes);

// Function 5: Get recipe by name
let savedIngredients = [];

const getRecipeByName = (recipes, name) => {
  const selectedRecipe = recipes.find(recipe => recipe.Name.toLowerCase().includes(name.toLowerCase()));
  if (selectedRecipe) {
    const save = prompt("Do you want to save this recipe? (Y/N): ").toLowerCase();
    if (save === 'y') {
      savedIngredients = selectedRecipe.Ingredients;
      console.log("Recipe saved!");
    }
  }
  return selectedRecipe;
};
// console.log("Recipe matching 'Fruitcake':", getRecipeByName(cakeRecipes, "Fruitcake"));

// Function 6: Get all ingredients from a list of recipes
const getIngredientsByName = (recipes, recipeName) => {
  const ingredients = recipes.reduce((acc, recipe) => {
    if (recipe.Name.toLowerCase() === recipeName.toLowerCase()) {
      return recipe.Ingredients;
    }
    return acc;
  }, null);
  return ingredients;
};
const allIngredients = getIngredientsByName(cakeRecipes, "Fruitcake");
// console.log("Ingredients for 'Fruitcake':", allIngredients);

// Part 2: Menu
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
      const recipesByAuthor = recipeOfGivenAuthor(cakeRecipes, author);
      getRecipesName(recipesByAuthor);
      break;
    case 3:
      const ingredient = prompt("Enter the ingredient: ");
      const recipesByIngredient = recipeByIngredient(cakeRecipes, ingredient);
      getRecipesName(recipesByIngredient);
      break;
    case 4:
      const name = prompt("Enter the recipe name: ");
      console.log(getRecipeByName(cakeRecipes, name));
      break;
    case 5:
      if (savedIngredients.length > 0) {
        console.log("Saved Ingredients:", savedIngredients.join(", "));
      } else {
        console.log("No ingredients saved.");
      }
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
