import { json, type ActionArgs } from '@remix-run/node';
import { getUserId } from '~/modules/auth';
import { addOrRemoveGameFromFavorites } from '~/modules/games';

export const action = async ({ request, params }: ActionArgs) => {
  const userId = await getUserId(request);
  if (!userId) return json({ message: 'Unauthorized' }, { status: 401 });

  const { gameId } = params;
  if (!gameId) return json({ message: 'Game ID is required' }, { status: 400 });

  await addOrRemoveGameFromFavorites(userId, Number.parseInt(gameId, 10));

  return json({ message: `Game ${params.gameId} favorited` });
};
