import type { Favorite } from '@prisma/client';
import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUserId } from '~/modules/auth';
import { FavoriteView, getFavorites } from '~/modules/games';

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect('/login');

  const favorites = await getFavorites(userId);

  return json({
    favorites,
  });
};

export default function Favorites() {
  const { favorites } = useLoaderData<typeof loader>() || {};

  return (
    <div className="flex-1 p-6">
      <h1 className="mb-8 text-6xl font-bold">Games We Love</h1>
      {favorites?.map((favorite) => (
        <FavoriteView
          favorite={favorite as unknown as Favorite}
          key={favorite.id}
        />
      ))}
    </div>
  );
}
