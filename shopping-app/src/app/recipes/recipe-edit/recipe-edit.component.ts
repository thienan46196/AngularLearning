import { Subscription } from 'rxjs';
import { RecipesService } from './../recipes.service';
import { Recipe } from './../../shared/recipes.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  onEditMode: boolean = false;
  recipeForm: FormGroup;
  index: number;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.onEditMode = true;
        this.id = +params['id'];
      } else {
        this.onEditMode = false;
      }
    });

    this.initForm();
  }

  private initForm() {
    let name = '';
    let description = '';
    let imagePath = '';
    let ingredients = new FormArray([]);

    if (this.onEditMode) {
      let recipe: Recipe;

      recipe = this.recipesService.getRecipeById(this.id);

      name = recipe.name;
      description = recipe.description;
      imagePath = recipe.imagePath;

      for (let ingredient of recipe.ingredients) {
        ingredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, [Validators.required, ,]),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients: ingredients,
    });
  }

  getIngredientControls() {
    return ((<FormArray>this.recipeForm.get('ingredients')) as FormArray)
      .controls;
  }

  onAddNewIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    if (this.onEditMode) {
      this.recipesService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipesService.addNewRecipe(this.recipeForm.value);
      this.onCancel();
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
