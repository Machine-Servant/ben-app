import type { User } from '@prisma/client';
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
            Logged in as {user.email}
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
