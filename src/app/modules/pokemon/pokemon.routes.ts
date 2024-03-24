import { Routes, UrlSegment } from '@angular/router';

import { MainPageComponent, PokemonPageComponent } from './pages';

export const POKEMON_ROUTES: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: ':id',
    component: PokemonPageComponent,
    canMatch: [
      // only allow to match when path is a number
      (_: never, segments: UrlSegment[]) => segments[0].path === String(Number(segments[0].path))
    ]
  }
];
