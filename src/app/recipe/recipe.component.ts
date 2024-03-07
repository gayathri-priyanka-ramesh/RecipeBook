import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent implements OnInit {
  // -------------------------View Required Variable-------------------------
  @ViewChild('openDialogBtn') openDialogBtn!: ElementRef;
  // -------------------------End of View Required Variable-------------------------

  // -------------------------Component Info-------------------------
  recipe: any;
  ingredients: string[] = [];
  measures: string[] = [];
  noRecipe: boolean = false;
  currentCategory: string;
  currentCuisine: string;
  currentIngredient: string;
  // -------------------------End of Component Info-------------------------

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // --------------------------------------------------Required Data Retrival--------------------------------------------------
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~Recipe~~~~~~~~~~~~~~~~~~~~~~~~~');
    let foodName: string = this.route.snapshot.paramMap.get(
      'foodName'
    ) as string;
    // console.log('Food Name  ---> ', foodName);

    // -------------------------Required Food Type-------------------------
    this.currentCategory = this.route.snapshot.queryParamMap.get(
      'categoryFilter'
    ) as string;
    // console.log('Current Category  ---> ', this.currentCategory);
    this.currentCuisine = this.route.snapshot.queryParamMap.get(
      'cuisineFilter'
    ) as string;
    // console.log('Current Cuisine  ---> ', this.currentCuisine);
    this.currentIngredient = this.route.snapshot.queryParamMap.get(
      'ingredientFilter'
    ) as string;
    // console.log('Current Ingredient  ---> ', this.currentIngredient);
    // --------------------------------------------------End of Required Data Retrival--------------------------------------------------

    // --------------------------------------------------GET Required Recipe--------------------------------------------------
    this.apiService.getRecipeByName(foodName).subscribe((data: any) => {
      // -------------------------Recipe Data-------------------------
      // console.log('Data  ---> ', data);
      // console.log('Meals  ---> ', data.meals);

      // -------------------------Recipe Available-------------------------
      if (data.meals) {
        this.recipe = data.meals[0];
        // console.log('Recipe  ---> ', this.recipe);
        for (let i = 1; i <= 20; i++) {
          const ingredientKey = 'strIngredient' + i;
          const ingredient = this.recipe[ingredientKey];
          const measureKey = 'strMeasure' + i;
          const measure = this.recipe[measureKey];
          if (ingredient && ingredient.trim() !== '') {
            this.ingredients.push(ingredient);
            this.measures.push(measure);
          }
        }
        // console.log('Ingredients Array  ---> ', this.ingredients);
        // console.log('Measures Array  ---> ', this.measures);
      }
      // -------------------------Recipe Not Available-------------------------
      else {
        this.noRecipe = true;
        // console.log('Recipe not available');
      }

      // -------------------------Trigger Recipe Modal-------------------------
      this.openDialogBtn.nativeElement.click();
      // console.log('Dialog Opened');
    });
    // --------------------------------------------------End of GET Required Recipe--------------------------------------------------
  }

  // --------------------------------------------------Dismiss Recipe Modal--------------------------------------------------
  onCloseDialog(): void {
    if (this.currentCategory) {
      this.router.navigate(['/categoryFilter', this.currentCategory]);
    } else if (this.currentCuisine) {
      this.router.navigate(['/cuisineFilter', this.currentCuisine]);
    } else if (this.currentIngredient) {
      this.router.navigate(['ingredientFilter', this.currentIngredient]);
    } else {
      this.router.navigate(['/']);
    }
  }
  // --------------------------------------------------End of Dismiss Recipe Modal--------------------------------------------------
}
