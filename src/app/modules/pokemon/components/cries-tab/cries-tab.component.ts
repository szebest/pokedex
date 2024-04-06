import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SinglePokemonResponse } from '../../models';

@Component({
  selector: 'app-cries-tab',
  standalone: true,
  imports: [],
  templateUrl: './cries-tab.component.html',
  styleUrl: './cries-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CriesTabComponent {
  pokemon = input.required<SinglePokemonResponse>();
}
