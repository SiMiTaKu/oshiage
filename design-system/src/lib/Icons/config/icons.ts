import ActivityIcon from '../components/ActivityIcon.svelte'
import AlertCircleIcon from '../components/AlertCircleIcon.svelte'
import AlertTriangleIcon from '../components/AlertTriangleIcon.svelte'
import BellIcon from '../components/BellIcon.svelte'
import CalendarIcon from '../components/CalendarIcon.svelte'
import CheckCircleIcon from '../components/CheckCircleIcon.svelte'
import CheckIcon from '../components/CheckIcon.svelte'
import ChevronDownIcon from '../components/ChevronDownIcon.svelte'
import ChevronLeftIcon from '../components/ChevronLeftIcon.svelte'
import ChevronRightIcon from '../components/ChevronRightIcon.svelte'
import ChevronUpIcon from '../components/ChevronUpIcon.svelte'
import ClockIcon from '../components/ClockIcon.svelte'
import EditIcon from '../components/EditIcon.svelte'
import ExternalLinkIcon from '../components/ExternalLinkIcon.svelte'
import EyeIcon from '../components/EyeIcon.svelte'
import FilterIcon from '../components/FilterIcon.svelte'
import HistoryIcon from '../components/HistoryIcon.svelte'
import LinkIcon from '../components/LinkIcon.svelte'
import ListIcon from '../components/ListIcon.svelte'
import MapPinIcon from '../components/MapPinIcon.svelte'
import MenuIcon from '../components/MenuIcon.svelte'
import MessageIcon from '../components/MessageIcon.svelte'
import PhoneIcon from '../components/PhoneIcon.svelte'
import PlusIcon from '../components/PlusIcon.svelte'
import SearchIcon from '../components/SearchIcon.svelte'
import ShareIcon from '../components/ShareIcon.svelte'
import ShieldIcon from '../components/ShieldIcon.svelte'
import TrashIcon from '../components/TrashIcon.svelte'
import TrendingUpIcon from '../components/TrendingUpIcon.svelte'
import UserIcon from '../components/UserIcon.svelte'
import UsersIcon from '../components/UsersIcon.svelte'
import XIcon from '../components/XIcon.svelte'

/**
 * アプリケーション全体で利用可能なアイコン群。
 * Buttonコンポーネントなどで、キー名（例: 'activity'）を指定して利用します。
 */
export const ICONS = {
  activity: ActivityIcon,
  alertCircle: AlertCircleIcon,
  alertTriangle: AlertTriangleIcon,
  bell: BellIcon,
  calendar: CalendarIcon,
  check: CheckIcon,
  checkCircle: CheckCircleIcon,
  chevronDown: ChevronDownIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  chevronUp: ChevronUpIcon,
  clock: ClockIcon,
  edit: EditIcon,
  externalLink: ExternalLinkIcon,
  eye: EyeIcon,
  filter: FilterIcon,
  history: HistoryIcon,
  link: LinkIcon,
  list: ListIcon,
  mapPin: MapPinIcon,
  menu: MenuIcon,
  message: MessageIcon,
  phone: PhoneIcon,
  plus: PlusIcon,
  search: SearchIcon,
  share: ShareIcon,
  shield: ShieldIcon,
  trash: TrashIcon,
  trendingUp: TrendingUpIcon,
  user: UserIcon,
  users: UsersIcon,
  x: XIcon,
} as const

/** アイコンのキー名型 */
export type IconName = keyof typeof ICONS
