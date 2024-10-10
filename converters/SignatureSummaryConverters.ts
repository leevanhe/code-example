import Role from '@/general/models/Role';
import { parseEntities, parseEntity } from '@/shared/converters/commonConverters';
import { parseMoment } from '@/shared/converters/dateConverters';
import User from '@/shared/models/User';
import SignatureSummary from '../models/SignatureSummary';

const SIGNATURE_SUMMARY_SCHEMA = {
  signedOn: (data: any) => parseMoment(data.signedOn),
  signedBy: (data: any) => User.withFullName(data.signedBy),
  role: (data: any) => Role.withIdAndDescription(data.roleId,  data.role),
};

export function parseSignatureSummary(data: any): SignatureSummary | null {
  return parseEntity(data, SIGNATURE_SUMMARY_SCHEMA, SignatureSummary);
}

export function parseSignatureSummaries(data: any): Array<SignatureSummary> {
  return parseEntities(data, parseSignatureSummary);
}