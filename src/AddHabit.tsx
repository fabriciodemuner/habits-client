import React, { useState } from "react";
import Axios from "axios";
import { API_HOST } from "./constants";

const post = Axios.post;

type AddHabitProps = {
  onChange: () => void;
  setAdd: (b: boolean) => void;
};

export default function AddHabit(props: AddHabitProps) {
  const { onChange, setAdd } = props;
  const [nameValue, setName] = useState("");
  const [descriptionValue, setDesc] = useState("");
  const [validInputs, setValidInputs] = useState(true);

  function cancelNewHabit() {
    setAdd(false);
    return;
  }
  async function handleNewHabit() {
    if (!nameValue || !descriptionValue) {
      setValidInputs(false);
      return;
    }
    try {
      await post(`${API_HOST}/habit`, {
        name: nameValue,
        description: descriptionValue,
      });
      setName("");
      setDesc("");
      setAdd(false);
      onChange();
    } catch (err) {
      console.error(err);
    }
  }

  const invalidInputMessage = validInputs ? (
    <br />
  ) : (
    <p>
      Please fill both <i>name</i> and <i>description</i> fields.{" "}
    </p>
  );

  return (
    <div>
      <input type="text" value={nameValue} onChange={(e) => setName(e.target.value)}></input>
      <input type="text" value={descriptionValue} onChange={(e) => setDesc(e.target.value)}></input>
      <button onClick={handleNewHabit}>Save Habit</button>
      <button onClick={cancelNewHabit}>Cancel</button>
      {invalidInputMessage}
    </div>
  );
}
