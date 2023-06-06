import { PlayerInterface } from 'interfaces/player';

export interface AttendanceInterface {
  id?: string;
  player_id: string;
  date: Date;
  status: string;

  player?: PlayerInterface;
  _count?: {};
}
