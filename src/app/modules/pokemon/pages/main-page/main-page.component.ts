import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PokemonStore } from '../../store';
import { PokemonCardComponent, SearchComponent } from '../../components';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SearchComponent, PokemonCardComponent, NgOptimizedImage, RouterLink, MatProgressSpinnerModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  store = inject(PokemonStore);

  filteredPokemons = this.store.filteredPokemons;
  query = this.store.filter.query;
  loading = this.store.loading;

  constructor() {
    this.store.load();
  }
}
