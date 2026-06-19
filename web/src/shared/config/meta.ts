/**
 * ページごとのメタ情報（title, description等）の定義。
 */
export interface MetaDataValue {
  title: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
}

export const META_DATA = {
  home: {
    title: '推しアゲ | マイナースポーツ情報プラットフォーム',
    description:
      '散らばった競技情報を、ひとつに。あなたの応援を、選手に届く力へ。推しアゲは、情報難民ファンのための競技情報インフラです。',
    ogTitle: '推しアゲ | マイナースポーツ情報プラットフォーム',
    ogDescription: '散らばった競技情報を、ひとつに。あなたの応援を、選手に届く力へ。',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  events: {
    title: 'イベント一覧 | 推しアゲ',
    description: '男子新体操の大会・発表会・練習会など、各種イベント情報を一覧で確認できます。',
  },
  /**
   *
   */
  eventDetail: (eventTitle: string): MetaDataValue => ({
    title: `${eventTitle} | イベント | 推しアゲ`,
    description: `${eventTitle}の開催概要、日時、場所などの詳細情報を掲載しています。`,
  }),
  entities: {
    title: '選手・チーム一覧 | 推しアゲ',
    description: '男子新体操の選手・チーム（クラブ・大学・高校など）の情報を一覧で確認できます。',
  },
  /**
   *
   */
  entityDetail: (entityName: string): MetaDataValue => ({
    title: `${entityName} | 選手・チーム | 推しアゲ`,
    description: `${entityName}の基本情報、所属、イベント出演履歴などを掲載しています。`,
  }),
  notices: {
    title: 'お知らせ一覧 | 推しアゲ',
    description:
      '推しアゲの最新ニュース、機能アップデート、イベント開催情報などを一覧で確認できます。',
  },
  /**
   *
   */
  noticeDetail: (noticeTitle: string): MetaDataValue => ({
    title: `${noticeTitle} | お知らせ | 推しアゲ`,
    description: `${noticeTitle}の詳細情報を掲載しています。`,
  }),
  faq: {
    title: 'よくある質問 | 推しアゲ',
    description: '推しアゲの利用方法やよくある質問について回答を掲載しています。',
  },
  privacy: {
    title: 'プライバシーポリシー | 推しアゲ',
    description: '個人情報の取り扱いに関する方針を定めたプライバシーポリシーを掲載しています。',
  },
  terms: {
    title: '利用規約 | 推しアゲ',
    description: '推しアゲの利用規約を掲載しています。',
  },
  /**
   *
   */
  error: (errorTitle: string): MetaDataValue => ({
    title: `${errorTitle} | 推しアゲ`,
  }),
} as const
