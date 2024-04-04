import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseApiService } from '@core';

import { PokemonPreviewListResponse, SinglePokemonResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class PokemonApiService extends BaseApiService {
  private pokemonApiUrl: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {
    super();
  }

  getPokemons(): Observable<PokemonPreviewListResponse> {
    let params: HttpParams = new HttpParams();
    params = this.applyFilters(params, { limit: 10000 });

    return this.http.get<PokemonPreviewListResponse>(
      `${this.pokemonApiUrl}/pokemon`,
      {
        headers: this.getHeaders(),
        params,
      }
    );
  }

  getPokemonByNameOrId(
    nameOrId: string | number
  ): Observable<SinglePokemonResponse> {
    return this.http.get<any>(`${this.pokemonApiUrl}/pokemon/${nameOrId}`, {
      headers: this.getHeaders(),
    });
  }
}
