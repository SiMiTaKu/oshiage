import { ROUTES } from '../../../shared/routes'

/**
 * フッターリンクグループ定義。
 */
export const FOOTER_LINKS: Record<string, { name: string; href: string }[]> = {
  サービス: [
    { name: 'イベント一覧', href: ROUTES.events.index },
    { name: '選手・チーム一覧', href: ROUTES.entities.index },
    { name: 'お知らせ', href: ROUTES.notices.index },
  ],
  サポート: [
    { name: 'よくある質問', href: ROUTES.faq },
    { name: 'お問い合わせ', href: ROUTES.contact },
  ],
  法的情報: [
    { name: '利用規約', href: ROUTES.terms },
    { name: 'プライバシーポリシー', href: ROUTES.privacy },
  ],
} as const
