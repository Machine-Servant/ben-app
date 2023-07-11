import { json, redirect, type LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUserId } from '~/modules/auth';
import { getGameDetails, getGameScreenshots } from '~/modules/games';
import { GameDetails } from '~/modules/games/components/game-details';

export const loader = async ({ request, params }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect('/login');

  const { gameId } = params;

  let gameDetails;
  let screenshots: string[] = [];
  if (gameId) {
    gameDetails = await getGameDetails(Number.parseInt(gameId, 10));
    screenshots = await getGameScreenshots(Number.parseInt(gameId, 10));
  }

  return json({
    gameDetails,
    screenshots,
  });
};

export default function GameDetailsPage() {
  const { gameDetails, screenshots } = useLoaderData<typeof loader>() || {};

  return <GameDetails gameDetails={gameDetails} screenshots={screenshots} />;
}
