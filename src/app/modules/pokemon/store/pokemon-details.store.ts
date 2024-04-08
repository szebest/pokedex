import { computed, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import { firstValueFrom } from 'rxjs';

import { PokemonApiService } from '../api';
import { SinglePokemonResponse } from '../models';

type PokemonDetailsState = {
  pokemons: SinglePokemonResponse[];
  loading: boolean;
  currentPokemonKey: number | string | undefined;
  error: HttpErrorResponse | null;
};

const initialState: PokemonDetailsState = {
  pokemons: [],
  loading: false,
  currentPokemonKey: undefined,
  error: null,
};

export const PokemonDetailsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    currentPokemon: computed(() => {
      const currentPokemonKey = state.currentPokemonKey();

      return state
        .pokemons()
        .find(
          (x) => x.id === currentPokemonKey || x.name === currentPokemonKey
        );
    }),
  })),
  withMethods((store, pokemonApi = inject(PokemonApiService)) => ({
    async loadSingle(key: number | string) {
      patchState(store, { currentPokemonKey: key, error: null });

      if (
        store.pokemons().findIndex((x) => x.id === key || x.name === key) >= 0
      )
        return;

      patchState(store, { loading: true });

      try {
        const response = await firstValueFrom(
          pokemonApi.getPokemonByNameOrId(key)
        );

        const newPokemons = [...store.pokemons(), response];

        patchState(store, { pokemons: newPokemons });
      } catch (error) {
        patchState(store, { error: error as HttpErrorResponse });
      } finally {
        patchState(store, { loading: false });
      }
    },
  }))
);
