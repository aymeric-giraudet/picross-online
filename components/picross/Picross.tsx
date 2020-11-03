import { Hints } from "../../helpers/computeHints";
import Grid from "./Grid";

interface PicrossProps {
  hints: Hints;
  creator: { name: string | null; image: string | null };
}

const Picross: React.FC<PicrossProps> = (props) => (
  <>
    {props.creator.image && (
      <img
        className="inline-block mb-1 rounded-full h-20 w-20"
        src={props.creator.image}
      />
    )}
    <span className="block text-s">{props.creator.name}</span>
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
  </>
);

export default Picross;
