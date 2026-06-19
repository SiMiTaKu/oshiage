---
name: fix-from-issue
description: GitHub Issue の内容から本リポジトリ（prs-procurement-frontend-v2）の修正を行い PR を作るときの手順。ai-fix ワークフロー（fix-by-ai ラベル）から呼ばれる。Issue起点でバグ修正・小改修・リファクタを行う際に使う。
---

# Issue起点の自動修正スキル

GitHub Issue を入力に、最小限の修正を行って Pull Request を作るための手順。
ai-fix ワークフロー（`fix-by-ai` ラベル）から起動される。**マージは必ず人間が行う**前提で、PR作成までを担う。

## 0. 前提・ゴール

- 本リポジトリは調達ドメインのフロントエンド。**FSD（Feature-Sliced Design）** を採用。
- 依存に `@prs/design-system`（AWS CodeArtifact）を含む。CIでは `setup-node-pnpm` が認証・install 済み。
- ゴールは「Issueに書かれた受け入れ条件を満たす最小修正の PR」。**広範囲の書き換え・無関係な整形はしない**。

## 1. まずルールを読む

着手前に以下を読み、規約に従う:

- `.github/instructions/general.instructions.md` … ルールの索引（常時必須）
- `.github/instructions/architecture-design.instructions.md` … FSD / Slice 設計（常時必須）
- `.github/instructions/frontend-foundation.instructions.md` … 実装の基本思想（常時必須）
- `.github/instructions/ubiquitous-language.instructions.md` … ドメイン用語（常時必須）
- テストを書く/直すなら `unit-test` / `integration-test` / `e2e-test` の各 instructions

## 2. Issueを構造化して読む

Issue 本文から次を抽出する:

| 項目                        | 用途                                   |
| --------------------------- | -------------------------------------- |
| 修正対象ファイル / 該当箇所 | 探索の起点。書かれていれば優先的に開く |
| 現状の挙動 / 再現手順       | 何が問題かの確定                       |
| 期待する挙動                | 修正のゴール                           |
| 制約・前提                  | 触ってはいけない箇所・守るべき設計     |
| 受け入れ条件 / 検証方法     | 完了判定とテスト要否                   |

### 情報不足のときは止まる

修正対象や期待挙動が曖昧で**確信が持てない場合は、推測で広範囲を書き換えない**。
Issue に「何が分かれば修正できるか」をコメントで質問し、**PRは作らずに終了**する。
誤った自動修正を量産しないことが最優先。

## 3. 修正方針

- FSD のレイヤー（`shared` → `entities` → `features` → `widgets` → `pages`）の依存方向を守る。
  下位レイヤーが上位を import しない。
- orval 生成コード（`src/shared/api` 等）は手で書き換えない。API I/F は変えない。
- 指摘範囲に**限定**する。ついでのリネーム・整形・最適化はしない。
- 既存の命名・コードスタイル・近隣ファイルのイディオムに合わせる。
- ロジック修正には、可能なら対応するテストを追加/更新する（`tests/unit`, `tests/integration`）。

## 4. 検証（必須）

修正後、最低限これを実行して緑であることを確認する。失敗したら直す。直せない/範囲外なら PR 説明に明記:

```bash
pnpm run typecheck
pnpm run lint          # lint:arch (steiger / FSD) + lint:code (eslint)
pnpm run test:unit
pnpm run test:integration   # 関連がある場合
```

## 5. PR を作る

- ブランチ: `ai-fix/issue-<番号>-<run_id>`（ワークフローから指定された名前を使う）
- base: `main`
- PR 本文（`.github/pull_request_template.md` があれば踏襲）に必ず含める:
  - 何の Issue を / どう直したかの要約 + 変更ファイル一覧
  - `Closes #<番号>`
  - 実行した検証コマンドと結果
  - 「**このPRは自動生成です。マージ前に必ず人間がレビューしてください**」
  - 確信が持てない点・残課題は「リスク / 要確認」として明記
- **自動マージは絶対にしない。**

## チェックリスト

- [ ] instructions を読んだ
- [ ] Issue から受け入れ条件を特定した（不足なら質問して終了）
- [ ] 修正は指摘範囲に限定されている
- [ ] typecheck / lint / test が通る
- [ ] PR 本文に要約・Closes・検証結果・自動生成の注意書き・リスクを記載した
