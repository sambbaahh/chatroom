import dayjs from 'dayjs';
import { ManipulateType } from 'dayjs';

export default function getUnixTimeStamp(expiresIn: string) {
  const number: number = parseInt(expiresIn);
  const unit: ManipulateType = expiresIn.slice(-1) as ManipulateType;

  return dayjs().add(number, unit);
}
