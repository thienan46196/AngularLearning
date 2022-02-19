import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipes.model';
import { ShoppingListService } from './../shopping-list/shoping-list.service';
import { retry } from 'rxjs';

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

  constructor(private slService: ShoppingListService) {}

  selectedRecipe = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
