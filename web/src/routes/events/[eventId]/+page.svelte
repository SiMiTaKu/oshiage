<script lang="ts">
  import type { PageData } from './$types'
  import EventDetailPage from '../../../pages/events/ui/EventDetailPage.svelte'

  let { data }: { data: PageData } = $props()
</script>

<EventDetailPage {...data} />
