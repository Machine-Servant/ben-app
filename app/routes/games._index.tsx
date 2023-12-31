import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { getUserId } from '~/modules/auth';
import type { Game } from '~/modules/games';
import { GamesSearch } from '~/modules/games/components/games-search';
import { getFavorites, searchForGames } from '~/modules/games/service.server';
import type { RawgListResponse } from '~/types';

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect('/login');

  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('search');
  const uri = url.searchParams.get('uri');

  let games;
  if (searchTerm && !uri) {
    games = await searchForGames(searchTerm);
  }

  if (uri) {
    const decodedUri = decodeURIComponent(uri);
    const response = await fetch(decodedUri, { method: 'GET' });
    games = (await response.json()) as RawgListResponse<Game>;
  }

  const favorites = await getFavorites(userId);

  return json({
    searchTerm,
    games,
    favorites,
  });
};

export default function GamesPage() {
  const navigation = useNavigation();
  const { searchTerm, games, favorites } = useLoaderData<typeof loader>() || {};

  return (
    <GamesSearch
      searchTerm={searchTerm}
      games={games}
      navigationState={navigation.state}
      favorites={favorites.map((favorite) => ({
        ...favorite,
        createdAt: new Date(favorite.createdAt),
        updatedAt: new Date(favorite.updatedAt),
      }))}
    />
  );
}
