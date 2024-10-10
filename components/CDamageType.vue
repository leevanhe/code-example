<template>
  <CIcon :name="`car-${key}`"/>
  <template v-if="display==='full'">{{ $t(`damagePointType.${key}`) }}</template>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import CIcon from '@/shared/components/CIcon.vue';
  import ChecklistDamagePointType from '../constants/ChecklistDamagePointType';

  const props = defineProps<{
    type: ChecklistDamagePointType;
    display: 'icon' | 'full';
  }>();

  const key = computed(() => {
    switch (props.type) {
      case ChecklistDamagePointType.DENT:
        return 'dent';
      case ChecklistDamagePointType.SCRATCH:
        return 'scratch';
      case ChecklistDamagePointType.RUST:
        return 'rust';
      case ChecklistDamagePointType.CRACK:
        return 'crack';
      default:
        return 'other';
    }
  });
</script>
