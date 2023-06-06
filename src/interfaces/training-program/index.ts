import { PlayerTrainingProgramInterface } from 'interfaces/player-training-program';
import { UserInterface } from 'interfaces/user';

export interface TrainingProgramInterface {
  id?: string;
  name: string;
  description?: string;
  coach_id: string;
  player_training_program?: PlayerTrainingProgramInterface[];
  user?: UserInterface;
  _count?: {
    player_training_program?: number;
  };
}
