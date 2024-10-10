<template>
  <CShelf class="u-pb-4">
    <template #left>
      <CButton v-for="signature in checklist.signatureSummaries"
               :theme="signature.signedOn ? 'normal-success' : 'normal-secondary'" @click="edit(signature)">
        {{ signature.role.description }}
        <CIcon :name="getIcon(signature)"/>
      </CButton>
    </template>

    <template v-if="sortedSections.length > 1" #right>
      <CButton @click="toggleAllExpanded">
        {{ $t(sectionStateLabel) }}
        <CDirectionIcon :direction="areAllExpanded ? 'up' : 'down'"/>
      </CButton>
    </template>
  </CShelf>

  <CChecklistSectionItem v-for="section in sortedSections" :key="section.id" :checklist :dossier :section/>
</template>

<script setup lang="ts">
  import { orderBy } from 'lodash';
  import { computed } from 'vue';
  import Dossier from '@/dossier/models/Dossier';
  import Modal from '@/general/utils/Modal';
  import CDirectionIcon from '@/shared/components/CDirectionIcon.vue';
  import CIcon from '@/shared/components/CIcon.vue';
  import CShelf from '@/shared/components/CShelf.vue';
  import CButton from '@/shared/components/buttons/CButton.vue';
  import SignatureModal from '../modals/SignatureModal.vue';
  import Checklist from '../models/Checklist';
  import SignatureSummary from '../models/SignatureSummary';
  import CChecklistSectionItem from './CChecklistSectionItem.vue';

  const props = defineProps<{
    checklist: Checklist;
    dossier: Dossier;
  }>();

  const sectionStateLabel = computed(() => {
    return areAllExpanded.value ? 'checklist.hideSections' : 'checklist.showSections';
  });

  const sortedSections = computed(() => {
    return orderBy(props.checklist.sections, ['position'], 'asc');
  });

  const areAllExpanded = computed(() => sortedSections.value.every(s => s.isExpanded));

  function getIcon(signature: SignatureSummary) {
    return !signature.signedOn ? 'minus-double' : 'thumbs-sign';
  }

  function toggleAllExpanded() {
    const isExpanded = !areAllExpanded.value;
    sortedSections.value.forEach(section => section.isExpanded = isExpanded);
  }

  function edit(signature: SignatureSummary) {
    Modal.open({ component: SignatureModal }, { checklist: props.checklist, signature });
  }
</script>
