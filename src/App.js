import React, { useState } from 'react';
import { genRandomSudoku, isValidSudoku } from './utils';
import './App.css';

const initSudoku = genRandomSudoku();
const deepSlice = arr => arr.map(subarr => subarr.slice());

const Sudoku = () => {
  const [wrong, toggleWrong] = useState([false, -1, -1]);
  const [sudoku, setSudoku] = useState(initSudoku);
  console.log(sudoku);
  console.log('render');
  const onChange = (value, x, y) => {
    const num = ~~parseInt(value) / 10;
    sudoku[x][y] = num;
    setSudoku(deepSlice(sudoku));
    toggleWrong([false, x, y]);
    if (!isValidSudoku(sudoku)) {
      toggleWrong([true, x, y]);
      sudoku[x][y] = '';
      setSudoku(deepSlice(sudoku));
    }
  };

  return (
    <div>
      <div className='sudoku'>
        {sudoku.map((cols, colIndex) => (
          <div className='col'>
            {cols.map((row, rowIndex) => (
              <input
                className={row === '.' ? 'empty' : 'value'}
                value={row}
                onChange={e => onChange(e, colIndex, rowIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <div>{wrong[0] ? 'Wrong' : ''}</div>
    </div>
  );
};

export default Sudoku;
