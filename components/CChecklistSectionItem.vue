<template>
  <CCollapsibleCard ref="collapsibleCard" v-model:open="section.isExpanded" class="u-mb-4">
    <template #toggle>
      <CShelf>
        <template #left>
          <h2 class="u-title u-semibold">{{ section.description }}</h2>

          <CIcon name="check-double" :size="16"/>
          <p>{{ $t('checklist.performedChecks', { countAnswered: itemStatusChecked, countTotal: section.items.length }) }}</p>

          <CButton v-if="itemStatusChecked < section.items.length && hasScoreItems" theme="ghost-primary" @click.stop="updateStatus">
            <CIcon name="check-double" :size="16"/>
            {{ $t('checklist.checkAll') }}
          </CButton>
        </template>

        <template #right>
          <CChecklistSectionCounters :items="sortedItems"/>
        </template>
      </CShelf>
    </template>

    <template #content>
      <CChecklistItem v-for="item in sortedItems" :key="item.id" :checklist :item :dossier/>
    </template>
  </CCollapsibleCard>
</template>

<script setup lang="ts">
  import { orderBy } from 'lodash';
  import { computed } from 'vue';
  import CChecklistSectionCounters from '@/dossier/components/detail/CChecklistSectionCounters.vue';
  import Dossier from '@/dossier/models/Dossier';
  import CCollapsibleCard from '@/shared/components/CCollapsibleCard.vue';
  import CIcon from '@/shared/components/CIcon.vue';
  import CShelf from '@/shared/components/CShelf.vue';
  import CButton from '@/shared/components/buttons/CButton.vue';
  import ChecklistItemStatus from '../constants/ChecklistItemStatus';
  import { SCORE_TYPES } from '../constants/ChecklistItemType';
  import Checklist from '../models/Checklist';
  import ChecklistSection from '../models/ChecklistSection';
  import ChecklistService from '../services/ChecklistService';
  import CChecklistItem from './CChecklistItem.vue';

  const props = defineProps<{
    checklist: Checklist;
    section: ChecklistSection;
    dossier: Dossier;
  }>();

  const itemStatusChecked = computed(() => {
    return props.section.items.filter(i => i.status > ChecklistItemStatus.EMPTY).length;
  });

  const hasScoreItems = computed(() => {
    const itemTypes = props.section.items.map(i => i.type);
    return itemTypes.some(elem => SCORE_TYPES.includes(elem));
  });

  const sortedItems = computed(() => {
    return orderBy(props.section.items, ['position'], 'asc');
  });

  async function updateStatus() {
    await ChecklistService.checkAllSectionItems(props.checklist, props.section, props.dossier);
  }
</script>
