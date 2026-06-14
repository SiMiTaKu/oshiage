<script lang="ts">
  import type { PageData } from './$types'
  import NoticesPage from '@pages/notices/ui/NoticesPage.svelte'

  let { data }: { data: PageData } = $props()
</script>

<NoticesPage {...data} />
