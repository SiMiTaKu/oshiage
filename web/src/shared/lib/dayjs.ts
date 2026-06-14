import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

/**
 * Day.jsの共通初期化設定
 * @remarks
 * TZ（タイムゾーン)設定 - 日本（Asia/Tokyo）
 * 日本語ロケール設定
 */
export const initializeDayjs = () => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault('Asia/Tokyo')
  dayjs.locale('ja')
}
