import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss',
})
export class FoodComponent implements OnInit {
  // -------------------------View Required Variable-------------------------
  @ViewChild('openDialogBtn') openDialogBtn!: ElementRef;
  // -------------------------End of View Required Variable-------------------------

  // -------------------------Component Info-------------------------
  foods: any[];
  category: string;
  area: string;
  ingredient: string;
  invalidSearch: boolean = false;
  // -------------------------End of Component Info-------------------------

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  // --------------------------------------------------Retrieve Food Data Based on Type--------------------------------------------------
  ngOnInit(): void {
    // -------------------------Retrieve Food Type-------------------------
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~Food~~~~~~~~~~~~~~~~~~~~~~~~~');
    this.category = this.route.snapshot.paramMap.get('category') as string;
    console.log('Route Parameter - Category  ---> ', this.category);
    this.area = this.route.snapshot.paramMap.get('area') as string;
    console.log('Route Parameter - Area  ---> ', this.area);
    this.ingredient = this.route.snapshot.paramMap.get('ingredient') as string;
    console.log('Route Parameter - Ingredient  ---> ', this.ingredient);

    // -------------------------Retrieve Food Data Based on Category-------------------------
    if (this.category) {
      this.apiService
        .getFoodsByCategory(this.category)
        .subscribe((data: any) => {
          console.log('~~~~~~~~~~Filter by Category~~~~~~~~~~');
          console.log('Data  ---> ', data);
          this.foods = data.meals;
          console.log('Food  ---> ', this.foods);
          if (!this.foods) {
            console.log('Food not available in Category');
            this.invalidSearch = true;
            this.openDialogBtn.nativeElement.click();
            console.log('Dialog Opened');
          }
        });
    }

    // -------------------------Retrieve Food Data Based on Cuisine-------------------------
    else if (this.area) {
      this.apiService.getFoodsByArea(this.area).subscribe((data: any) => {
        console.log('~~~~~~~~~~Filter by Area~~~~~~~~~~');
        console.log('Data  ---> ', data);
        this.foods = data.meals;
        console.log('Food  ---> ', this.foods);
        if (!this.foods) {
          console.log('Food not available in Area');
          this.invalidSearch = true;
          this.openDialogBtn.nativeElement.click();
          console.log('Dialog Opened');
        }
      });
    }

    // -------------------------Retrieve Food Data Based on Ingredient-------------------------
    else if (this.ingredient) {
      this.apiService
        .getFoodsByIngredient(this.ingredient)
        .subscribe((data: any) => {
          console.log('~~~~~~~~~~Filter by Ingredient~~~~~~~~~~');
          console.log('Data  ---> ', data);
          this.foods = data.meals;
          console.log('Food  ---> ', this.foods);
          if (!this.foods) {
            console.log('Food not available in Ingredient');
            this.invalidSearch = true;
            this.openDialogBtn.nativeElement.click();
            console.log('Dialog Opened');
          }
        });
    }
  }
  // --------------------------------------------------End of Retrieve Food Data Based on Type--------------------------------------------------
}
