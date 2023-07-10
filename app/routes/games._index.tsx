import * as ReactForm from '@radix-ui/react-form';
import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData, useNavigation } from '@remix-run/react';
import { twMerge } from 'tailwind-merge';
import { SearchIcon } from '~/components/icons';
import { getUserId } from '~/modules/auth';
import type { Game } from '~/modules/games';
import { searchForGames } from '~/modules/games/service.server';
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

  return json({
    searchTerm,
    games,
  });
};

export default function GamesPage() {
  const navigation = useNavigation();
  const { searchTerm, games } = useLoaderData<typeof loader>() || {};

  return (
    <div className="flex flex-1 flex-col p-6">
      <div>
        <h1 className="mb-6 text-center text-3xl font-bold sm:text-6xl">
          Games we want to find
        </h1>
        <Form
          method="get"
          action="/games?index"
          className="flex flex-col items-center"
        >
          <ReactForm.Root asChild>
            <ReactForm.Field
              name="search"
              className="relative flex w-80 items-center gap-4"
            >
              <SearchIcon className="absolute left-2 top-1 h-8 w-8 fill-black" />
              <ReactForm.Control
                type="text"
                placeholder="Search for a game"
                defaultValue={searchTerm || ''}
                className="flex-1 rounded-full border border-slate-500 py-2 pl-12 pr-4"
              />
              <ReactForm.Submit
                className="disabled:opacity-25"
                disabled={navigation.state === 'submitting'}
              >
                Go
              </ReactForm.Submit>
            </ReactForm.Field>
          </ReactForm.Root>
        </Form>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        {searchTerm && (
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-4xl">
            Showing results for "{searchTerm}"
          </h2>
        )}
        {games &&
          games?.results?.length > 0 &&
          games.results.map((game) => (
            <div
              key={game.id}
              className="mb-8 flex flex-col gap-4 rounded-lg border border-slate-400 lg:flex-row"
            >
              <div className="flex-none lg:w-96">
                {game.background_image ? (
                  <img
                    className="h-full w-full"
                    src={game.background_image}
                    alt={game.name}
                  />
                ) : (
                  <div className="flex h-60 w-full items-center justify-center border-b border-slate-400 lg:border-b-0 lg:border-r">
                    <h3 className="text-center text-xl font-bold text-slate-600">
                      No image available
                    </h3>
                  </div>
                )}
              </div>
              <div className="flex-1 px-4 pb-4 lg:px-0 lg:py-4">
                <h3 className="text-xl font-bold">{game.name}</h3>
              </div>
            </div>
          ))}
      </div>
      <div className="flex w-full items-center justify-between self-end">
        <Link
          to={`/games?index&search=${searchTerm}&uri=${encodeURIComponent(
            games?.previous || ''
          )}`}
          className={twMerge(
            'rounded-md bg-slate-800 px-4 py-2 text-white',
            !games?.previous && 'cursor-not-allowed opacity-25'
          )}
          onClick={(e) => games?.previous || e.preventDefault()}
        >
          Previous
        </Link>
        <Link
          to={`/games?index&search=${searchTerm}&uri=${encodeURIComponent(
            games?.next || ''
          )}`}
          className={twMerge(
            'rounded-md bg-slate-800 px-4 py-2 text-white',
            !games?.next && 'cursor-not-allowed opacity-25'
          )}
          onClick={(e) => games?.next || e.preventDefault()}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
