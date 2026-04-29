<script lang="ts">
  import ActivityIcon from './activity-icon.svelte'
  import AlertCircleIcon from './alert-circle-icon.svelte'
  import AlertTriangleIcon from './alert-triangle-icon.svelte'
  import BellIcon from './bell-icon.svelte'
  import CalendarIcon from './calendar-icon.svelte'
  import CheckCircleIcon from './check-circle-icon.svelte'
  import CheckIcon from './check-icon.svelte'
  import ChevronDownIcon from './chevron-down-icon.svelte'
  import ChevronLeftIcon from './chevron-left-icon.svelte'
  import ChevronRightIcon from './chevron-right-icon.svelte'
  import ChevronUpIcon from './chevron-up-icon.svelte'
  import ClockIcon from './clock-icon.svelte'
  import EditIcon from './edit-icon.svelte'
  import ExternalLinkIcon from './external-link-icon.svelte'
  import EyeIcon from './eye-icon.svelte'
  import FilterIcon from './filter-icon.svelte'
  import HistoryIcon from './history-icon.svelte'
  import LinkIcon from './link-icon.svelte'
  import ListIcon from './list-icon.svelte'
  import MapPinIcon from './map-pin-icon.svelte'
  import MenuIcon from './menu-icon.svelte'
  import MessageIcon from './message-icon.svelte'
  import PhoneIcon from './phone-icon.svelte'
  import PlusIcon from './plus-icon.svelte'
  import SearchIcon from './search-icon.svelte'
  import ShareIcon from './share-icon.svelte'
  import ShieldIcon from './shield-icon.svelte'
  import TrashIcon from './trash-icon.svelte'
  import TrendingUpIcon from './trending-up-icon.svelte'
  import UserIcon from './user-icon.svelte'
  import UsersIcon from './users-icon.svelte'
  import XIcon from './x-icon.svelte'

  interface IconsGalleryProps {
    size?: number
    color?: string
    strokeWidth?: number
  }

  let { size = 24, color = 'currentColor', strokeWidth = 2 }: IconsGalleryProps = $props()

  const icons = [
    { name: 'Activity', component: ActivityIcon },
    { name: 'AlertCircle', component: AlertCircleIcon },
    { name: 'AlertTriangle', component: AlertTriangleIcon },
    { name: 'Bell', component: BellIcon },
    { name: 'Calendar', component: CalendarIcon },
    { name: 'Check', component: CheckIcon },
    { name: 'CheckCircle', component: CheckCircleIcon },
    { name: 'ChevronDown', component: ChevronDownIcon },
    { name: 'ChevronLeft', component: ChevronLeftIcon },
    { name: 'ChevronRight', component: ChevronRightIcon },
    { name: 'ChevronUp', component: ChevronUpIcon },
    { name: 'Clock', component: ClockIcon },
    { name: 'Edit', component: EditIcon },
    { name: 'ExternalLink', component: ExternalLinkIcon },
    { name: 'Eye', component: EyeIcon },
    { name: 'Filter', component: FilterIcon },
    { name: 'History', component: HistoryIcon },
    { name: 'Link', component: LinkIcon },
    { name: 'List', component: ListIcon },
    { name: 'MapPin', component: MapPinIcon },
    { name: 'Menu', component: MenuIcon },
    { name: 'Message', component: MessageIcon },
    { name: 'Phone', component: PhoneIcon },
    { name: 'Plus', component: PlusIcon },
    { name: 'Search', component: SearchIcon },
    { name: 'Share', component: ShareIcon },
    { name: 'Shield', component: ShieldIcon },
    { name: 'Trash', component: TrashIcon },
    { name: 'TrendingUp', component: TrendingUpIcon },
    { name: 'User', component: UserIcon },
    { name: 'Users', component: UsersIcon },
    { name: 'X', component: XIcon },
  ]
</script>

<div class="icons-grid">
  {#each icons as icon (icon.name)}
    {@const Icon = icon.component}
    <div class="icon-card">
      <Icon {size} {color} {strokeWidth} />
      <span>{icon.name}</span>
    </div>
  {/each}
</div>

<style>
  .icons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
    width: min(900px, 90vw);
  }

  .icon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    min-height: 88px;
  }

  .icon-card span {
    font-size: 0.75rem;
    color: #374151;
    text-align: center;
    line-height: 1.2;
  }
</style>
