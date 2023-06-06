import { CoachTeamInterface } from 'interfaces/coach-team';
import { PlayerInterface } from 'interfaces/player';
import { AcademyInterface } from 'interfaces/academy';

export interface TeamInterface {
  id?: string;
  name: string;
  academy_id: string;
  coach_team?: CoachTeamInterface[];
  player?: PlayerInterface[];
  academy?: AcademyInterface;
  _count?: {
    coach_team?: number;
    player?: number;
  };
}
