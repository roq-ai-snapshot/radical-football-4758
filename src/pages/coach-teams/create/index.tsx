import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createCoachTeam } from 'apiSdk/coach-teams';
import { Error } from 'components/error';
import { coachTeamValidationSchema } from 'validationSchema/coach-teams';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { TeamInterface } from 'interfaces/team';
import { getUsers } from 'apiSdk/users';
import { getTeams } from 'apiSdk/teams';
import { CoachTeamInterface } from 'interfaces/coach-team';

function CoachTeamCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CoachTeamInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCoachTeam(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CoachTeamInterface>({
    initialValues: {
      user_id: (router.query.user_id as string) ?? null,
      team_id: (router.query.team_id as string) ?? null,
    },
    validationSchema: coachTeamValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Coach Team
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<TeamInterface>
            formik={formik}
            name={'team_id'}
            label={'Select Team'}
            placeholder={'Select Team'}
            fetcher={getTeams}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'coach_team',
  operation: AccessOperationEnum.CREATE,
})(CoachTeamCreatePage);
