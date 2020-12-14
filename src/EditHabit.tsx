import React, { useState } from 'react';
import Axios from 'axios';
import { API_HOST } from './constants';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import useUser from './common/helpers/useUser';

type EditHabitProps = {
  habit: any;
  onChange: () => void;
  setEdit: (b: boolean) => void;
};

export default function EditHabit(props: EditHabitProps) {
  const { user } = useUser();
  const { habit, onChange, setEdit } = props;
  const [nameValue, setName] = useState(habit.name);
  const [descriptionValue, setDesc] = useState(habit.description);
  const [validInputs, setValidInputs] = useState(true);

  async function handleDelete() {
    if (user) {
      try {
        await Axios.delete(`${API_HOST}/habit/${habit.id}`, { headers: { Authorization: `Bearer ${user.accessToken}` } });
        setEdit(false);
        onChange();
      } catch (err) {
        console.error(err);
      }
    }
  }

  function cancelUpdate() {
    setEdit(false);
    return;
  }

  async function handleUpdate() {
    if (nameValue === habit.name && descriptionValue === habit.description) {
      setEdit(false);
      return;
    }
    if (!nameValue || !descriptionValue) {
      setValidInputs(false);
      return;
    }
    if (user) {
      try {
        await Axios.put(
          `${API_HOST}/habit/${habit.id}`,
          {
            name: nameValue,
            description: descriptionValue,
          },
          { headers: { Authorization: `Bearer ${user.accessToken}` } },
        );
        setEdit(false);
        onChange();
      } catch (err) {
        console.error(err);
      }
    }
  }

  const invalidInputMessage = validInputs ? (
    <br />
  ) : (
    <Text mt="2">
      Please fill both <i>name</i> and <i>description</i> fields.
    </Text>
  );
  return (
    <Flex mx="4" alignItems="center">
      <Box>
        <Box>
          <Text>Name:</Text>
          <Input type="text" value={nameValue} onChange={(e) => setName(e.target.value)}></Input>
        </Box>
        <Box>
          <Text>Description:</Text>
          <Input type="text" value={descriptionValue} onChange={(e) => setDesc(e.target.value)}></Input>
        </Box>
        {invalidInputMessage}
      </Box>
      <Flex direction="column" mx="auto">
        <Button mb="2" onClick={handleUpdate}>
          Save
        </Button>
        <Button mb="2" onClick={cancelUpdate}>
          Cancel
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </Flex>
    </Flex>
  );
}
