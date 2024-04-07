import {
  Component,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { PokemonDetailsStore } from '../../store';
import { SinglePokemonResponse } from '../../models';
import {
  BasicTabComponent,
  CriesTabComponent,
  StatsTabComponent,
} from '../../components';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    BasicTabComponent,
    CriesTabComponent,
    StatsTabComponent,
  ],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.scss',
})
export class PokemonPageComponent {
  store = inject(PokemonDetailsStore);

  pokemonId = input.required({
    alias: 'id',
    transform: numberAttribute,
  });

  pokemon: SinglePokemonResponse | undefined = undefined;
  loading = this.store.loading;

  constructor() {
    effect(
      async () => {
        await this.store.loadSingle(this.pokemonId());

        this.pokemon = this.store.pokemons().get(this.pokemonId());
      },
      { allowSignalWrites: true }
    );
  }
}
