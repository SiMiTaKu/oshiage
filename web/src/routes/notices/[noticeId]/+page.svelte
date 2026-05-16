<script lang="ts">
  import type { PageData } from './$types'
  import NoticeDetailPage from '../../../pages/notices/ui/NoticeDetailPage.svelte'

  let { data }: { data: PageData } = $props()
</script>

<NoticeDetailPage {...data} />
