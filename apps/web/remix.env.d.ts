/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />
import type { Context } from './app/context'

declare module '@remix-run/node' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AppLoadContext extends Context {}
}
