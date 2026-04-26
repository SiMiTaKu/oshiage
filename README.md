# oshiage

推しアゲ MVP の monorepo です。  
Phase 1 では、`backend / web / admin / design-system / openapi` の開発基盤を整えることを目的にしています。

## 技術スタック（Tech Stack）

- backend: NestJS + TypeScript + Prisma + OpenAPI（code-first）
- web: SvelteKit + TypeScript + FSD
- admin: SvelteKit + TypeScript
- design-system: Svelte 5 + Storybook
- package manager: pnpm

## ディレクトリ構造（Directory Layout）

```text
.
├── backend              # バックエンドAPI（NestJS / Prisma）
├── design-system        # UIコンポーネントとStorybook
├── web                  # ユーザー向けWebアプリ
├── admin                # 管理画面
├── openapi              # OpenAPI定義と生成設定（orval）
└── .github/workflows    # CI設定
```

## 補足: `packages/api-client` について

以前は `packages/api-client` を設けてSDKを別パッケージとして運用していましたが、現状は採用しません。  
OpenAPI 生成クライアントは、以下に直接生成する方針へ変更しています。

- `web/src/shared/api/generated/client.ts`
- `admin/src/shared/api/generated/client.ts`

この方針は、参照いただいた `prs-procurement-frontend-v2/src/shared/api` と同様に、各フロントエンドが `src/shared/api` 配下で完結する思想に揃えています。

## セットアップ（Setup）

### 前提（Prerequisites）

- Node.js 24+
- pnpm 10+

### 依存インストール（Install）

```bash
pnpm install
```

### OpenAPI / SDK 生成（Generate OpenAPI and SDK）

```bash
pnpm run generate:sdk
```

### 起動コマンド（Start Apps）

```bash
pnpm run dev:backend
pnpm run dev:web
pnpm run dev:admin
pnpm run dev:design-system
```

## 品質チェック（Quality Gates）

```bash
pnpm run lint
pnpm run format:check
pnpm run check
pnpm run test
pnpm run build
pnpm run verify
```

## 運用メモ（Notes）

- pre-commit では `lint-staged` の後に OpenAPI / SDK 再生成を実行します。
- OpenAPI は `backend` から生成し、`orval` で `web/admin` の `src/shared/api/generated` に出力します。
- design-system の Story 管理は Storybook 10 系（Svelte 5対応）を前提にしています。
- 将来モバイルアプリを追加する場合は、`mobile` ディレクトリを追加する想定です。
