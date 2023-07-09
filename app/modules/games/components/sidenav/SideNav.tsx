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
            <li className="w-full border-b hover:bg-gray-100">
              <Link
                className="block h-full w-full px-8 py-4 text-xl"
                to="/games"
                onClick={onItemClick}
              >
                Games
              </Link>
            </li>
            <li className="w-full border-b hover:bg-gray-100">
              <Link
                className="block h-full w-full px-8 py-4 text-xl"
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
          <li className="w-full border-b px-4 py-2 hover:bg-gray-100">
            <div className="flex items-center gap-8">
              <Avatar.Root className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-500">
                <Avatar.Image />
                <Avatar.Fallback>
                  {user.email.slice(0, 1).toUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>
              {user.email}
            </div>
          </li>
          <li className="w-full hover:bg-gray-100">
            <Form method="post" action="/logout">
              <button
                className="w-full bg-slate-800 px-4 py-2 text-white"
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
