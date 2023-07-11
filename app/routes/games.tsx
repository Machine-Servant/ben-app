import { animated, config, useSpring } from '@react-spring/web';
import type { LoaderArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link, Outlet, useNavigation } from '@remix-run/react';
import { useEffect, useMemo, useState } from 'react';
import { HamburgerIcon } from '~/components/icons';
import { getUserId } from '~/modules/auth';
import { GameDetailsView, GamesSearch, SideNav } from '~/modules/games';
import { useUser } from '~/utils';

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect('/login');
  return json({});
};

export default function Games() {
  const user = useUser();
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

  const navigation = useNavigation();

  const OptimisticUI = useMemo(() => {
    if (navigation.state !== 'loading') return null;

    if (navigation.location?.pathname.match(/\/games$/)) {
      return <GamesSearch />;
    }
    if (navigation.location?.pathname.match(/\/games\/\d+$/)) {
      return <GameDetailsView />;
    }
  }, [navigation.state, navigation.location?.pathname]);

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to="/games">Games</Link>
        </h1>
        <button
          className="block sm:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <HamburgerIcon className="h-8 w-8 fill-white" />
        </button>
      </header>
      <main className="relative flex flex-1">
        <animated.div
          style={style}
          className="absolute inset-0 z-10 flex -translate-x-full flex-col bg-gray-300 sm:hidden"
        >
          <SideNav user={user} onItemClick={() => setIsMenuOpen(false)} />
        </animated.div>
        <div className="hidden sm:relative sm:flex sm:w-80 sm:translate-x-0 sm:flex-col sm:border-r sm:bg-gray-50">
          <SideNav user={user} />
        </div>
        <div className="flex flex-1">
          {OptimisticUI ? OptimisticUI : <Outlet />}
        </div>
      </main>
    </div>
  );
}
