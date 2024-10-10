<template>
  <CInlinePage v-if="checklist">
    <template #leftHeader>
      <CButton :link="{ name: 'dossier-detail', query: route.query }" theme="ghost-secondary">
        <CIcon name="close"/>
      </CButton>

      <CSeparator/>

      <CProgressCircle :current="checklist.counters.answered" :max="checklist.counters.total"/>

      <div>
        <h2 class="u-title u-semibold">{{ checklist.description }}</h2>
        <p>{{ $t('checklist.performedChecks', { countAnswered: checklist.counters.answered, countTotal: checklist.counters.total }) }}</p>
      </div>
    </template>

    <template #rightHeader>
      <CIcon :name="checklist.visibleToCustomer ? 'eye' : 'eye-off'" class="u-mr-2"/>
      <CChecklistOverviewDropdown :checklist :dossier/>
    </template>

    <template #body>
      <CChecklistSectionsOverview :checklist :dossier/>
    </template>
  </CInlinePage>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import DossierService from '@/dossier/services/DossierService';
  import CIcon from '@/shared/components/CIcon.vue';
  import CInlinePage from '@/shared/components/CInlinePage.vue';
  import CProgressCircle from '@/shared/components/CProgressCircle.vue';
  import CSeparator from '@/shared/components/CSeparator.vue';
  import CButton from '@/shared/components/buttons/CButton.vue';
  import { parseNumericId } from '@/shared/converters/commonConverters';
  import { present } from '@/shared/utils/typescript';
  import CChecklistOverviewDropdown from '../components/CChecklistOverviewDropdown.vue';
  import CChecklistSectionsOverview from '../components/CChecklistSectionsOverview.vue';
  import ChecklistService from '../services/ChecklistService';

  const route = useRoute();

  const checklist = computed(() => ChecklistService.getById(present(parseNumericId(route.params.checklistId))));
  const dossier = computed(() => DossierService.getCurrent());
</script>