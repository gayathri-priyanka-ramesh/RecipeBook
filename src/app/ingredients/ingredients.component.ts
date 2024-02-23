import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss',
})
export class IngredientsComponent implements OnInit {
  // -------------------------Emit Ingredient Click-------------------------
  @Output() scrollClick = new EventEmitter();
  // -------------------------End of Emit Ingredient Click-------------------------

  // -------------------------Component Info-------------------------
  ingredients: any[];
  imgSrc: Array<string> = [];
  // -------------------------End of Component Info-------------------------

  constructor(private apiService: ApiService) {}

  // --------------------------------------------------GET Ingredient List--------------------------------------------------
  ngOnInit(): void {
    console.log(
      '~~~~~~~~~~~~~~~~~~~~~~~~~Ingredients~~~~~~~~~~~~~~~~~~~~~~~~~'
    );
    this.apiService.getIngredients().subscribe((data: any) => {
      console.log('Data  ---> ', data);
      this.ingredients = data.meals.slice(0, 15);
      console.log('Ingredients  ---> ', this.ingredients);
      // -------------------------Set Ingredient Image Source-------------------------
      for (let i of this.ingredients) {
        this.imgSrc.push(
          `../../assets/images/ingredients/${i.strIngredient}.png`
        );
      }
      console.log('ImgSrc  ---> ', this.imgSrc);
    });
  }
  // --------------------------------------------------End of GET Ingredient List--------------------------------------------------

  // --------------------------------------------------Emit Ingredient Click--------------------------------------------------
  onClick(event: any) {
    console.log('Category Click  ---> ', event);
    this.scrollClick.emit();
  }
  // --------------------------------------------------End of Emit Ingredient Click--------------------------------------------------
}
