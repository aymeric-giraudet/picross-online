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
        className="block mx-auto mb-2 border px-3 py-2 border rounded focus:outline-none focus:shadow-outline focus:border-blue-400"
        onChange={(evt) => setName(evt.target.value)}
      />
      <Grid rowSize={5} colSize={5} />
      <button
        type="button"
        className="block mt-2 mx-auto border rounded bg-gray-300 p-1"
        onClick={onSubmit}
      >
        Submit
      </button>
    </>
  );
};

export default Studio;
