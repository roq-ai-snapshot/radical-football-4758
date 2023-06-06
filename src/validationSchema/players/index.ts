import * as yup from 'yup';
import { attendanceValidationSchema } from 'validationSchema/attendances';
import { parentChildValidationSchema } from 'validationSchema/parent-children';
import { playerTrainingProgramValidationSchema } from 'validationSchema/player-training-programs';

export const playerValidationSchema = yup.object().shape({
  position: yup.string().required(),
  performance_data: yup.string(),
  user_id: yup.string().nullable().required(),
  team_id: yup.string().nullable().required(),
  attendance: yup.array().of(attendanceValidationSchema),
  parent_child: yup.array().of(parentChildValidationSchema),
  player_training_program: yup.array().of(playerTrainingProgramValidationSchema),
});
