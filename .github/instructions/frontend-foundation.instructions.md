---
description: フロントエンド実装の基本思想と設計原則。UI実装・状態管理・命名・品質判断で常時参照
applyTo: '{web,admin,design-system}/**/*.{ts,tsx,js,jsx,css,scss,svelte}'
name: フロントエンド開発基盤ルール
---

# Frontend Foundation - フロントエンド開発基盤ルール

## 基本方針

- 仕様駆動で実装する
- 実装前に関連仕様を確認し、不明点は推測せず確認する
- 再利用可能な既存部品を優先し、重複実装を避ける
- 保守性・拡張性を優先し、短期的な場当たり実装を避ける

## UI実装方針

- 既存のデザインシステムまたは共通UIを最優先で利用する
- 同等コンポーネントの再実装は行わない
- 新しいUI部品が必要な場合は、共通化前提で設計する
- アクセシビリティ属性（ラベル、role、キーボード操作）を欠かさない

## CSSレイアウト方針

- 余白はできる限り `margin` / `padding` ではなく `gap`（grid/flex）で表現する
- 中央配置は `place-items: center` を優先し、個別の `margin: auto` や `align-items` / `justify-content` の組み合わせを避ける
- 要素間の空間は `gap` で統一し、個別 `margin` は使わない
- UI 崩れ防止のため、重要な要素には `width` / `height` / `min-width` / `min-height` を明示する
- `margin` / `padding` で余白を作るのは、要素自体のボーダーや背景との関係で不可避な場合のみ許可する

## ルーティング方針

- リンク先パスはすべて `shared/routes` の `ROUTES` 定数から参照し、文字列リテラルのハードコーディングを禁止する
- ページタイトルは `PAGE_TITLE` 定数から参照する
- 動的セグメントを含むパスは `ROUTES.xxx.detail(id)` の関数形式を使用する

## エラー型方針

- フロントエンドのエラーは `shared/errors` の `AppError` 抽象クラスを継承して定義する
- HTTP ステータスコードとユーザー向けメッセージを型として保持し、instanceof チェックで分岐する
- 404 → `NotFoundError`、500 → `InternalServerError` を利用し、必要に応じてサブクラスを追加する

## フォーム実装方針

- Submitボタンは原則クリック可能とし、クリック時にバリデーションを実行する
- 二重送信防止のため、送信中のみ無効化を許可する
- バリデーションエラーは、ユーザーが次に取るべき行動が分かる文言で表示する
- Select系は未選択状態を明示する初期値を持たせる
- 単一行テキスト入力は、onBlur時にtrimして不正な空白混入を防ぐ

## 命名・構成方針

- 関数・変数: lowerCamelCase
- コンポーネント・型: PascalCase
- 定数: SCREAMING_SNAKE_CASE
- トップレベルの固定配列・固定マップ・表示定義など、再代入しない値は `ICON_GALLERY_ITEMS` のように SCREAMING_SNAKE_CASE で定義する
- ts/jsファイル名: lowerCamelCase（例: `headerConfig.ts`, `eventsPageConfig.ts`）
- css/scss/png/jpg/svgファイル名: kebab-case
- Svelte コンポーネントファイル名: UpperCamelCase（例: `IconGallery.svelte`）
- SvelteKit のルーティング専用ファイル（`+page.svelte` / `+layout.svelte` / `+error.svelte`）はフレームワーク仕様を優先して例外とする
- 公開境界はindex.tsで明示し、内部実装を外部に漏らさない
- 関数定義は原則 `const foo = () => {}` を採用し、function 宣言はホイスティングや `this` 制御が必要な場合に限定する
- 条件分岐は早期 return を優先し、不要な if / else のネストを増やさない
- 状態変化に伴う見た目は aria 属性・data 属性・要素セレクタで表現し、クラスの付け外しは最終手段とする
- CSS が長い場合は `#region` 相当のコメントやセクションコメントで折りたたみやすく保つ
- Svelte は UI 表示に集中させ、型は model、定数は config、状態管理は store、関数は lib への分離を検討する
- 状態を持たない参照専用の定数・補助処理は `<script lang="ts" module>` への切り出しを検討する
- コンポーネントのディレクトリ構成は `config / lib / ui / store` の 4 責務に従う（必要な責務のみ作成する）
  - `config`: 定数・設定値（ラベルマップ・選択肢・パスなど）
  - `lib`: 純粋関数・ユーティリティ（フォーマッタ・バリデータなど）
  - `ui`: Svelte コンポーネント
  - `store`: Svelte ストア・リアクティブ状態

## 設計原則

- DRY: 本質的に同一な処理のみ共通化する
- YAGNI: 現時点で必要な機能のみ実装する
- SRP: 関心を分離し、責務を最小単位で保つ
- KISS: 複雑さを増やす設計を避ける
- 変更容易性: 将来の仕様変更で影響範囲が局所化される構造にする
- 値の欠損表現は原則 `undefined` を使用し、外部 API / DB / 仕様上 `null` が必須な場合のみ `null` を許可する

## 品質チェック

実装時は以下を必ず確認する。

- この実装は1つの明確な責務を持つか
- より単純に書ける余地がないか
- テストしやすい境界になっているか
- 依存方向が不適切になっていないか
- 3ヶ月後に読んでも意図を理解できるか

## テスト実装補足

- テストは原則 `正常系` / `異常系` / `準正常系` で describe を整理する
- 読み解きに時間がかかるテストファイルでは `#region` コメントで表示テスト・操作テストなどの責務を区切る
- 各テストケース内は `#region Given` / `#region When` / `#region Then` でグルーピングする
- `it` の説明文は必ず `〇〇の場合、〇〇になること` 形式で記述する
- バリエーションの確認は同型の test を並べず、`it.each` を優先する

## フォーム実装補足

- form 値の更新は bind に依存せず、イベント伝播または明示的なコールバックで制御する
- 値の確定タイミングは原則 onBlur を優先し、必要時のみ onChange / onInput を補助的に使う
- id / name / value / type / label / placeholder などのフォーム基本属性は省略可能にしない

## ドキュメント補足

- 外部公開する関数・型・クラス・公開 API には tsDoc を必ず付与する
- tsDoc では引数がある場合 `@param`、戻り値がある場合 `@returns` を必須とする
- 業務要件・制約・外部連携事情など設計判断に影響する背景がある場合は、可能な限り `@remarks` を付与する
