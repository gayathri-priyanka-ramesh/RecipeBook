// --------------------------------------------------Default Imports--------------------------------------------------
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// --------------------------------------------------End of Default Imports--------------------------------------------------

// --------------------------------------------------Required Imports--------------------------------------------------
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// --------------------------------------------------End of Required Imports--------------------------------------------------

// --------------------------------------------------Components--------------------------------------------------
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { FoodComponent } from './food/food.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AreasComponent } from './areas/areas.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
// --------------------------------------------------End of Components--------------------------------------------------

@NgModule({
  declarations: [
    // --------------------------------------------------Components--------------------------------------------------
    AppComponent,
    LandingPageComponent,
    CategoriesComponent,
    FoodComponent,
    RecipeComponent,
    AreasComponent,
    IngredientsComponent,
    // --------------------------------------------------End of Components--------------------------------------------------
  ],
  imports: [
    // --------------------------------------------------Required Imports--------------------------------------------------
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // --------------------------------------------------End of Required Imports--------------------------------------------------
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
