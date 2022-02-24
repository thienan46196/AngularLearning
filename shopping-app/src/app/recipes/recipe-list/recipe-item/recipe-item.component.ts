import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../../../shared/recipes.model';
import { RecipesService } from './../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {}

  onSelect() {
    this.recipesService.selectedRecipe.next(this.index);
  }
}
