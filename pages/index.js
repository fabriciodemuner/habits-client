import React, { useState } from "react";
const Home = () => {
  return (
    <>
      <div>Home 2</div>
      <Counter />
    </>
  );
};

const Counter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <button onClick={() => setCounter(counter - 1)}>Down</button>
      <span> {counter} </span>
      <button onClick={() => setCounter(counter + 1)}>Up</button>
    </>
  );
};

export default Home;
