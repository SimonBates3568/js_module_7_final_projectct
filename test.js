const {
    getAuthors,
    getRecipesName,
    recipeOfGivenAuthor,
    recipeByIgredient,
    getRecipeByName,
    getAllIngredients,
  } = require("./index.js"); // Import functions from your main file
  
  const sampleRecipes = [
    {
      Name: "Fruitcake",
      Author: "Sara Buenfeld",
      Ingredients: ["200g flour", "100g butter", "50g sugar"],
    },
    {
      Name: "Butter Biscuits",
      Author: "John Doe",
      Ingredients: ["300g flour", "150g butter", "80g sugar"],
    },
    {
      Name: "Sugar Cupcakes",
      Author: "Sara Buenfeld",
      Ingredients: ["100g sugar", "200g flour"],
    },
  ];
  
  describe("Recipe Management System Functions", () => {
    // Test for getAuthors
    test("getAuthors should return a list of unique authors", () => {
      const result = getAuthors(sampleRecipes);
      expect(result).toEqual(["Sara Buenfeld", "John Doe"]);
    });
  
    // Test for getRecipesName
    test("getRecipesName should log recipe names", () => {
      const consoleSpy = jest.spyOn(console, "log");
      getRecipesName(sampleRecipes);
      expect(consoleSpy).toHaveBeenCalledWith("Fruitcake");
      expect(consoleSpy).toHaveBeenCalledWith("Butter Biscuits");
      expect(consoleSpy).toHaveBeenCalledWith("Sugar Cupcakes");
      consoleSpy.mockRestore();
    });
  
    // Test for recipeOfGivenAuthor
    test("recipeOfGivenAuthor should return recipes for a given author", () => {
      const result = recipeOfGivenAuthor(sampleRecipes, "Sara Buenfeld");
      expect(result).toEqual([
        { Name: "Fruitcake", Author: "Sara Buenfeld", Ingredients: ["200g flour", "100g butter", "50g sugar"] },
        { Name: "Sugar Cupcakes", Author: "Sara Buenfeld", Ingredients: ["100g sugar", "200g flour"] },
      ]);
    });
  
    // Test for recipeByIgredient
    test("recipeByIgredient should return recipes containing a specific ingredient", () => {
      const result = recipeByIgredient(sampleRecipes, "butter");
      expect(result).toEqual([
        { Name: "Fruitcake", Author: "Sara Buenfeld", Ingredients: ["200g flour", "100g butter", "50g sugar"] },
        { Name: "Butter Biscuits", Author: "John Doe", Ingredients: ["300g flour", "150g butter", "80g sugar"] },
      ]);
    });
  
    // Test for getRecipeByName
    test("getRecipeByName should find a recipe by name", () => {
      const result = getRecipeByName(sampleRecipes, "Fruitcake");
      expect(result).toEqual({
        Name: "Fruitcake",
        Author: "Sara Buenfeld",
        Ingredients: ["200g flour", "100g butter", "50g sugar"],
      });
    });
  
    // Test for getAllIngredients
    test("getAllIngredients should return a flat list of all ingredients", () => {
      const result = getAllIngredients(sampleRecipes);
      expect(result).toEqual([
        "200g flour",
        "100g butter",
        "50g sugar",
        "300g flour",
        "150g butter",
        "80g sugar",
        "100g sugar",
        "200g flour",
      ]);
    });
  });
  