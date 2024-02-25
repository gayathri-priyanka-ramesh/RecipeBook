import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'RecipeBook';
  // Navigation
  toggleMenu() {
    const toggleMenu = document.querySelector('.toggleMenu');
    const navigation = document.querySelector('.navigation');
    toggleMenu?.classList.toggle('active');
    navigation?.classList.toggle('active');
    console.log('Toggle Clicked');
  }
  // Scroll
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
