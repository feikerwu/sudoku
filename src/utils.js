// 判断一个数独是否合法
export function isValidSudoku(sudoku) {
  let cols = [],
    rows = [],
    boxs = [];
  for (let i = 0; i < 10; i++) {
    let term = Array.from({ length: 10 }).fill(0);
    cols.push(term.slice());
    rows.push(term.slice());
    boxs.push(term.slice());
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = sudoku[i][j];
      if (value !== '.') {
        const boxIdx = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        if (cols[i][value] || rows[j][value] || boxs[boxIdx][value]) {
          return false;
        }
        cols[i][value] = rows[j][value] = boxs[boxIdx][value] = 1;
      }
    }
  }

  return true;
}

export function genRandomSudoku() {
  const sudoku = Array.from({ length: 9 }).map(item =>
    Array.from({ length: 9 }).fill('')
  );

  let cols = [],
    rows = [],
    boxs = [];
  for (let i = 0; i < 10; i++) {
    let term = Array.from({ length: 10 }).fill(0);
    cols.push(term.slice());
    rows.push(term.slice());
    boxs.push(term.slice());
  }
  // console.log('here');

  // 生成40个初始数据
  backtrack(...genRandomPos(sudoku), 40);

  return sudoku;

  function backtrack(x, y, count) {
    if (count <= 0) {
      return true;
    }
    // console.log('xx');
    for (let num = 1; num <= 9; num++) {
      const boxIdx = Math.floor(x / 3) * 3 + Math.floor(y / 3);
      if (cols[x][num] || rows[y][num] || boxs[boxIdx][num]) {
        continue;
      }
      sudoku[x][y] = num;
      cols[x][num] = rows[y][num] = boxs[boxIdx][num] = 1;
      if (backtrack(...genRandomPos(sudoku), --count)) {
        return true;
      }
      // 回溯
      sudoku[x][y] = '';
      cols[x][num] = rows[y][num] = boxs[boxIdx][num] = 0;
    }

    return false;
  }
}

export const genRandomPos = sudoku => {
  while (true) {
    const randomValue = Math.floor(Math.random() * 81);
    const [x, y] = [Math.floor(randomValue / 9), randomValue % 9];
    if (sudoku[x][y] === '') {
      return [x, y];
    }
  }
};

// console.log(genRandomSudo());
