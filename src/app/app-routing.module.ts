// --------------------------------------------------Default Imports--------------------------------------------------
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// --------------------------------------------------End of Default Imports--------------------------------------------------

// --------------------------------------------------Components--------------------------------------------------
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { FoodComponent } from './food/food.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AreasComponent } from './areas/areas.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
// --------------------------------------------------End of Components--------------------------------------------------

const routes: Routes = [
  // --------------------------------------------------Landing Page--------------------------------------------------
  {
    path: '',
    component: LandingPageComponent,
    children: [
      // --------------------------------------------------Types--------------------------------------------------
      { path: 'categories', component: CategoriesComponent },
      { path: 'cuisine', component: AreasComponent },
      { path: 'ingredients', component: IngredientsComponent },
      { path: 'recipe/:foodName', component: RecipeComponent },
      // --------------------------------------------------End of Types--------------------------------------------------

      // --------------------------------------------------Fitler Based on Type--------------------------------------------------
      { path: 'categoryFilter/:category', component: FoodComponent },
      { path: 'cuisineFilter/:area', component: FoodComponent },
      { path: 'ingredientFilter/:ingredient', component: FoodComponent },
      // --------------------------------------------------End of Fitler Based on Type--------------------------------------------------

      // --------------------------------------------------Search Based on Type--------------------------------------------------
      { path: 'categorySearch/:category', component: FoodComponent },
      { path: 'cuisineSearch/:area', component: FoodComponent },
      { path: 'ingredientSearch/:ingredient', component: FoodComponent },
      // --------------------------------------------------End of Search Based on Type--------------------------------------------------
    ],
  },
  // --------------------------------------------------End of Landing Page--------------------------------------------------
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
