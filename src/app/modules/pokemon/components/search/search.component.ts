import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SearchService } from '../../services';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchService = inject(SearchService);

  searchForm = new FormGroup({
    searchText: new FormControl(this.searchService.query, { nonNullable: true })
  });

  ngOnInit(): void {
    const searchText = this.searchService.initialize();

    this.searchForm.patchValue({ searchText });
  }

  search() {
    const searchText = this.searchForm.getRawValue().searchText;

    this.searchService.search(searchText);
  }
}
