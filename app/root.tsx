import { cssBundleHref } from '@remix-run/css-bundle';
import type {
  LinksFunction,
  LoaderArgs,
  V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import { getUser } from '~/modules/auth';
import stylesheet from '~/tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'icon', href: '/favicon.png', type: 'image/png' },
  { rel: 'stylesheet', href: stylesheet },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) });
};

export const meta: V2_MetaFunction = () => {
  return [
    {
      name: 'charset',
      content: 'utf-8',
    },
    {
      title: "Ben's App",
    },
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1',
    },
  ];
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
