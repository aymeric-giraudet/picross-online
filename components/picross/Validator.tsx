import { useStore } from "./Grid.store";

interface ValidatorProps {
  solution: boolean[][];
}

const Validator: React.FC<ValidatorProps> = (props) => {
  const success = useStore((state) => state.success);
  const validate = useStore((state) => state.validate);
  return (
    <>
      <button
        className="mt-4 text-center bg-gray-200 hover:bg-gray-400 py-2 px-4 rounded"
        onClick={() => validate(props.solution)}
      >
        Validate
      </button>
      {success === true && <div>Bravo</div>}
      {success === false && <div>Dommage</div>}
    </>
  );
};

export default Validator;
