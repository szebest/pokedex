import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { firstValueFrom } from 'rxjs';

import { PokemonApiService } from '../api';
import { SinglePokemonResponse } from '../models';

type PokemonDetailsState = {
  pokemons: Map<number | string, SinglePokemonResponse>;
  loading: boolean;
};

const initialState: PokemonDetailsState = {
  pokemons: new Map(),
  loading: false,
};

export const PokemonDetailsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, pokemonApi = inject(PokemonApiService)) => ({
    async loadSingle(key: number | string) {
      if (store.pokemons().has(key)) return;

      patchState(store, { loading: true });

      const response = await firstValueFrom(
        pokemonApi.getPokemonByNameOrId(key)
      );

      store.pokemons().set(key, response);

      patchState(store, { pokemons: store.pokemons(), loading: false });
    },
  }))
);
