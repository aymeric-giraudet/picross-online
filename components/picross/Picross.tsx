import { Hints } from "../../helpers/computeHints";
import Grid from "./Grid";
import Validator from "./Validator";

interface PicrossProps {
  hints: Hints;
  solution: boolean[][];
}

const Picross: React.FC<PicrossProps> = (props) => (
  <>
    <div className="flex flex-col items-end">
      <div className="flex">
        {props.hints.cols.map((c, idx) => (
          <div key={idx} className="flex-col w-12 even:bg-gray-200">
            {c.map((n, idx) => (
              <div key={idx} className="text-center text-3xl">
                {n}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="flex-col">
          {props.hints.rows.map((c, idx) => (
            <div
              key={idx}
              className="flex text-right items-center h-12 even:bg-gray-200"
            >
              {c.map((n, idx) => (
                <div key={idx} className="text-3xl px-1 flex-auto">
                  {n}
                </div>
              ))}
            </div>
          ))}
        </div>
        <Grid
          rowSize={props.hints.rows.length}
          colSize={props.hints.cols.length}
        />
      </div>
    </div>
    <Validator solution={props.solution} />
  </>
);

export default Picross;
