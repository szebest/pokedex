import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinglePokemonResponse } from '../../models';

@Component({
  selector: 'app-stats-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-tab.component.html',
  styleUrl: './stats-tab.component.scss',
})
export class StatsTabComponent {
  pokemon = input.required<SinglePokemonResponse>();
}
