import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = "angular-practice-001";
  names: string[] = [
    'Pisti',
    'Sanyi',
    'Béla',
    'Laci',
    'Zsófi',
    'Eszter',
  ];
  name: string;
  disabled: boolean = false;
  getName() {
    return 'Bond, James Bond';
  }
  constructor() {
    this.name = this.names[0];
    setInterval(() => {
      let index: number = Math.floor(Math.random() * this.names.length);
      // this.name = this.names[index];
      // this.disabled = !this.disabled;
    }, 2000)
  }
  setName(name): void {
    this.name = name
  }
}
