<template>
  <CSectionButton @click="showDetails" class="c-checklist-item">
    <CSectionItem>
      <CItem :icon>
        <template #body>
          <CChecklistItemBody v-if="SCORE_TYPES.includes(item.type)" :item/>

          <CNumericChecklistItem v-if="NUMERIC_TYPES.includes(item.type)" :context/>

          <CDateChecklistItem v-if="item.type === ChecklistItemType.DATE" :context/>

          <CDamagePointsChecklistItem v-if="item.type === ChecklistItemType.EXTERIOR" :context/>
        </template>

        <template #right>
          <CScoreChecklistItem v-if="SCORE_TYPES.includes(item.type)" :context/>
        </template>
      </CItem>
    </CSectionItem>
  </CSectionButton>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import Dossier from '@/dossier/models/Dossier';
  import Modal from '@/general/utils/Modal';
  import JobClient from '@/jobs/client/JobClient';
  import JobService from '@/jobs/services/JobService';
  import CItem from '@/shared/components/CItem.vue';
  import CSectionButton from '@/shared/components/section/CSectionButton.vue';
  import CSectionItem from '@/shared/components/section/CSectionItem.vue';
  import { isAnyOf } from '@/shared/utils/typescript';
  import ChecklistItemStatus from '../constants/ChecklistItemStatus';
  import ChecklistItemType, { NUMERIC_TYPES, SCORE_TYPES } from '../constants/ChecklistItemType';
  import ChecklistItemModal from '../modals/ChecklistItemModal.vue';
  import Checklist from '../models/Checklist';
  import ChecklistItem from '../models/ChecklistItem';
  import ChecklistItemContext from '../models/ChecklistItemContext';
  import CChecklistItemBody from './CChecklistItemBody.vue';
  import CDamagePointsChecklistItem from './CDamagePointsChecklistItem.vue';
  import CDateChecklistItem from './CDateChecklistItem.vue';
  import CNumericChecklistItem from './CNumericChecklistItem.vue';
  import CScoreChecklistItem from './CScoreChecklistItem.vue';

  const props = defineProps<{
    checklist: Checklist;
    item: ChecklistItem;
    dossier: Dossier;
  }>();

  const icon = computed(() => props.item.status > ChecklistItemStatus.EMPTY ? 'check-circle' : 'empty');

  const context = computed(() => new ChecklistItemContext(props.checklist, props.item, props.dossier));

  async function showDetails() {
    // Not getting job from context because it's not always there
    const job = reactive(await JobClient.getJobById(props.dossier.id, props.item.id));
    await JobService.loadDiagnosis(props.dossier, job);
    const canAddMedia = isAnyOf(props.item.status, ChecklistItemStatus.GOOD, ChecklistItemStatus.CAUTION, ChecklistItemStatus.BAD);
    await Modal.open({ component: ChecklistItemModal }, { job, canAddMedia });
  }
</script>

<style lang="scss">
  .c-checklist-item {
    .c-item-icon {
      color: $info;
    }
  }
</style>