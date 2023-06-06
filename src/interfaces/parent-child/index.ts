import { UserInterface } from 'interfaces/user';
import { PlayerInterface } from 'interfaces/player';

export interface ParentChildInterface {
  id?: string;
  parent_id: string;
  child_id: string;

  user?: UserInterface;
  player?: PlayerInterface;
  _count?: {};
}
