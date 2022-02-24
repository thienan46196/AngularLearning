import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './../shoping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  ingredientInput: FormGroup;
  startedEditingSubscription: Subscription;
  editMode = false;
  index: number;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredientInput = new FormGroup({
      ingredientName: new FormControl(null, [Validators.required]),
      ingredientAmount: new FormControl(0, [
        Validators.required,
        Validators.min(1),
      ]),
    });

    this.startedEditingSubscription =
      this.shoppingListService.startedEditing.subscribe((index: number) => {
        this.editMode = true;
        this.index = index;
        const toBeEditedItem =
          this.shoppingListService.getIngredientByIndex(index);
        this.ingredientInput.setValue({
          ingredientName: toBeEditedItem.name,
          ingredientAmount: toBeEditedItem.amount,
        });
      });
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }

  onSubmit() {
    this.editMode ? this.onUpdate() : this.onAdd();
    this.onClear();
  }

  onAdd() {
    const newIngredient = new Ingredient(
      this.ingredientInput.value['ingredientName'],
      this.ingredientInput.value['ingredientAmount']
    );
    this.shoppingListService.addIngredient(newIngredient);
  }

  onUpdate() {
    this.shoppingListService.saveIngredient(
      this.index,
      new Ingredient(
        this.ingredientInput.value['ingredientName'],
        this.ingredientInput.value['ingredientAmount']
      )
    );
  }

  onClear() {
    this.ingredientInput.reset({ ingredientName: '', ingredientAmount: 0 });
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.index);
    this.onClear();
  }
}
