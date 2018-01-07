import { Ingredient } from '../models/ingredient.model';

export class ShoppingListService{
	// Variables:
	private ingredients: Ingredient[] = [];

	// Add a single item onto the shopping list: 
	addItem(item: Ingredient){ 
		this.ingredients.push(item);
		console.log(this.ingredients);
	} 

	// Adding multiple items on to the shopping list:
	addMultipleItems(items: Ingredient[]){
		// the "..." before the items will break up the item array and push it individually:  
		this.ingredients.push(...items);

	}

	// Remove an item from the shopping list:
	removeItem(index: number){
		this.ingredients.splice(index, 1);
	}

	// Retruning the array of ingredients AKA a shopping list:
	getItems(){ 
		// will create a copy of the array instead of just the reference with just using the ingredients:
		return this.ingredients.slice();
	}

}