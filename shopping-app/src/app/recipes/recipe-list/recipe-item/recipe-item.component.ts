import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from './../../recipes.model';
import { RecipesService } from './../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSelect() {
    this.router.navigate(['recipes', this.index]);
  }
}
