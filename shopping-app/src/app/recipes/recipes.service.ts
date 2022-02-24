import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from '../shared/recipes.model';
import { ShoppingListService } from './../shopping-list/shoping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      'Test',
      'Test',
      'https://www.studytienganh.vn/upload/2021/06/106099.jpg',
      [new Ingredient('apple', 2)]
    ),
    new Recipe(
      'Test2',
      'Test2',
      'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg',
      [new Ingredient('onion', 1), new Ingredient('ratatuile', 2)]
    ),
  ];

  selectedRecipe = new Subject<number>();
  changedRecipes = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeByName(name: string) {
    return this.recipes.find((item) => item.name === name);
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addNewRecipe(data: Recipe) {
    this.recipes.push(data);
    this.changedRecipes.next(this.recipes);
  }

  updateRecipe(index: number, data: Recipe) {
    this.recipes[index] = data;
    this.changedRecipes.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.changedRecipes.next(this.recipes);
  }
}
