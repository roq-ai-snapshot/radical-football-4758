import * as yup from 'yup';
import { playerTrainingProgramValidationSchema } from 'validationSchema/player-training-programs';

export const trainingProgramValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  coach_id: yup.string().nullable().required(),
  player_training_program: yup.array().of(playerTrainingProgramValidationSchema),
});
