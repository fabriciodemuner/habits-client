import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper, WrapperVariant } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import Axios from 'axios';
import useUser from '../common/helpers/useUser';

interface LoginProps {}
const Login: React.FC<LoginProps> = ({}) => {
  const { user } = useUser({
    redirectTo: '/',
  });

  async function handleSubmit(body: { currentPassword: string; newPassword: string }) {
    if (user) {
      try {
        await Axios.post(`/api/change-password`, { ...body }, { headers: { Authorization: `Bearer ${user.accessToken}` } });
      } catch (error) {
        console.error('An unexpected error happened:', error);
      }
    }
  }

  return (
    <Wrapper variant={WrapperVariant.small}>
      <Formik
        initialValues={{ currentPassword: '', newPassword: '' }}
        onSubmit={async (values) => {
          handleSubmit(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="currentPassword" label="current password" type="password" />
            <Box mt={4}>
              <InputField name="newPassword" label="new password" type="password" />
            </Box>
            <Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">
              change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
