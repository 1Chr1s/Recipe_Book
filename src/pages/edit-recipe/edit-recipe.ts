import { Component, OnInit } from '@angular/core';
import { NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
	// Variable:
	mode = 'New';
	selectOptions = ['Easy', 'Medium', 'Hard'];

	recipeForm: FormGroup;
	
	constructor(private navParams: NavParams,
		private actionSheetController: ActionSheetController,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController){

	}

	ngOnInit(){ 
		this.mode = this.navParams.get('mode');
		this.initializeForm();
	}

	private initializeForm(){ 
		this.recipeForm = new FormGroup({
			'title': new FormControl(null, Validators.required),
			'description': new FormControl(null, Validators.required),
			'difficulty': new FormControl('Medium', Validators.required),
			'ingredients': new FormArray([])

		});
	}

	onSubmit(){ 
		console.log(this.recipeForm);
	}

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
	}

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
	}
} // End of the class 


















































