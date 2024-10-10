import ChecklistItem from './ChecklistItem';
import { ChecklistSectionId } from './ids';

export default class ChecklistSection {
  id!: ChecklistSectionId;
  position = 0;
  description = '';
  isExpanded = false;
  items: Array<ChecklistItem> = [];
}
