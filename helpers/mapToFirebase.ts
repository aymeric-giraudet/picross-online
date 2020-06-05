export const mapToObject = (array: any[]) => ({ value: [...array] });
export const mapToArray = ({ value }: { value: any[]}) => [...value];

  // const res = toAdd.map(p => {
  //   return { ...p, solution: p.solution.map(mapToObject), hints: { cols: p.hints.cols.map(mapToObject), rows: p.hints.rows.map(mapToObject) } };
  // });