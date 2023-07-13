import { Link, useFetcher } from '@remix-run/react';
import { useCallback, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { HeartFilledIcon, HeartIcon } from '~/components/icons';
import type { Game } from '../../types';

interface GameCardProps {
  game: Game;
  favorite?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, favorite }) => {
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      fetcher.submit(formRef.current, { replace: true });
    },
    [fetcher]
  );

  return (
    <Link
      to={`/games/${game.id}`}
      className={twMerge(
        'relative mb-8 flex flex-col gap-4 overflow-hidden rounded-lg border border-slate-400 lg:flex-row',
        fetcher.state !== 'idle' && 'pointer-events-none opacity-50'
      )}
    >
      {fetcher.state !== 'idle' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-slate-600" />
            <span className="text-slate-400">Loading...</span>
          </div>
        </div>
      )}
      <div className="flex-none lg:w-96">
        {game.background_image ? (
          <img
            className="h-full w-full"
            src={game.background_image}
            alt={game.name}
          />
        ) : (
          <div className="flex h-60 w-full items-center justify-center border-b border-slate-400 lg:border-b-0 lg:border-r">
            <h3 className="text-center text-xl font-bold text-white">
              No image available
            </h3>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between px-4 pb-4 lg:px-0 lg:py-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-white">{game.name}</h3>
            <h4 className="text-sm font-semibold text-slate-300">
              {game.released && dateFormatter.format(new Date(game.released))}
            </h4>
          </div>
          <div className="px-4">
            <fetcher.Form
              ref={formRef}
              method="post"
              action={`/games/toggle-favorite`}
            >
              <input type="hidden" name="gameId" value={game.id} />
              <input type="hidden" name="redirectTo" value={`/games`} />
              {favorite ? (
                <HeartFilledIcon
                  className="h-8 w-8 fill-current text-red-600"
                  onClick={handleToggleFavorite}
                />
              ) : (
                <HeartIcon
                  className="h-8 w-8 fill-current text-slate-800"
                  onClick={handleToggleFavorite}
                />
              )}
            </fetcher.Form>
          </div>
        </div>
        <div>
          {game.platforms.map((platform) => (
            <span
              key={platform.platform.id}
              className="mr-1 inline-block rounded bg-green-700 px-2 py-1 text-xs font-semibold text-white"
            >
              {platform.platform.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
