import { useMemo } from "react";
import { Hints } from "../../helpers/computeHints";
import solve from "../../helpers/solve";
import { useStore } from "./Grid.store";

interface ValidatorProps {
  hints: Hints;
}

const Validator: React.FC<ValidatorProps> = (props) => {
  const solution = useMemo(() => solve(props.hints), [props.hints]);
  const success = useStore((state) => state.success);
  const validate = useStore((state) => state.validate);
  return (
    <>
      <button
        className="block mt-4 text-center bg-gray-200 hover:bg-gray-400 py-2 px-4 rounded"
        onClick={() => validate(solution)}
      >
        Validate
      </button>
      {success === true && <div>Bravo</div>}
      {success === false && <div>Dommage</div>}
    </>
  );
};

export default Validator;
