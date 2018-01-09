import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipes';
import { RecipePage } from '../recipe/recipe';


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
	recipes: Recipe[];

	constructor(private navCtrl: NavController,
		private recipesService: RecipeService){ 

	}

	ionViewWillEnter(){ 
		// The recipeService saves the value of the previous recipService opened in "edit-recipe.ts" file:
		this.recipes = this.recipesService.getRecipe();
	}	

	onNewRecipe(){ 
		this.navCtrl.push(EditRecipePage, {Mode: 'New'});
	}


	onLoadRecipe(recipe: Recipe, index: number ){ 
		console.log('clicked');
		// Opening the RecipePage with the "recipe" and "index" values:
		this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
	}
}
