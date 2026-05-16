<script lang="ts">
  import type { PageData } from './$types'
  import EntityDetailPage from '../../../pages/entities/ui/EntityDetailPage.svelte'

  let { data }: { data: PageData } = $props()
</script>

<EntityDetailPage {...data} />
