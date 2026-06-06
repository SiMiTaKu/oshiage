/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svelte' {
  import type { Component } from 'svelte'
  const component: Component<any, any, any>
  export default component
}
