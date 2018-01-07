import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
	ingredients: Ingredient[];

	constructor(private slService: ShoppingListService){ 
	
	}

	ionViewWillEnter(){ 
		//Reloading the page:
		this.loadItems();	
	}

	onAddItem(form: NgForm){ 
		var ingredient: Ingredient = new Ingredient(form.value.ingredient, form.value.amount);

			this.slService.addItem(ingredient);
			form.reset();
			// loading the items to the screen:
			this.loadItems();


	}

	removeIngredientFromList(indexNum: number){ 
		this.slService.removeItem(indexNum);
		// Reloads the page:
		this.loadItems();
	}


	private loadItems(){ 
		this.ingredients=this.slService.getItems();

	}
}
