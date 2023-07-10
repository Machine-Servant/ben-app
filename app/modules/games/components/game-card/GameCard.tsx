import { Link } from '@remix-run/react';
import type { Game } from '../../types';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Link
      to={`/games/${game.id}`}
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
    </Link>
  );
};
