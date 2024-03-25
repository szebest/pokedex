import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PokemonStore } from '../../store';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  store = inject(PokemonStore);

  searchForm = new FormGroup({
    searchText: new FormControl('', { nonNullable: true })
  });

  search() {
    this.store.search(this.searchForm.getRawValue().searchText);
  }
}
