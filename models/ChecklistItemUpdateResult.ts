import { JobId } from '@/jobs/models/AbstractJob';
import { ChecklistResult } from '@/shared/models/common';
import ChecklistItemStatus from '../constants/ChecklistItemStatus';

export default interface ChecklistItemUpdateResult {
  itemId: JobId;
  result: ChecklistResult;
  status: ChecklistItemStatus;
}