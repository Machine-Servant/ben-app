import { ImageTag } from '~/components/image-tag';
import type { GameDetails as GameDetailsType } from '../../types';
import { ImageDialog } from './components/image-dialog';

interface GameDetailsViewProps {
  gameDetails?: GameDetailsType | null;
  screenshots?: string[] | null;
}

export const GameDetailsView: React.FC<GameDetailsViewProps> = ({
  gameDetails,
  screenshots,
}) => {
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6 border-b border-yellow-500 bg-green-700">
        <img
          className="h-96 w-full sm:mx-auto sm:w-auto"
          src={gameDetails?.background_image}
          alt={gameDetails?.name}
        />
      </div>
      <h1 className="mb-6 text-center text-3xl font-bold text-white sm:text-6xl">
        {gameDetails?.name}
      </h1>
      <h4 className="mb-6 text-center text-sm text-slate-300">
        Released{' '}
        {gameDetails?.released &&
          dateFormatter.format(new Date(gameDetails.released))}
      </h4>
      {gameDetails?.website && (
        <h4 className="mb-6 text-center text-sm text-white underline">
          <a href={gameDetails.website} target="_blank" rel="noreferrer">
            Website
          </a>
        </h4>
      )}
      <h2 className="mb-6 px-4 text-center text-2xl font-bold text-white sm:text-4xl lg:text-left">
        Platforms
      </h2>
      <div className="mb-6 flex flex-wrap items-center justify-around">
        {gameDetails?.platforms.map(({ platform }) => (
          <ImageTag key={platform.id} {...platform} />
        ))}
      </div>
      <h2 className="mb-6 px-4 text-center text-2xl font-bold text-white sm:text-4xl lg:text-left">
        Genres
      </h2>
      <div className="mb-6 flex flex-wrap items-center justify-around">
        {gameDetails?.genres.map((genre) => (
          <ImageTag key={genre.id} {...genre} />
        ))}
      </div>
      <h2 className="mb-6 px-4 text-center text-2xl font-bold text-white sm:text-4xl lg:text-left">
        Description
      </h2>
      <div
        className="mb-6 px-4 text-lg text-white"
        dangerouslySetInnerHTML={{ __html: gameDetails?.description || '' }}
      />
      <h2 className="mb-6 px-4 text-center text-2xl font-bold text-white sm:text-4xl lg:text-left">
        Details
      </h2>
      <h3 className="mb-6 px-4 text-lg font-bold text-white sm:text-xl lg:text-left">
        Rating: {gameDetails?.rating}
      </h3>
      <h3 className="mb-6 px-4 text-lg font-bold text-white sm:text-xl lg:text-left">
        Metacritic Rating: {gameDetails?.metacritic}
      </h3>
      <h2 className="mb-6 px-4 text-center text-2xl font-bold text-white sm:text-4xl lg:text-left">
        Screenshots
      </h2>
      {screenshots && screenshots.length > 0 ? (
        <div className="mb-6 flex flex-wrap items-center justify-around px-4">
          {screenshots.map((screenshot) => (
            <ImageDialog key={screenshot} image={screenshot} />
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
};
