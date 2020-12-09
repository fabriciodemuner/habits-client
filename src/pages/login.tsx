import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Wrapper, WrapperVariant } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import NextLink from 'next/link';
import Axios from 'axios';
import useUser from '../common/helpers/useUser';

interface LoginProps {}
const Login: React.FC<LoginProps> = ({}) => {
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  async function handleSubmit(body: { email: string; password: string }) {
    try {
      await mutateUser(Axios.post('/api/login', body));
    } catch (error) {
      console.error('An unexpected error happened:', error);
    }
  }

  return (
    <Wrapper variant={WrapperVariant.small}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          handleSubmit(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" label="e-mail" />
            <Box mt={4}>
              <InputField name="password" label="password" type="password" />
            </Box>
            <Flex mt={1}>
              <NextLink href="/forgot-password">
                <Link ml="auto">forgot password?</Link>
              </NextLink>
            </Flex>
            <Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
