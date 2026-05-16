/**
 * アプリケーション全体で使用するルートパス定数
 *
 * @remarks
 * ハードコーディングを防ぎ、リンク先の変更を一元管理するために使用する。
 * 動的セグメントが必要なルートは関数形式で定義する。
 */
export const ROUTES = {
  home: '/',
  events: {
    index: '/events',
    /**
     *
     */
    detail: (id: string) => `/events/${id}`,
  },
  entities: {
    index: '/entities',
    /**
     *
     */
    detail: (id: string) => `/entities/${id}`,
  },
  notices: {
    index: '/notices',
    /**
     *
     */
    detail: (id: string) => `/notices/${id}`,
  },
  faq: '/faq',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
  },
} as const

/**
 * 各ページに表示するタイトル文字列の定数
 *
 * @remarks
 * `<title>` タグや見出し・パンくずで一貫したページ名を使用するために定義する。
 * サービス名サフィックス（"| 推しアゲ"）はレイアウト側で付与する。
 */
export const PAGE_TITLE = {
  home: '推しアゲ | マイナースポーツ情報プラットフォーム',
  events: 'イベント一覧',
  entities: '選手・チーム一覧',
  notices: 'お知らせ一覧',
  faq: 'よくある質問',
  privacy: 'プライバシーポリシー',
  terms: '利用規約',
} as const
