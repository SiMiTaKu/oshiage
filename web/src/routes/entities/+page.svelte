<script lang="ts">
  import type { PageData } from './$types'
  import EntitiesPage from '@pages/entities/ui/EntitiesPage.svelte'

  let { data }: { data: PageData } = $props()
</script>

<EntitiesPage {...data} />
