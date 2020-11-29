import React from "react";
import { ___PROD___ } from "./constants";

export default function Header() {
  return (
    <div>
      {!___PROD___ ? <p>development mode</p> : null}
      <h1>Habits Tracker</h1>
    </div>
  );
}
