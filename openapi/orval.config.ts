import { defineConfig } from 'orval';

export default defineConfig({
  web: {
    input: {
      target: './generated/openapi.json',
    },
    output: {
      target: '../web/src/shared/api/generated/client.ts',
      client: 'fetch',
      clean: true,
      mock: false,
      override: {
        mutator: {
          path: '../web/src/shared/api/runtime.ts',
          name: 'customFetcher',
        },
      },
    },
  },
  admin: {
    input: {
      target: './generated/openapi.json',
    },
    output: {
      target: '../admin/src/shared/api/generated/client.ts',
      client: 'fetch',
      clean: true,
      mock: false,
      override: {
        mutator: {
          path: '../admin/src/shared/api/runtime.ts',
          name: 'customFetcher',
        },
      },
    },
  },
});
