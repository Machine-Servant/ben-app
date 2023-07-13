import type { User } from '@prisma/client';
import * as Avatar from '@radix-ui/react-avatar';
import { Form, Link } from '@remix-run/react';

interface SideNavProps {
  onItemClick?: () => void;
  user: User;
}

export const SideNav: React.FC<SideNavProps> = ({ user, onItemClick }) => {
  return (
    <>
      <div className="mb-auto w-full">
        <nav className="w-full">
          <ul className="flex flex-col">
            <li className="w-full border-b border-red-500 bg-red-800 hover:bg-red-600">
              <Link
                className="block h-full w-full px-8 py-4 text-xl text-white"
                to="/games"
                onClick={onItemClick}
              >
                Games
              </Link>
            </li>
            <li className="w-full border-b border-red-500 bg-red-800 hover:bg-red-600">
              <Link
                className="block h-full w-full px-8 py-4 text-xl text-white"
                to="favorites"
                onClick={onItemClick}
              >
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <nav className="mt-auto w-full">
        <ul className="flex flex-col">
          <li className="w-full border-b border-yellow-500 px-4 py-2 hover:bg-green-700">
            <div className="flex items-center gap-8">
              <Avatar.Root className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500">
                <Avatar.Image />
                <Avatar.Fallback className="text-yellow-500">
                  {user.email.slice(0, 1).toUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>
              <span className="text-yellow-500">{user.email}</span>
            </div>
          </li>
          <li className="w-full hover:bg-gray-100">
            <Form method="post" action="/logout">
              <button
                className="w-full bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
                type="submit"
              >
                Logout
              </button>
            </Form>
          </li>
        </ul>
      </nav>
    </>
  );
};
