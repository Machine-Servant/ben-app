import type { Favorite } from '@prisma/client';
import { Link, useFetcher } from '@remix-run/react';
import { useCallback, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { TrashIcon } from '~/components/icons';

interface FavoriteProps {
  favorite: Favorite;
}

export const FavoriteView: React.FC<FavoriteProps> = ({ favorite }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher();

  const handleDeleteFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      fetcher.submit(formRef.current, { replace: true });
    },
    [fetcher]
  );

  return (
    <Link
      to={`/games/${favorite.gameId}`}
      key={favorite.id}
      className={twMerge(
        'mb-4 flex flex-col space-x-4 overflow-hidden rounded-lg border border-slate-500 last-of-type:mb-0 lg:flex-row',
        fetcher.state !== 'idle' && 'pointer-events-none opacity-50'
      )}
    >
      {favorite.screenshotUrl ? (
        <img
          src={favorite.screenshotUrl}
          alt={favorite.name}
          className="w-80 rounded-md"
        />
      ) : (
        <div className="h-80 w-80 bg-gray-200">
          <div className="flex h-full w-full items-center justify-center">
            <svg
              className="h-16 w-16 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 5H15V7H9V5ZM7 9H17V11H7V9ZM5 13H19V15H5V13ZM7 17H17V19H7V17ZM9 21H15V23H9V21ZM3 3V21H5V3H3ZM19 3H21V21H19V3Z"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{favorite.name}</h2>
          <div className="mx-4">
            <fetcher.Form
              ref={formRef}
              method="post"
              action={'/games/toggle-favorite'}
            >
              <input type="hidden" name="gameId" value={favorite.gameId} />
              <TrashIcon
                className="h-8 w-8 cursor-pointer fill-red-500 hover:fill-red-400"
                onClick={handleDeleteFavorite}
              />
            </fetcher.Form>
          </div>
        </div>
        <p className="text-lg text-gray-300">Favorite</p>
      </div>
    </Link>
  );
};
