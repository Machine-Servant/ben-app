import type { RawgListResponse } from '~/types';
import type { Game } from './types';

export async function searchForGames(
  searchTerm: string
): Promise<RawgListResponse<Game>> {
  console.log(process.env.RAWG_API_KEY);
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${searchTerm}&parent_platforms=7`,
    {
      method: 'GET',
    }
  );
  const json = (await response.json()) as RawgListResponse<Game>;
  return json;
}
