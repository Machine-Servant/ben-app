import type { V2_MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import Mario from '~/assets/images/mario.jpg';

import { useOptionalUser } from '~/utils';

export const meta: V2_MetaFunction = () => [{ title: 'Remix Notes' }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative h-screen sm:h-auto sm:pb-16 sm:pt-8">
        <div className="mx-auto h-full max-w-7xl sm:h-auto sm:px-6 lg:px-8">
          <div className="relative flex h-full shadow-xl sm:block sm:h-auto sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src={Mario}
                alt="Mario, Luigi, and Yoshi"
              />
              <div className="absolute inset-0 bg-slate-300 mix-blend-multiply" />
            </div>
            <div className="relative self-center px-4 pb-8 pt-16 sm:self-auto sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-red-500 drop-shadow-md">
                  Games We Like
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                A collection of games we like to play, and a place to find new
                games to play.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/games"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-red-700 shadow-sm hover:bg-red-50 sm:px-8"
                  >
                    View Games for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-red-700 shadow-sm hover:bg-red-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-red-500 px-4 py-3 font-medium text-white hover:bg-red-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
              <a href="https://remix.run">
                <h2 className="mx-auto mt-16 w-full text-center text-4xl font-bold text-white sm:text-6xl lg:text-8xl">
                  Powered By Ben's Imagination
                </h2>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
