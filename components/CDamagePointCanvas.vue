<template>
  <CCard class="c-damage-point-canvas" @click.stop="addPoint">
    <p class="u-title">{{ $t('checklist.damagePointsDescription') }}</p>
    <div ref="container" class="c-damage-point-canvas-container">
      <img src="../../shared/assets/images/car-overview.svg" alt="Car diagram" class="c-damage-point-canvas-diagram" @load="clampAllToContainer"/>
      <CDamagePoint v-for="point in context.item.damagePoints" :context :point="point"/>
    </div>
  </CCard>
</template>

<script setup lang="ts">
  import CCard from '@/shared/components/CCard.vue';
  import { elementRef } from '@/shared/utils/component';
  import { present } from '@/shared/utils/typescript';
  import ChecklistDamagePoint from '../models/ChecklistDamagePoint';
  import ChecklistItemContext from '../models/ChecklistItemContext';
  import CDamagePoint from './CDamagePoint.vue';

  const props = defineProps<{
    context: ChecklistItemContext;
  }>();

  const container = elementRef<HTMLElement>();

  function addPoint($event: MouseEvent) {
    const rect = present(container.value).getBoundingClientRect();
    const x = Math.max(0, Math.min(1, ($event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, ($event.clientY - rect.top) / rect.height));
    const point = new ChecklistDamagePoint(x, y);
    clampToRect(point, rect);
    props.context.item.damagePoints.push(point);
  }

  function clampAllToContainer() {
    const rect = present(container.value).getBoundingClientRect();
    props.context.item.damagePoints.forEach(p => clampToRect(p, rect));
  }

  /**
   * Ensures the given point lies fully within the given rectangle, including a margin that accounts for half the size of the point.
   * Note that points are represented in fractional space [0, 1], whereas the rectangle and margin are in screen space = pixels.
   */
  function clampToRect(point: ChecklistDamagePoint, rectangle: DOMRect, margin = 16) {
    const xMargin = margin / rectangle.width;
    const yMargin = margin / rectangle.height;
    point.x = Math.max(xMargin, Math.min(1 - xMargin, point.x));
    point.y = Math.max(yMargin, Math.min(1 - yMargin, point.y));
  }
</script>

<style lang="scss">
  .c-damage-point-canvas {
    margin-top: .75rem;
    cursor: crosshair;

    &-diagram {
      width: 100%;
    }

    &-container {
      position: relative;
    }
  }
</style>