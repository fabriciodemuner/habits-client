import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper, WrapperVariant } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRouter } from 'next/router';
import Axios from 'axios';
import { BASE_URL, ENDPOINTS } from './api/endpoints';

interface RegisterProps {}
const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();

  return (
    <Wrapper variant={WrapperVariant.small}>
      <Formik
        initialValues={{ email: '', name: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await Axios.post(`${BASE_URL}${ENDPOINTS.AUTH.REGISTER}`, {
            ...values,
          });
          if (response.data?.register?.errors) {
            // setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data.id) {
            router.push(`/?logged=true&name=${values.email}`, '/'); // TODO
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="name" label="name" />
            <Box mt={4}>
              <InputField name="email" label="email" />
            </Box>
            <Box mt={4}>
              <InputField name="password" label="password" type="password" />
            </Box>
            <Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
