import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient.model';

export class RecipeService{
	recipe: Recipe[]=[];


	addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]){ 
		this.recipe.push(new Recipe(title, description, difficulty, ingredients));
		console.log(this.recipe);
	}

	addRecipes(multiplerecipe: Recipe[]){ 
		this.recipe.push(...multiplerecipe)
	}

	updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]){
		this.recipe[index] = new Recipe(title, description, difficulty, ingredients);
	}

	removeRecipe(index: number){ 
		this.recipe.splice(index, 1);
	}

	getRecipe(){ 
		return this.recipe.slice();
	}

}