<template>
  <CDropdownMenu minimal class="c-checklist-overview-dropdown">
    <CCheckButton :active="checklist.visibleToCustomer" @update:active="ChecklistService.toggleVisibleToCustomer(checklist)" @click.stop>
      {{ $t('checklist.notVisible') }}
      <CIcon :name="checklist.visibleToCustomer ? 'eye' : 'eye-off'"/>
    </CCheckButton>

    <CButton theme="normal-danger" :disabled="!!checklist.finishedOn" @click="deleteChecklist">
      <CIcon name="delete-trash"/>
      {{ $t('checklist.delete') }}
    </CButton>
  </CDropdownMenu>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import Dossier from '@/dossier/models/Dossier';
  import { goto } from '@/general/router/navigation';
  import Modals from '@/general/services/Modals';
  import CCheckButton from '@/shared/components/CCheckButton.vue';
  import CIcon from '@/shared/components/CIcon.vue';
  import CButton from '@/shared/components/buttons/CButton.vue';
  import CDropdownMenu from '@/shared/components/dropdown/CDropdownMenu.vue';
  import { present } from '@/shared/utils/typescript';
  import Checklist from '../models/Checklist';
  import ChecklistService from '../services/ChecklistService';

  const i18n = useI18n();

  const route = useRoute();
  const router = useRouter();

  const props = defineProps<{
    checklist: Checklist,
    dossier: Dossier,
  }>();

  async function deleteChecklist() {
    await Modals.confirmDelete(i18n.t('checklist.deleteConfirmation'), i18n.t('checklist.delete'));
    await ChecklistService.delete(present(props.checklist.id), props.dossier.id);
    await goto({ name: 'dossier-detail', query: route.query }, router);
  }
</script>