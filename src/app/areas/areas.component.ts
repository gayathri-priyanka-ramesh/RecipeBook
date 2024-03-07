import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.scss',
})
export class AreasComponent implements OnInit {
  // -------------------------Emit Cuisine Click-------------------------
  @Output() scrollClick = new EventEmitter();
  // -------------------------End of Emit Cuisine Click-------------------------

  // -------------------------Component Info-------------------------
  areas: any[];
  imgSrc: Array<string> = [];
  // -------------------------End of Component Info-------------------------

  constructor(private apiService: ApiService) {}

  // --------------------------------------------------GET Cuisine List--------------------------------------------------
  ngOnInit(): void {
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~Areas~~~~~~~~~~~~~~~~~~~~~~~~~');
    this.apiService.getAreas().subscribe((data: any) => {
      // console.log('Data  ---> ', data);
      this.areas = data.meals;
      // console.log('Areas  ---> ', this.areas);
      for (let i of this.areas) {
        this.imgSrc.push(`../../assets/images/cuisines/${i.strArea}.jpg`);
      }
      // console.log('ImgSrc  ---> ', this.imgSrc);
    });
  }
  // --------------------------------------------------End of GET Cuisine List--------------------------------------------------

  // --------------------------------------------------Emit Cuisine Click--------------------------------------------------
  onClick(event: any) {
    // console.log('Area Click  ---> ',event);
    this.scrollClick.emit();
  }
  // --------------------------------------------------End of Emit Cuisine Click--------------------------------------------------
}
