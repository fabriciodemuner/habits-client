import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Wrapper, WrapperVariant } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Axios from "axios";
import { API_HOST } from "../constants";

interface LoginProps {}
const post = Axios.post;

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();

  return (
    <Wrapper variant={WrapperVariant.small}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await post(`${API_HOST}/user/login`, {
            ...values,
          });
          if (response.data?.login?.errors) {
            // setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data.id) {
            if (typeof router.query.next === 'string') {
              router.push(`${router.query.next}?logged=true&name=${values.email}`, router.query.next);
            } else {
              router.push(`/?logged=true&name=${values.email}`);
            }
          }
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
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
