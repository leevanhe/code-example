<template>
  <CModal :title="$t('signatureModal.title')" @close="close" class="signature-modal">
    <template #body>
      <h2 class="u-title">{{ signature.role.description}}</h2>

      <p class="u-my-2">{{ $t('signatureModal.approval', {role: signature.role.description}) }}</p>

      <CShelf>
        <CAvatar :person="signature.signedBy || currentUser"/>
        <CValue vertical :label="signature.signedBy?.fullName || currentUser.fullName" :value="formatDateTime(currentTime)"/>
        <CIcon v-if="signature.signedBy" name="signature" :size="48"/>
      </CShelf>

      <CShelf v-if="!currentUser.hasSignature" class="signature-modal-warning">
        <CIcon name="warning-circle-outline"/>
        {{ $t('signatureModal.withoutSignature') }}
      </CShelf>
    </template>

    <template #footer>
      <CButton @click="close" class="c-modal-cancel">{{ $t('general.cancel') }}</CButton>
      <CButton v-if="canSign" @click="sign" :theme>
        <CIcon :name="icon"/>
        {{ label }}
      </CButton>
    </template>
  </CModal>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import CModal from '@/general/components/CModal.vue';
  import AuthService from '@/general/services/AuthService';
  import TimeService from '@/general/services/TimeService';
  import CAvatar from '@/shared/components/CAvatar.vue';
  import CIcon from '@/shared/components/CIcon.vue';
  import CShelf from '@/shared/components/CShelf.vue';
  import CValue from '@/shared/components/CValue.vue';
  import CButton from '@/shared/components/buttons/CButton.vue';
  import { formatDateTime } from '@/shared/utils/dateTime';
  import { present } from '@/shared/utils/typescript';
  import Checklist from '../models/Checklist';
  import SignatureSummary from '../models/SignatureSummary';
  import ChecklistService from '../services/ChecklistService';

  const i18n = useI18n();

  const currentUser = computed(() => AuthService.getCurrentUser());
  const currentTime = computed(() => TimeService.now);

  const emit = defineEmits(['close']);

  const props = defineProps<{
    checklist: Checklist,
    signature: SignatureSummary,
  }>();

  const canSign = computed(() => currentUser.value.roleIds.includes(present(props.signature?.role.id)) && currentUser.value.hasSignature);

  const hasRoleAndSignature = computed(() => currentUser.value.roleIds.includes(present(props.signature?.role.id)) && currentUser.value.hasSignature);

  const theme = computed(() => hasRoleAndSignature.value && !props.signature?.signedOn ? 'main-success' : 'main-danger');

  const icon = computed(() => hasRoleAndSignature.value && !props.signature?.signedOn ? 'thumbs-sign' : 'delete-trash');

  const label = computed(() => {
    return hasRoleAndSignature.value && !props.signature?.signedOn ? i18n.t('signatureModal.sign') : i18n.t('signatureModal.removeSignature');
  });

  async function sign() {
    await ChecklistService.sign(present(props.checklist), {
      role: props.signature.role,
      isSigned: !props.signature.signedOn,
    });

    close();
  }

  function close() {
    emit('close');
  }
</script>

<style lang="scss">
  .signature-modal-warning {
    margin-top: .5rem;
    color: $warning;
  }
</style>