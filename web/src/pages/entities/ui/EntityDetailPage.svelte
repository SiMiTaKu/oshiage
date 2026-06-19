<script lang="ts">
  import type { EntityResponseDto, EntityRevisionDto } from '@shared/api/generated/client'
  import { META_DATA } from '@shared/config/meta'
  import { EntityDetailHeader, EntityDetailContent } from '@widgets/entities'

  const {
    entity,
    revisions,
  }: {
    entity: EntityResponseDto
    revisions: EntityRevisionDto[]
  } = $props()

  const meta = $derived(META_DATA.entityDetail(entity.currentRevision.name))
</script>

<svelte:head>
  <title>{meta.title}</title>
  {#if meta.description}
    <meta name="description" content={meta.description} />
  {/if}
</svelte:head>

<div class="entity-detail-page">
  <EntityDetailHeader {entity} />
  <div class="page-content">
    <EntityDetailContent {entity} {revisions} />
  </div>
</div>

<style lang="scss">
  @use 'index' as *;

  .entity-detail-page {
    min-height: 100%;
  }

  .page-content {
    max-width: $container-max;
    place-self: center;
    padding: 32px 16px;
  }
</style>
