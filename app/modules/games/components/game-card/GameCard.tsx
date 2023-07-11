import { Form, Link, useSubmit } from '@remix-run/react';
import { useCallback, useRef } from 'react';
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
  const submit = useSubmit();

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      submit(formRef.current, { replace: true });
    },
    [submit]
  );

  return (
    <Link
      to={`/games/${game.id}`}
      className="mb-8 flex flex-col gap-4 overflow-hidden rounded-lg border border-slate-400 lg:flex-row"
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
      <div className="flex flex-1 flex-col justify-between px-4 pb-4 lg:px-0 lg:py-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">{game.name}</h3>
            <h4 className="text-sm font-semibold text-slate-600">
              {game.released && dateFormatter.format(new Date(game.released))}
            </h4>
          </div>
          <div className="px-4">
            <Form
              ref={formRef}
              method="post"
              action={`/games/${game.id}/favorite`}
            >
              <input type="hidden" name="gameId" value={game.id} />
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
            </Form>
          </div>
        </div>
        <div>
          {game.platforms.map((platform) => (
            <span
              key={platform.platform.id}
              className="mr-1 inline-block rounded bg-slate-600 px-2 py-1 text-xs font-semibold text-white"
            >
              {platform.platform.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
