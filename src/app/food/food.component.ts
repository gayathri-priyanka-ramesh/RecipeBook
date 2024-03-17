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
  @ViewChild('closeDialogBtn') closeDialogBtn!: ElementRef;
  @ViewChild('dialogArea') dialogArea!: ElementRef;
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
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~Food~~~~~~~~~~~~~~~~~~~~~~~~~');
    this.category = this.route.snapshot.paramMap.get('category') as string;
    // console.log('Route Parameter - Category  ---> ', this.category);
    this.area = this.route.snapshot.paramMap.get('area') as string;
    // console.log('Route Parameter - Area  ---> ', this.area);
    this.ingredient = this.route.snapshot.paramMap.get('ingredient') as string;
    // console.log('Route Parameter - Ingredient  ---> ', this.ingredient);

    // -------------------------Retrieve Food Data Based on Category-------------------------
    if (this.category) {
      this.apiService
        .getFoodsByCategory(this.category)
        .subscribe((data: any) => {
          // console.log('~~~~~~~~~~Filter by Category~~~~~~~~~~');
          // console.log('Data  ---> ', data);
          this.foods = data.meals;
          // console.log('Food  ---> ', this.foods);
          this.handleInvalidSearch(this.foods);
        });
    }

    // -------------------------Retrieve Food Data Based on Cuisine-------------------------
    else if (this.area) {
      this.apiService.getFoodsByArea(this.area).subscribe((data: any) => {
        // console.log('~~~~~~~~~~Filter by Area~~~~~~~~~~');
        // console.log('Data  ---> ', data);
        this.foods = data.meals;
        // console.log('Food  ---> ', this.foods);
        this.handleInvalidSearch(this.foods);
      });
    }

    // -------------------------Retrieve Food Data Based on Ingredient-------------------------
    else if (this.ingredient) {
      this.apiService
        .getFoodsByIngredient(this.ingredient)
        .subscribe((data: any) => {
          // console.log('~~~~~~~~~~Filter by Ingredient~~~~~~~~~~');
          // console.log('Data  ---> ', data);
          this.foods = data.meals;
          // console.log('Food  ---> ', this.foods);
          this.handleInvalidSearch(this.foods);
        });
    }
  }
  // --------------------------------------------------End of Retrieve Food Data Based on Type--------------------------------------------------

  // --------------------------------------------------Invalid Search Type--------------------------------------------------
  // -------------------------Handle Invalid Search-------------------------
  handleInvalidSearch(foodArray: any[]) {
    if (!foodArray) {
      // console.log('Food not available');
      this.invalidSearch = true;
      this.openDialogBtn.nativeElement.click();
      // console.log('Dialog Opened');
    }
  }
  // -------------------------End of Handle Invalid Search-------------------------

  // -------------------------Handle Close Dialog-------------------------
  closeDialog(event: any) {
    // console.log('event.target  ---> ', event.target);
    if (!this.dialogArea.nativeElement.contains(event.target))
      this.closeDialogBtn.nativeElement.click();
  }
  // -------------------------End of Handle Close Dialog-------------------------
  // --------------------------------------------------End of Invalid Search Type--------------------------------------------------
}
