<template>
  <CModal @close="close">
    <template #header>
      <CJob :job display="statuses" class="u-mr-2">
        <template #right>
          <CJobExecutionStatusButton :job :context/>
        </template>
      </CJob>
    </template>

    <template #toolbar>
      <CFlex justify="between">
        <CJobTags :job/>
        <CJobMenu :context :job inChecklist/>
      </CFlex>
    </template>

    <template #body>
      <CDiagnosticSection :context class="u-mb-4"/>
      <CMediaSection :context="mediaContext"/>
    </template>

    <template #footer>
      <CButton @click="close" class="c-modal-cancel">{{ $t('general.close') }}</CButton>
    </template>
  </CModal>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import CModal from '@/general/components/CModal.vue';
  import { JobMediaContext } from '@/general/models/MediaContext';
  import CJob from '@/jobs/components/CJob.vue';
  import CJobExecutionStatusButton from '@/jobs/components/CJobExecutionStatusButton.vue';
  import CJobTags from '@/jobs/components/CJobTags.vue';
  import CDiagnosticSection from '@/jobs/components/diagnosis/CDiagnosticSection.vue';
  import CJobMenu from '@/jobs/components/diagnosis/CJobMenu.vue';
  import Job from '@/jobs/models/Job';
  import JobService from '@/jobs/services/JobService';
  import CMediaSection from '@/media/components/CMediaSection.vue';
  import CFlex from '@/shared/components/CFlex.vue';
  import CButton from '@/shared/components/buttons/CButton.vue';

  const emit = defineEmits<{ (e: 'close'): void }>();

  const props = defineProps<{
    job: Job;
    canAddMedia: boolean;
  }>();

  const context = computed(() => {
    const ctx = JobService.getContext();
    ctx.selectedJob = props.job;
    return ctx;
  });

  const mediaContext = computed(() => new JobMediaContext(props.job, context.value.dossier.id, undefined, props.canAddMedia));

  function close() {
    emit('close');
  }
</script>