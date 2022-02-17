import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Ingredient } from './../../shared/ingredient.modol';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput', { static: true }) ingredientName: ElementRef;
  @ViewChild('amountInput', { static: true }) ingredientAmount: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit(): void {}

  onAddItem() {
    const newIngredient = new Ingredient(
      this.ingredientName.nativeElement.value,
      this.ingredientAmount.nativeElement.value
    );
    this.ingredientAdded.emit(newIngredient);
  }
}
