import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Grid from "../picross/Grid";
import { useStore } from "../picross/Grid.store";

const Studio: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const grid = useStore((state) => state.grid);
  const [rowSize, setRowSize] = useState(5);
  const [colSize, setColSize] = useState(5);
  const [isDisabled, setIsDisabled] = useState(false);

  async function onSubmit() {
    setIsDisabled(true);
    const response = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify({ name: ref.current?.value, grid }),
    });
    if (!response.ok) {
      console.log("unsolvable ! sad !");
    } else {
      const id = await response.text();
      router.push(`/picross/${id}`);
    }
  }

  return (
    <>
      <input
        type="number"
        className="mx-auto mb-2 px-3 py-2 border rounded focus:outline-none focus:shadow-outline focus:border-blue-400"
        value={rowSize}
        onChange={(e) => setRowSize(parseInt(e.target.value))}
      />
      <input
        type="number"
        className="mx-auto mb-2 px-3 py-2 border rounded focus:outline-none focus:shadow-outline focus:border-blue-400"
        value={colSize}
        onChange={(e) => setColSize(parseInt(e.target.value))}
      />
      <input
        type="text"
        className="block mx-auto mb-2 px-3 py-2 border rounded focus:outline-none focus:shadow-outline focus:border-blue-400"
        ref={ref}
      />
      <Grid rowSize={rowSize} colSize={colSize} />
      <button
        type="button"
        className="block mt-2 mx-auto border rounded bg-gray-300 p-1"
        onClick={onSubmit}
        disabled={isDisabled}
      >
        Submit
      </button>
    </>
  );
};

export default Studio;
