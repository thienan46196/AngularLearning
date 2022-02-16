import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Test',
      'This is a test',
      'https://www.studytienganh.vn/upload/2021/06/106099.jpg'
    ),
    new Recipe(
      'Test',
      'This is a test',
      'https://www.studytienganh.vn/upload/2021/06/106099.jpg'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
