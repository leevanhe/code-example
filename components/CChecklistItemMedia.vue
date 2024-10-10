<template>
  <div class="c-checklist-item-media">
    <CTag v-if="item.imageCount > 0" theme="outline">
      <CIcon name="image" :size="16"/>
      {{ item.imageCount }}
    </CTag>

    <CTag v-if="item.videoCount > 0" theme="outline">
      <CIcon name="camera-video" :size="16"/>
      {{ item.videoCount }}
    </CTag>

    <CTag v-if="item.attachmentCount > 0" theme="outline">
      <CIcon name="attachment-paperclip" :size="16"/>
      {{ item.attachmentCount }}
    </CTag>

    <CTag v-if="item.diagnosticCount > 0" theme="outline">
      <CIcon name="search-eye" :size="16"/>
      {{ item.diagnosticCount }}
    </CTag>

    <CDossierTag v-for="tag in item.tags" :key="tag.id" :tag="tag"/>
  </div>
</template>

<script setup lang="ts">
  import CDossierTag from '@/dossier/components/CDossierTag.vue';
  import CIcon from '@/shared/components/CIcon.vue';
  import CTag from '@/shared/components/CTag.vue';
  import ChecklistItem from '../models/ChecklistItem';

  defineProps<{
    item: ChecklistItem;
  }>();
</script>

<style lang="scss">
  .c-checklist-item-media {
    display: inline-flex;
    margin-top: .5rem;

    .c-tag {
      margin-right: .5rem;
    }
  }
</style>