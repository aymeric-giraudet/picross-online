interface Hints {
    cols: number[][];
    rows: number[][];
}

export const computeHints = (solution: boolean[][]): Hints => {
    let cols: number[][] = Array.from(Array(solution.length), _ => Array(1).fill(0));
    let rows: number[][] = [];
    solution.forEach((row, rowIdx) => {
        rows.push([]);
        let currentNum = 0;
        row.forEach((cell, colIdx) => {
            const currentColNum = cols[colIdx][cols[colIdx].length - 1];
            if (cell) {
                currentNum++;
                cols[colIdx][cols[colIdx].length - 1]++;
            } else {
                if (currentNum > 0) rows[rowIdx].push(currentNum);
                currentNum = 0;
                if (currentColNum > 0 && rowIdx < solution.length -1) cols[colIdx].push(0);
            }
        });
        if(currentNum > 0) rows[rowIdx].push(currentNum);
    });
    return { cols, rows };
}