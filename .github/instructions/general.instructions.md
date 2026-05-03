---
description: プロジェクト全体のルール探索と適用順序を定義するメタルール
applyTo: '**/*'
name: プロジェクトルール管理システム
---

# General Rules - プロジェクトルール管理システム

## 目的

このファイルは、実装時に参照すべきルールと資料への導線を定義します。

## 常時参照ルール

すべての実装で以下を必ず参照してください。

- [project-documents.instructions.md](./project-documents.instructions.md)

## タスク別参照ルール

- バックエンドを実装する場合: [backend-architecture-design.instructions.md](./backend-architecture-design.instructions.md)
- バックエンドの単体テストを実装する場合: [backend-unit-test.instructions.md](./backend-unit-test.instructions.md)
- バックエンドの結合テストを実装する場合: [backend-integration-test.instructions.md](./backend-integration-test.instructions.md)
- フロントエンドのUI実装をする場合: [frontend-foundation.instructions.md](./frontend-foundation.instructions.md)
- フロントエンドを実装する場合: [frontend-architecture-design.instructions.md](./frontend-architecture-design.instructions.md)
- 単体テストを実装する場合: [frontend-unit-test.instructions.md](./frontend-unit-test.instructions.md)
- 結合テストを実装する場合: [frontend-integration-test.instructions.md](./frontend-integration-test.instructions.md)
- E2Eテストを実装する場合: [frontend-e2e-test.instructions.md](./frontend-e2e-test.instructions.md)

## 作業前チェック

- 対象機能に必要な仕様資料を特定したか
- 資料内で最新仕様を確認したか
- 不明点・矛盾点を洗い出したか
- 推測実装ではなく確認フローを取れる状態か

## 判断ルール

- 仕様が明示されている場合は仕様を優先する
- 実装都合で仕様を変更しない
- 資料不足や矛盾がある場合は、確認依頼を先に行う
- 新規ドキュメント追加時はproject-documents.instructions.mdに追記し、参照元を一元化する
- 新しい実装ルールを追加した場合は、general.instructions.mdの参照導線を更新する
- プロダクト全体で外部公開する関数・型・クラス・公開 API には tsDoc を必ず付与する
- tsDoc では引数がある場合 `@param`、戻り値がある場合 `@returns` を必須とする
- 業務要件・制約・外部連携事情など設計判断に影響する背景がある場合は、可能な限り `@remarks` を付与する
- 数値文字列の変換ではグローバル `parseInt` ではなく `Number.parseInt` を使用する
- ファイル肥大化時は config / model / store / lib への責務分離を優先し、UI ファイルへロジックを溜め込まない
