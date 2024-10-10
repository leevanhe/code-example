import ChecklistDamagePointType from '../constants/ChecklistDamagePointType';

export interface ChecklistDamagePointId {__checklistDamagePointId: number;}

export default class ChecklistDamagePoint {
  id: ChecklistDamagePointId | null = null;
  type: ChecklistDamagePointType | null = null;

  constructor(
    public x = 0,
    public y = 0,
  ) {
  }
}
