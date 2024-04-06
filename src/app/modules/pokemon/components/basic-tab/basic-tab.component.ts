import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MatChipsModule } from '@angular/material/chips';

import { PokemonIdPipe } from '../../pipes';
import { SinglePokemonResponse } from '../../models';

@Component({
  selector: 'app-basic-tab',
  standalone: true,
  imports: [PokemonIdPipe, MatChipsModule],
  templateUrl: './basic-tab.component.html',
  styleUrl: './basic-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTabComponent {
  pokemon = input.required<SinglePokemonResponse>();
}
