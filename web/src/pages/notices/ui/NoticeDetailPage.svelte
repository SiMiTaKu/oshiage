<script lang="ts">
  import type { NoticeResponseDto } from '@shared/api/generated/client'
  import { META_DATA } from '@shared/config/meta'
  import { NoticeDetailContent } from '@widgets/notices'

  const { notice }: { notice: NoticeResponseDto } = $props()
  const meta = $derived(META_DATA.noticeDetail(notice.title))
</script>

<svelte:head>
  <title>{meta.title}</title>
  {#if meta.description}
    <meta name="description" content={meta.description} />
  {/if}
</svelte:head>

<div class="notice-detail-page">
  <NoticeDetailContent {notice} />
</div>

<style lang="scss">
  @use 'index' as *;

  .notice-detail-page {
    min-height: 100%;
  }
</style>
