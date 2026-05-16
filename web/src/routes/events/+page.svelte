<script lang="ts">
  import type { PageData } from './$types'
  import EventsPage from '../../pages/events/ui/EventsPage.svelte'

  let { data }: { data: PageData } = $props()
</script>

<EventsPage {...data} />
