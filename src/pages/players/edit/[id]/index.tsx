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
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getPlayerById, updatePlayerById } from 'apiSdk/players';
import { Error } from 'components/error';
import { playerValidationSchema } from 'validationSchema/players';
import { PlayerInterface } from 'interfaces/player';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { TeamInterface } from 'interfaces/team';
import { getUsers } from 'apiSdk/users';
import { getTeams } from 'apiSdk/teams';
import { attendanceValidationSchema } from 'validationSchema/attendances';
import { parentChildValidationSchema } from 'validationSchema/parent-children';
import { playerTrainingProgramValidationSchema } from 'validationSchema/player-training-programs';

function PlayerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PlayerInterface>(
    () => (id ? `/players/${id}` : null),
    () => getPlayerById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PlayerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePlayerById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PlayerInterface>({
    initialValues: data,
    validationSchema: playerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Player
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="position" mb="4" isInvalid={!!formik.errors?.position}>
              <FormLabel>Position</FormLabel>
              <Input type="text" name="position" value={formik.values?.position} onChange={formik.handleChange} />
              {formik.errors.position && <FormErrorMessage>{formik.errors?.position}</FormErrorMessage>}
            </FormControl>
            <FormControl id="performance_data" mb="4" isInvalid={!!formik.errors?.performance_data}>
              <FormLabel>Performance Data</FormLabel>
              <Input
                type="text"
                name="performance_data"
                value={formik.values?.performance_data}
                onChange={formik.handleChange}
              />
              {formik.errors.performance_data && <FormErrorMessage>{formik.errors?.performance_data}</FormErrorMessage>}
            </FormControl>
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'player',
  operation: AccessOperationEnum.UPDATE,
})(PlayerEditPage);
