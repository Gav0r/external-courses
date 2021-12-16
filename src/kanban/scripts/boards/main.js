import {
  createBoard,
  enableAddButton,
  addBoardEvents,
  createNoBoardIcon,
  updateActiveTasksCounter,
  updateFinishedTasksCounter,
// eslint-disable-next-line import/extensions
} from './board-element.js';

(() => {
  let boards = [
    {
      title: 'backlog',
      issues: [],
    },
    {
      title: 'ready',
      issues: [],
    },
    {
      title: 'in-progress',
      issues: [],
    },
    {
      title: 'finished',
      issues: [],
    },
  ];

  const boardsLocalStorageData = localStorage.getItem('boards');

  if (boardsLocalStorageData) {
    boards = JSON.parse(boardsLocalStorageData);
  } else {
    localStorage.setItem('boards', JSON.stringify(boards));
  }

  for (let i = boards.length - 1; i >= 0; i -= 1) {
    createBoard(boards[i].title);

    if (i !== 0) {
      addBoardEvents(boards[i], i, boards[i - 1].title);
    } else {
      addBoardEvents(boards[i], i);
    }
  }
  enableAddButton(boards);
  if (boards.length === 0) {
    createNoBoardIcon();
  }
  updateActiveTasksCounter();
  updateFinishedTasksCounter();
})();
