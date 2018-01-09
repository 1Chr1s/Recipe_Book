import { Component, OnInit } from '@angular/core';
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';


@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
	// Variable:
	mode = 'New';
	selectOptions = ['Easy', 'Medium', 'Hard'];
	recipeForm: FormGroup;
	recipe: Recipe;
	index: number;

	constructor(private navParams: NavParams,
		private actionSheetController: ActionSheetController,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private recipesService: RecipeService,
		private navCtrl: NavController){

	} // End of constructor.

	ngOnInit(){ 
		this.mode = this.navParams.get('mode');
		if(this.mode == 'Edit'){ 
			this.recipe = this.navParams.get('recipe');
			this.index = this.navParams.get('index');
			
		}
		this.initializeForm();
	} // End of function.

	private initializeForm(){ 
		let title = null;
		let description = null;
		let difficulty = 'Medium';
		let ingredients = [];

		if(this.mode == 'Edit'){ 
			title = this.recipe.title;
			description = this.recipe.description;
			difficulty = this.recipe.difficulty;
			for(let ingredient of this.recipe.ingredients){
				ingredients.push(new FormControl(ingredient.name, Validators.required));
			}
		}

		this.recipeForm = new FormGroup({
			'title': new FormControl(title, Validators.required),
			'description': new FormControl(description, Validators.required),
			'difficulty': new FormControl(difficulty, Validators.required),
			'ingredients': new FormArray(ingredients)

		});
	} // End of function.

	onSubmit(){ 
		const value = this.recipeForm.value;
		let ingredients = [];
		if(value.ingredients.length > 0){
			ingredients = value.ingredients.map(name => {
				return {
					name: name,
					amount: 1
				};
			});
		}
		// Inputting the ingredients varaiable from this function:
		if(this.mode == "Edit"){
			this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
		}else{
			this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
		}
		this.recipeForm.reset();
		this.navCtrl.popToRoot();
		
	} // End of function. 

	onManageIngredients(){
		const actionSheet=this.actionSheetController.create({
			title: "What would you like to do",
			buttons: [{
				text: "Add Ingredient",
				handler: () => {
					this.createNewIngredientAlert().present();
				}
			},
			{
				text: "Remove all Ingredients", 
				role: "destructive",
				handler: () => {
					const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
					const length = fArray.length;
					if( length > 0){ 
						for(let i = length - 1; i >=0; i--){ 
							fArray.removeAt(i);
						} // end of for() loop
						// Creating the toastCtrl:
						const toast = this.toastCtrl.create({
							message: 'All ingredients were deleted!',
							duration: 2000,
							position: 'top'
						});
						// Showing the toast: 
						toast.present();
					} // End of if() statement.
				}
			},
			{ 
				text: 'Cancel',
				role: 'cancel'
			}]
		});
		// Showing the actionSheet: 
		actionSheet.present();
	} // End of function.

	private createNewIngredientAlert(){ 
		return this.alertCtrl.create({
			title: 'Add Ingredient',
			inputs:[{ 
				name: 'name',
				placeholder: 'Name'
			}],
			buttons: [{
				text: 'Cancel',
				role:'cancel'
			},
			{
				text: 'Add', 
				handler: data => {
					if(data.name.trim() == '' || data.name == null){ 
						// Creating the toastCtrl:
						const toast = this.toastCtrl.create({
							message: 'Please enter a valid value!',
							duration: 2000,
							position: 'top'
						});
						// Showing the toast: 
						toast.present();
						return;
					} // End of if() statement.

					// Creating the toastCtrl:
						const toast = this.toastCtrl.create({
							message: 'Item added!',
							duration: 2000,
							position: 'top'
						});
						// Showing the toast: 
						toast.present();
					// Casting into a "FormArray "
					(<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
				} // End of handler
			}
			] 
		});
	} // End of function. 

} // End of the class 


















































