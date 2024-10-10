<template>
  <CDropdown theme="naked" v-model:active="newPoint" @update:active="onActivation" :style="style" class="c-damage-point">
    <template #toggle>
      <CDamageType v-if="point.type !== null" display="icon" :type="point.type"/>
      <CIcon v-else name="plus-circle"/>
    </template>

    <template #default>
      <template v-if="point.type !== null">
        <CFlex class="u-mb-2">
          <CDamageType display="full" :type="point.type"/>
        </CFlex>

        <CButton theme="normal-danger" @click="remove">
          <CIcon name="delete-trash"/>
          {{ $t('general.remove') }}
        </CButton>
      </template>

      <template v-else>
        <CButton v-for="option in enumValues(ChecklistDamagePointType)" @click="selectType(option)">
          <CDamageType display="full" :type="option"/>
        </CButton>
      </template>
    </template>
  </CDropdown>
</template>

<script setup lang="ts">
  import { pull } from 'lodash';
  import { computed, ref } from 'vue';
  import CFlex from '@/shared/components/CFlex.vue';
  import CIcon from '@/shared/components/CIcon.vue';
  import CButton from '@/shared/components/buttons/CButton.vue';
  import CDropdown from '@/shared/components/dropdown/CDropdown.vue';
  import { enumValues } from '@/shared/utils/typescript';
  import ChecklistDamagePointType from '../constants/ChecklistDamagePointType';
  import ChecklistDamagePoint from '../models/ChecklistDamagePoint';
  import ChecklistItemContext from '../models/ChecklistItemContext';
  import ChecklistService from '../services/ChecklistService';
  import CDamageType from './CDamageType.vue';

  const props = defineProps<{
    context: ChecklistItemContext;
    point: ChecklistDamagePoint;
  }>();

  const newPoint = ref(props.point.type === null);

  const style = computed(() => {
    return {
      left: `${props.point.x * 100}%`,
      top: `${props.point.y * 100}%`,
    };
  });

  async function remove() {
    await ChecklistService.removeDamagePoint(props.point, props.context);
  }

  async function selectType(type: ChecklistDamagePointType) {
    props.point.type = type;
    await ChecklistService.addDamagePoint(props.point, props.context);
  }

  function onActivation(active) {
    if (!active && props.point.type === null) pull(props.context.item.damagePoints, props.point);
  }
</script>

<style lang="scss">
  .c-damage-point {
    $iconSize: 32px;
    $offset: $iconSize*-.5;

    position: absolute;
    margin-left: $offset;
    margin-top: $offset;

    .c-icon {
      width: $iconSize !important; // overrule icon style
      height: $iconSize !important;
    }

    .c-dropdown-toggle {
      padding: 0;
    }
  }
</style>