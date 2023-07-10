import { json, type LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getGameDetails, getGameScreenshots } from '~/modules/games';

export const loader = async ({ request, params }: LoaderArgs) => {
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

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6">
        <img
          className="h-96 w-full sm:mx-auto sm:w-auto"
          src={gameDetails?.background_image}
          alt={gameDetails?.name}
        />
      </div>
      <h1 className="mb-6 text-center text-3xl font-bold sm:text-6xl">
        {gameDetails?.name}
      </h1>
      <h4 className="mb-6 text-center text-sm text-slate-600">
        Released {dateFormatter.format(new Date(gameDetails?.released || ''))}
      </h4>
      <h2 className="mb-6 text-center text-2xl font-bold sm:text-4xl">
        Platforms
      </h2>
      <div className="mb-6 flex flex-wrap items-center justify-around">
        {gameDetails?.platforms.map((platform) => (
          <div
            key={platform.platform.id}
            className="mb-2 rounded-full bg-slate-200 px-2 py-1 font-bold"
          >
            <h4 className="text-center text-sm text-slate-600">
              {platform.platform.name}
            </h4>
          </div>
        ))}
      </div>
      <h2 className="mb-6 text-center text-2xl font-bold sm:text-4xl">
        Description
      </h2>
      <div
        className="mb-6 px-4 text-lg"
        dangerouslySetInnerHTML={{ __html: gameDetails?.description || '' }}
      />
      <h2 className="mb-6 text-center text-2xl font-bold sm:text-4xl">
        Screenshots
      </h2>
      {screenshots.length > 0 ? (
        <div className="mb-6 flex flex-wrap items-center justify-around">
          {screenshots.map((screenshot) => (
            <div
              key={screenshot}
              className="mb-2 overflow-hidden rounded-lg border border-slate-400"
            >
              <img
                className="h-60 w-full"
                src={screenshot}
                alt={gameDetails?.name}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-6 flex h-60 w-full items-center justify-center border border-slate-400">
          <h3 className="text-center text-xl font-bold text-slate-600">
            No screenshots available
          </h3>
        </div>
      )}
    </div>
  );
}
