import { AttendanceInterface } from 'interfaces/attendance';
import { ParentChildInterface } from 'interfaces/parent-child';
import { PlayerTrainingProgramInterface } from 'interfaces/player-training-program';
import { UserInterface } from 'interfaces/user';
import { TeamInterface } from 'interfaces/team';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  team_id: string;
  position: string;
  performance_data?: string;
  attendance?: AttendanceInterface[];
  parent_child?: ParentChildInterface[];
  player_training_program?: PlayerTrainingProgramInterface[];
  user?: UserInterface;
  team?: TeamInterface;
  _count?: {
    attendance?: number;
    parent_child?: number;
    player_training_program?: number;
  };
}
