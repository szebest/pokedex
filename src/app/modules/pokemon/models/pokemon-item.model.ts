import { PokemonPreview } from "./pokemon-preview.model";

export type PokemonItem = PokemonPreview & {
  id: number;
  imageUrl: string;
}
