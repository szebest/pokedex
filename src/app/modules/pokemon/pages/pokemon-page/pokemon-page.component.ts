import {
  Component,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';

import { PokemonApiService } from '../../api';
import { SinglePokemonResponse } from '../../models';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatChipsModule],
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

  constructor() {
    effect(() => {
      this.pokemon$ = this.api.getPokemonByNameOrId(this.pokemonId());
    });
  }
}
