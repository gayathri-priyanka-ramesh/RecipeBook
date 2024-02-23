import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // --------------------------------------------------GET Category List--------------------------------------------------
  getCategories(): Observable<any> {
    console.log('API Service ---> getCategories');
    return this.http.get(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    );
  }
  // --------------------------------------------------End of GET Category List--------------------------------------------------

  // --------------------------------------------------GET Cuisine List--------------------------------------------------
  getAreas(): Observable<any> {
    console.log('API Service ---> getAreas');
    return this.http.get(
      'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
    );
  }
  // --------------------------------------------------End of GET Cuisine List--------------------------------------------------

  // --------------------------------------------------GET Ingredient List--------------------------------------------------
  getIngredients(): Observable<any> {
    console.log('API Service ---> getIngredients');
    return this.http.get(
      'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
    );
  }
  // --------------------------------------------------End of GET Ingredient List--------------------------------------------------

  // --------------------------------------------------GET Food Based on Category--------------------------------------------------
  getFoodsByCategory(category: string): Observable<any> {
    console.log('API Service ---> getFoodsByCategory');
    return this.http.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
  }
  // --------------------------------------------------End of GET Food Based on Category--------------------------------------------------

  // --------------------------------------------------GET Food Based on Cuisine--------------------------------------------------
  getFoodsByArea(area: string): Observable<any> {
    console.log('API Service ---> getFoodsByArea');
    return this.http.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
  }
  // --------------------------------------------------End of GET Food Based on Cuisine--------------------------------------------------

  // --------------------------------------------------GET Food Based on Ingredient--------------------------------------------------
  getFoodsByIngredient(ingredient: string): Observable<any> {
    console.log('API Service ---> getFoodsByIngredient');
    return this.http.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
  }
  // --------------------------------------------------End of GET Food Based on Ingredient--------------------------------------------------

  // --------------------------------------------------GET Food By Name--------------------------------------------------
  getRecipeByName(name: string): Observable<any> {
    console.log('API Service ---> getRecipeByName');
    return this.http.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
  }
  // --------------------------------------------------End of GET Food By Name--------------------------------------------------
}
