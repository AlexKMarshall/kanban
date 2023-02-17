/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />
/// <reference types="@remix-run/react-router" />

import type { Context } from './app/context'

declare module '@remix-run/node' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AppLoadContext extends Context {}
}

declare module '@remix-run/react-router' {
  interface LoaderArgs {
    context: Context
  }
  interface ActionArgs {
    context: Context
  }
}
