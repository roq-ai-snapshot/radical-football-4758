import * as yup from 'yup';
import { coachTeamValidationSchema } from 'validationSchema/coach-teams';
import { playerValidationSchema } from 'validationSchema/players';

export const teamValidationSchema = yup.object().shape({
  name: yup.string().required(),
  academy_id: yup.string().nullable().required(),
  coach_team: yup.array().of(coachTeamValidationSchema),
  player: yup.array().of(playerValidationSchema),
});
