---
description: NestJSバックエンドのFeature-basedアーキテクチャ方針。モジュール分割・依存方向・拡張戦略の実装指針
applyTo: 'backend/**/*.{ts,js}'
name: バックエンドアーキテクチャ設計指針
---

# Backend Architecture Design - バックエンドアーキテクチャ設計指針

## 目的

本ドキュメントは、バックエンドを NestJS + Feature-based で実装するための設計指針です。
短期の開発速度と長期の保守性を両立するため、初期は機能単位でシンプルに進め、必要箇所のみ段階的に厳格化します。

## アーキテクチャ選定結果

- 採用: Feature-based（NestJS Module 単位）
- 方針: 機能単位で閉じる設計をベースに、重要ロジックのみ段階的に Domain 抽出する
- 非採用（初期段階）:
  - Clean Architecture の全面導入
  - CQRS の全面導入

## 採用理由

- NestJS 標準の Module 設計と整合し、実装・理解コストが低い
- 機能追加・削除時の影響範囲をモジュール単位で限定しやすい
- MVP から事業運用へ拡張する際に、段階的な設計強化がしやすい

## 基本構成

```text
backend/
└── src/
    ├── app.module.ts
    ├── shared/
    │   ├── infrastructure/
    │   ├── errors/
    │   └── utils/
    └── features/
        ├── athlete/
        │   ├── athlete.module.ts
        │   ├── controllers/
        │   ├── services/
        │   ├── repositories/
        │   ├── domain/
        │   ├── dto/
        │   └── entities/
        └── competition/
            ├── competition.module.ts
            ├── controllers/
            ├── services/
            ├── repositories/
            ├── domain/
            ├── dto/
            └── entities/
```

## 依存ルール

- 機能は Feature Module ごとにカプセル化する
- 他 feature の内部実装を直接 import しない
- 他 feature 連携は公開 API（service interface など）経由に限定する
- 共通化が必要な処理は shared 配下へ抽出する
- 循環参照を作らない

## 実装ルール

### Controller

- HTTP 入出力とバリデーションに専念する
- ビジネス判断は service/domain に移譲する

### Service

- ユースケース単位で処理を組み立てる
- DB 操作とビジネスロジックが混在し始めたら domain へ分離する

### Repository

- 永続化と取得処理を担当する
- サービス層にクエリ詳細を漏らさない

### Domain

- 純粋なビジネスルールを配置する
- 外部 I/O へ依存しない設計を優先する

## 段階的進化ルール（Hybrid）

- 初期は Feature-based を優先し、過度な抽象化を避ける
- 次の兆候が出たら domain 抽出を行う:
  - 同一ロジックが複数 service で重複
  - 分岐が増え service が肥大化
  - 単体テストで DB モック準備が過剰になる
- 抽出対象は「DB非依存で意味を持つルール」から始める

## テスト戦略

- unit: domain や pure function のロジックを検証
- integration: module 内の controller/service/repository 連携を検証

注記:

- E2E は本プロジェクトではフロントエンド側で実施するため、バックエンド instruction では unit / integration を対象とする

## データ設計方針（スポーツ共通 + 差分）

- 基本情報は共通スキーマで管理する
- 競技差分は拡張フィールドで吸収する
- 自由入力を許容する項目でも、将来検索対象になる可能性が高い場合は構造化を優先する
- 「個性表現」中心の項目は、初期は柔軟性重視で設計し、検索要件が顕在化した段階で正規化を検討する

## 禁止事項

- 機能追加のたびに全体共通層へ安易に処理を置くこと
- 他 feature の private 実装へ直接依存すること
- 将来要件が未確定な段階で過度に抽象化すること

## 判断基準

実装判断で迷った場合は以下を優先する。

1. 変更影響範囲を最小にできるか
2. テストが単純に書けるか
3. 循環依存を生まないか
4. 将来の拡張時に既存機能を壊さず進化できるか
