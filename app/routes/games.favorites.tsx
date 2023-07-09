import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { getUserId } from '~/modules/auth';

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect('/login');
  return json({});
};

export default function Favorites() {
  return (
    <div>
      <h1 className="text-6xl font-bold">Favorites</h1>
    </div>
  );
}
