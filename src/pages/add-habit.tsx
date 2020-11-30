import { Box, Button, Text } from "@chakra-ui/react";
import Axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { API_HOST } from "../constants";
// import { useIsAuth } from '../utils/useIsAuth';

const post = Axios.post;

const AddHabit: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [validInputs, setValidInputs] = useState(true);
  // useIsAuth();

  async function handleSubmit(values: { name: string; description: string }) {
    if (!values.name || !values.description) {
      setValidInputs(false);
      return;
    }

    try {
      await post(`${API_HOST}/habit`, {
        name: values.name,
        description: values.description,
      });
    } catch (err) {
      console.error(err);
    }
    router.push("/");
  }

  const invalidInputMessage = validInputs ? (
    <br />
  ) : (
    <Text mt="3" textAlign="center">
      Please fill both <i>name</i> and <i>description</i> fields.{" "}
    </Text>
  );

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ name: "", description: "" }}
        onSubmit={async (values) => handleSubmit(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="name" label="name" />
            <Box mt={4}>
              <InputField name="description" label="description" />
            </Box>
            <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="teal">
              add habit
            </Button>
          </Form>
        )}
      </Formik>
      {invalidInputMessage}
    </Layout>
  );
};

export default AddHabit;
