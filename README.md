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
- Docker（ローカルMySQL起動に使用）

### 依存インストール（Install）

```bash
pnpm install
```

### 環境変数の設定（Environment Variables）

バックエンドは `backend/.env` を参照します。`.env.example` をコピーして作成してください。

```bash
cp backend/.env.example backend/.env
```

| 変数名         | 説明              | デフォルト値（docker-compose使用時）           |
| -------------- | ----------------- | ---------------------------------------------- |
| `DATABASE_URL` | MySQLの接続文字列 | `mysql://root:password@localhost:3306/oshiage` |

> `.env` はGit管理外です（`.gitignore` により除外）。本番環境では別途デプロイ時に設定してください。

### ローカルDBの起動（Start Local Database）

Docker Composeを使って MySQL 8 をローカルで起動します。

```bash
docker compose up -d
```

停止する場合:

```bash
docker compose down
```

データも含めて完全削除する場合:

```bash
docker compose down -v
```

### DBマイグレーション（Run Migrations）

```bash
pnpm --filter @oshiage/backend prisma:migrate
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
pnpm run dev:storybook
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
