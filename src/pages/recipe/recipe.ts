import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RecipeService } from '../../services/recipes';

import{ Recipe } from '../../models/recipe';

import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
	// Variables:
	recipe: Recipe;
	index: number; // index number of the recipe

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private recipesService: RecipeService,
  	private shoppingListService: ShoppingListService) {
  }

  	ngOnInit(){ 
		// Getting the values that were passed when this page was called to be opened:
		this.recipe = this.navParams.get('recipe');
		this.index = this.navParams.get('index');
	}

  onAddIngredients(){ 
  	this.shoppingListService.addMultipleItems(this.recipe.ingredients);
  }

  onEditRecipe(){ 
  	this.navCtrl.push(EditRecipePage,{mode:'Edit', recipe: this.recipe, index: this.index});
  }

  onDeleteRecipe(){ 
  	this.recipesService.removeRecipe(this.index);
  	// Going to the root page
  	this.navCtrl.popToRoot();
  }

}
