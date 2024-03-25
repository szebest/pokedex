import { PagedResult } from '@models';

import { PokemonPreview, PokemonItem } from '.';

export type PokemonPreviewListResponse = PagedResult<PokemonPreview>;

export type PokemonListResponse = PagedResult<PokemonItem>;
