import * as yup from 'yup';

export const coachTeamValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  team_id: yup.string().nullable().required(),
});
