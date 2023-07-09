<<<<<<< HEAD
import { animated, config, useSpring } from '@react-spring/web';
import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link, Outlet } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { HamburgerIcon } from '~/components/icons';
import { getUserId } from '~/modules/auth';
import { SideNav } from '~/modules/games';
=======
import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { getUserId } from '~/modules/auth';
>>>>>>> origin/main
import { useUser } from '~/utils';

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect('/login');
  return json({});
};

export default function Games() {
  const user = useUser();
<<<<<<< HEAD
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [style, api] = useSpring(
    () => ({
      config: {
        ...config.default,
      },
    }),
    []
  );

  useEffect(() => {
    if (isMenuOpen) {
      api.start({
        from: {
          transform: 'translateX(-100%)',
        },
        to: {
          transform: 'translateX(0%)',
        },
      });
    } else {
      api.start({
        from: {
          transform: 'translateX(0%)',
        },
        to: {
          transform: 'translateX(-100%)',
        },
      });
    }
  }, [isMenuOpen, api]);
=======
>>>>>>> origin/main

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to="/games">Games</Link>
        </h1>
<<<<<<< HEAD
        <button
          className="block sm:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <HamburgerIcon className="h-8 w-8 fill-white" />
        </button>
      </header>

      <main className="relative flex flex-1 bg-white">
        <animated.div
          style={style}
          className={twMerge(
            'absolute inset-0 flex -translate-x-full flex-col bg-gray-300 sm:hidden'
          )}
        >
          <SideNav user={user} onItemClick={() => setIsMenuOpen(false)} />
        </animated.div>
        <div className="hidden sm:relative sm:flex sm:w-80 sm:translate-x-0 sm:flex-col sm:border-r sm:bg-gray-50">
          <SideNav user={user} />
        </div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
=======
        <p>{user.email}</p>
        <Form method="post" action="/logout">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>
>>>>>>> origin/main
    </div>
  );
}
