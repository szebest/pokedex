import {
  Component,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { MatTabsModule } from '@angular/material/tabs';

import { PokemonApiService } from '../../api';
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
  api = inject(PokemonApiService);

  pokemonId = input.required({
    alias: 'id',
    transform: numberAttribute,
  });

  pokemon$: Observable<SinglePokemonResponse> | null = null;

  getPlaylist(pokemon: SinglePokemonResponse) {
    return Object.entries(pokemon.cries).map((x) => ({
      title: x[0],
      link: x[1],
    }));
  }

  constructor() {
    effect(() => {
      this.pokemon$ = this.api.getPokemonByNameOrId(this.pokemonId());
    });
  }
}
