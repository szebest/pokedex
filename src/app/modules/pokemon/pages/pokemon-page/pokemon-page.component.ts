import {
  Component,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PokemonDetailsStore } from '../../store';
import {
  BasicTabComponent,
  CriesTabComponent,
  StatsTabComponent,
} from '../../components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,

    BasicTabComponent,
    CriesTabComponent,
    StatsTabComponent,
  ],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.scss',
})
export class PokemonPageComponent {
  store = inject(PokemonDetailsStore);
  router = inject(Router);
  location = inject(Location);

  pokemonId = input.required({
    alias: 'id',
    transform: numberAttribute,
  });

  currentPokemonKey = this.store.currentPokemonKey;
  pokemon = this.store.currentPokemon;
  loading = this.store.loading;
  error = this.store.error;

  constructor() {
    effect(
      async () => {
        await this.store.loadSingle(this.pokemonId());
      },
      { allowSignalWrites: true }
    );
  }

  onNextPokemon(offset: number) {
    this.router.navigate([`${this.pokemonId() + offset}`]);
  }

  goBack() {
    this.location.back();
  }
}
