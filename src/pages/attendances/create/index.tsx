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
import { createAttendance } from 'apiSdk/attendances';
import { Error } from 'components/error';
import { attendanceValidationSchema } from 'validationSchema/attendances';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { getPlayers } from 'apiSdk/players';
import { AttendanceInterface } from 'interfaces/attendance';

function AttendanceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AttendanceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAttendance(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AttendanceInterface>({
    initialValues: {
      date: new Date(new Date().toDateString()),
      status: '',
      player_id: (router.query.player_id as string) ?? null,
    },
    validationSchema: attendanceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Attendance
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="date" mb="4">
            <FormLabel>Date</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.date}
              onChange={(value: Date) => formik.setFieldValue('date', value)}
            />
          </FormControl>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<PlayerInterface>
            formik={formik}
            name={'player_id'}
            label={'Select Player'}
            placeholder={'Select Player'}
            fetcher={getPlayers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.user_id}
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
  entity: 'attendance',
  operation: AccessOperationEnum.CREATE,
})(AttendanceCreatePage);
