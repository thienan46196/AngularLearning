import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'shopping-app';
  loadedFeature = 'recipes';
  constructor() {}

  ngOnInit(): void {}

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
