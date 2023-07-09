import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { getUserId } from '~/modules/auth';

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect('/login');
  return json({});
};

export default function GamesPage() {
  return (
    <div>
      <h1 className="text-6xl font-bold">Games</h1>
    </div>
  );
}
