import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  // -------------------------Emit Category Click-------------------------
  @Output() scrollClick = new EventEmitter();
  // -------------------------End of Emit Category Click-------------------------

  // -------------------------Component Info-------------------------
  categories: any[];
  imgSrc: Array<string> = [];
  // -------------------------End of Component Info-------------------------

  constructor(private apiService: ApiService) {}

  // --------------------------------------------------GET Category List--------------------------------------------------
  ngOnInit(): void {
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~Categories~~~~~~~~~~~~~~~~~~~~~~~~~');
    this.apiService.getCategories().subscribe((data: any) => {
      // console.log('Data  ---> ', data);
      this.categories = data.categories;
      // console.log('Categories  ---> ', this.categories);
      for (let i of this.categories) {
        this.imgSrc.push(`../../assets/images/categories/${i.strCategory}.png`);
      }
      // console.log('ImgSrc  ---> ', this.imgSrc);
    });
  }
  // --------------------------------------------------End of GET Category List--------------------------------------------------

  // --------------------------------------------------Emit Category Click--------------------------------------------------
  onClick(event: any) {
    // console.log('Category Click  ---> ', event);
    this.scrollClick.emit();
  }
  // --------------------------------------------------End of Emit Category Click--------------------------------------------------
}
