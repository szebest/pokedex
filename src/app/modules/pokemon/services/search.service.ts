import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokemonStore } from '../store';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  store = inject(PokemonStore);
  router = inject(Router);
  route = inject(ActivatedRoute);

  query = this.store.filter().query;

  initialize() {
    const searchQuery = this.route.snapshot.queryParamMap.get('q');

    if (searchQuery === null) {
      return;
    }

    this.store.search(searchQuery);

    return searchQuery;
  }

  search(searchText: string) {
    this.store.search(searchText);

    this.router.navigate([''], { queryParams: { q: searchText.length !== 0 ? searchText : null }, replaceUrl: true, queryParamsHandling: 'merge' });
  }
}
