import AbstractJob from '@/jobs/models/AbstractJob';
import Comment from '@/shared/models/Comment';
import { ChecklistResult } from '@/shared/models/common';
import ChecklistItemStatus from '../constants/ChecklistItemStatus';
import ChecklistItemType from '../constants/ChecklistItemType';
import ChecklistDamagePoint from './ChecklistDamagePoint';
import ChecklistItemUpdateResult from './ChecklistItemUpdateResult';
import { ChecklistSectionId } from './ids';

export default class ChecklistItem extends AbstractJob {
  result: ChecklistResult = null;
  status = ChecklistItemStatus.DISABLED;
  position = 0;
  shortDescription = '';
  type!: ChecklistItemType;
  sectionId!: ChecklistSectionId;
  comments: Array<Comment> = [];
  damagePoints: Array<ChecklistDamagePoint> = [];
  isExcluded = false;

  update(updateResult: ChecklistItemUpdateResult): void {
    this.result = updateResult.result;
    this.status = updateResult.status;
  }
}
