import { useState } from "react";
import Grid from "../picross/Grid";
import { useStore } from "../picross/Grid.store";

const Studio: React.FC = () => {
  const [name, setName] = useState("");
  const grid = useStore((state) => state.grid);
  function onSubmit() {
    fetch("/api/create", {
      method: "POST",
      body: JSON.stringify({ name, grid }),
    });
  }
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
      <Grid rowSize={5} colSize={5} />
      <button type="button" onClick={onSubmit}>
        Submit
      </button>
    </>
  );
};

export default Studio;
