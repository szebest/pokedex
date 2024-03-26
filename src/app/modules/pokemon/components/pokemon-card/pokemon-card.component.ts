import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

import { PokemonItem } from '../../models';


@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  pokemon = input.required<PokemonItem>();
}
