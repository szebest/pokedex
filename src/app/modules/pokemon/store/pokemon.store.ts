import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { firstValueFrom } from 'rxjs';

import { PokemonApiService } from '../api';
import { PokemonListResponse } from '../models';

type PokemonState = {
  response: PokemonListResponse;
  loading: boolean;
  filter: {
    query: string;
  };
};

const initialState: PokemonState = {
  response: {
    results: [],
    count: 0,
    next: null,
    previous: null
  },
  loading: false,
  filter: { query: '' },
};

export const PokemonStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ response: { results }, filter: { query } }) => ({
    filteredPokemons: computed(() => results().filter(x => x.name.includes(query())))
  })),
  withMethods((store) => ({
    async load() {
      const api = inject(PokemonApiService);

      if (store.response.count() > 0) return;

      patchState(store, { loading: true });

      const response = await firstValueFrom(api.getPokemons());

      const mappedResults = response.results.map(x => {
        const id = Number(x.url.split('/').at(-2));

        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return { ...x, imageUrl, id };
      });

      patchState(store, { response: { ...response, results: mappedResults }, loading: false });
    },
    search(query: string) {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
  }))
);
