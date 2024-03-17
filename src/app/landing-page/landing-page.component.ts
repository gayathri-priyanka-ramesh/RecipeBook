import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements AfterViewInit {
  // -------------------------View Required Variables-------------------------
  @ViewChild('home') home: ElementRef;
  @ViewChild('categories') categories: ElementRef;
  @ViewChild('cuisines') cuisines: ElementRef;
  @ViewChild('ingredients') ingredients: ElementRef;
  @ViewChild('food') food: ElementRef;
  // -------------------------End of View Required Variables-------------------------

  // -------------------------Component Info-------------------------
  activeSection: string;
  searchQuery: string = '';
  validationMessage: string = '';
  searchType: string = '';
  toggleMenuOpen: boolean = false;
  // -------------------------End of Component Info-------------------------

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  // --------------------------------------------------Navigation--------------------------------------------------
  toggleActiveState() {
    const toggleMenu = document.querySelector('.toggleMenu');
    const navigation = document.querySelector('.navigation');
    toggleMenu?.classList.toggle('active');
    navigation?.classList.toggle('active');
  }
  // -------------------------Navigation Menu Toggle-------------------------
  toggleMenu() {
    this.toggleActiveState();
    this.toggleMenuOpen = true;
    // console.log('Toggle Clicked');
  }
  // -------------------------Navigation Menu Close-------------------------
  navigationClose() {
    if (this.toggleMenuOpen) {
      // console.log('Toogle Menu is not Closed  ---> ', this.toggleMenuOpen);
      this.toggleActiveState();
      this.toggleMenuOpen = false;
      // console.log('Navigation Close Successful');
    } else {
      // console.log('Toogle Menu is not Open  ---> ', this.toggleMenuOpen);
    }
  }
  // --------------------------------------------------End of Navigation--------------------------------------------------

  // --------------------------------------------------Track Active Section--------------------------------------------------
  ngAfterViewInit(): void {
    this.activeSection = 'home';
    this.cdr.detectChanges();
  }
  // -------------------------Scroll to Active Section-------------------------
  scroll(section: string): void {
    this.activeSection = section;
    // console.log('Active Section  ---> ', this.activeSection);
    const targetElement: any = this[section as keyof LandingPageComponent];
    // console.log('Target Element  ---> ', targetElement);
    if (targetElement) {
      targetElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  // --------------------------------------------------End of Track Active Section--------------------------------------------------

  // --------------------------------------------------Recipe Search--------------------------------------------------
  search(form: NgForm): void {
    // -------------------------Form Values-------------------------
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~Search~~~~~~~~~~~~~~~~~~~~~~~~~');
    // console.log('Form Object  ---> ', form);
    // console.log('Values of Form  ---> ', form.value);
    this.searchQuery = form.value.searchQuery;
    // console.log('SearchQuery  ---> ', this.searchQuery);
    this.searchType = form.value.searchType;
    // console.log('SearchType  ---> ', this.searchType);

    // -------------------------Valid Submit-------------------------
    if (this.searchQuery && this.searchType) {
      switch (this.searchType) {
        case 'category':
          // console.log('Category Search');
          this.router.navigate(['/categorySearch', this.searchQuery]);
          this.food.nativeElement.scrollIntoView({ behaviour: 'smooth' });
          form.reset();
          break;
        case 'area':
          // console.log('Area Search');
          this.router.navigate(['/cuisineSearch', this.searchQuery]);
          this.food.nativeElement.scrollIntoView({ behaviour: 'smooth' });
          form.reset();
          break;
        case 'ingredient':
          // console.log('Ingredient Search');
          this.router.navigate(['/ingredientSearch', this.searchQuery]);
          this.food.nativeElement.scrollIntoView({ behaviour: 'smooth' });
          form.reset();
          break;
        case 'food':
          // console.log('Food Search');
          this.router.navigate(['/recipe', this.searchQuery]);
          form.reset();
          break;
      }
    }

    // -------------------------Invalid Submit Validation-------------------------
    else {
      // console.log('Invalid Search');
      // console.log(
      //   `SearchQuery -> ${this.searchQuery}  -----  SearchType -> ${this.searchType}`
      // );
      if (this.searchQuery && this.searchType == '') {
        this.validationMessage = 'Please choose the type to search';
      } else if (!this.searchQuery && this.searchType != '') {
        this.validationMessage = 'Please enter the item to search';
      } else if (!this.searchQuery && this.searchType == '') {
        this.validationMessage = 'Please enter the item and its type to search';
      }
    }
  }
  clearValidation(): void {
    this.validationMessage = '';
  }
  // --------------------------------------------------End of Recipe Search--------------------------------------------------
}
