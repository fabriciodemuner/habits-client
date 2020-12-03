import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper, WrapperVariant } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRouter } from "next/router";
import Axios from "axios";
import { API_HOST } from "../constants";

interface RegisterProps {}
const post = Axios.post;

const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();

  return (
    <Wrapper variant={WrapperVariant.small}>
      <Formik
        initialValues={{ email: "", name: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await post(`${API_HOST}/user/register`, {
            ...values,
          });
          if (response.data?.register?.errors) {
            // setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data.id) {
            router.push(`/?logged=true&name=${values.email}`, '/');
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
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
