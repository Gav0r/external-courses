const d = document;
const xmlns = 'http://www.w3.org/2000/svg';

const $scrollContainer = d.querySelector('.scroll-container');
const $addListButton = d.querySelector('.header__list-button');

const $activeTasksCounter = d.querySelector('.active-tasks-counter');
const $finishedTasksCounter = d.querySelector('.finished-tasks-counter');

export const updateActiveTasksCounter = () => {
  if ($activeTasksCounter) {
    const boardData = JSON.parse(localStorage.getItem('boards'));

    if (boardData.length > 0) {
      let counter = 0;

      for (let i = 0; i < boardData.length; i += 1) {
        if (i > 0 && i < boardData.length - 1) {
          counter += boardData[i].issues.length;
        }
      }

      $activeTasksCounter.innerText = counter;
    }
  }
};

export const updateFinishedTasksCounter = () => {
  if ($finishedTasksCounter) {
    const boardData = JSON.parse(localStorage.getItem('boards'));

    if (boardData.length > 0) {
      $finishedTasksCounter.innerText = boardData[boardData.length - 1].issues.length;
    }
  }
};

export const fillData = (data, $tasksList) => {
  if ($tasksList) {
    for (let i = 0; i < data.issues.length; i += 1) {
      const task = d.createElement('div');
      task.className = 'task';
      task.dataset.id = data.issues[i].id;
      task.innerText = data.issues[i].name;
      $tasksList.appendChild(task);
    }
  }
};

export const disableAddButton = (boards) => {
  for (let i = 0; i < boards.length; i += 1) {
    if (i !== 0) {
      const $addButton = d.querySelector(`.${boards[i].title}-container .add-card-button`);
      if ($addButton) {
        if (boards[i - 1].issues.length === 0) {
          $addButton.disabled = true;
        } else {
          $addButton.disabled = false;
        }
      }
    }
  }
};

export const createSelect = ({
  title,
  tasksList,
  prevTitle,
  prevTasksList,
}) => {
  const $tasksList = tasksList;
  const $prevTasksList = prevTasksList;

  const dropdownClass = `${title}-tasks-dropdown`;
  if (!$tasksList.querySelector(`.${dropdownClass}`)) {
    const boardsData = JSON.parse(localStorage.getItem('boards'));

    const $tasksDropown = d.createElement('select');
    $tasksDropown.classList.add('tasks-dropdown');
    $tasksDropown.classList.add(dropdownClass);
    const $defaultOption = d.createElement('option');
    $defaultOption.selected = true;
    $defaultOption.disabled = true;
    $defaultOption.innerText = 'Select task';
    $tasksDropown.appendChild($defaultOption);

    $tasksDropown.addEventListener('change', ({ target: { value } }) => {
      const actualBoardsData = JSON.parse(localStorage.getItem('boards'));
      let actualPrevBoardDataIndex = actualBoardsData.findIndex((board) => (
        board.title === prevTitle
      ));
      let actualBoardDataIndex = actualBoardsData.findIndex((board) => board.title === title);

      for (let i = 0; i < actualBoardsData.length; i += 1) {
        if (actualBoardsData[i].title === title) {
          actualBoardDataIndex = i;
        } else if (actualBoardsData[i].title === prevTitle) {
          actualPrevBoardDataIndex = i;
        }
      }
      if (
        actualBoardsData[actualPrevBoardDataIndex]
        && actualBoardsData[actualBoardDataIndex]
      ) {
        const foundTask = actualBoardsData[
          actualPrevBoardDataIndex
        ].issues.find((task) => task.name === value);
        if (foundTask) {
          actualBoardsData[actualPrevBoardDataIndex].issues = actualBoardsData[
            actualPrevBoardDataIndex
          ].issues.filter((task) => task.id !== foundTask.id);
          actualBoardsData[actualBoardDataIndex].issues.push(foundTask);
          localStorage.setItem('boards', JSON.stringify(actualBoardsData));
          updateActiveTasksCounter();
          updateFinishedTasksCounter();

          $tasksList.innerHTML = '';
          $prevTasksList.innerHTML = '';

          if (actualBoardsData[actualPrevBoardDataIndex]) {
            fillData(actualBoardsData[actualPrevBoardDataIndex], $prevTasksList);
          }
          if (actualBoardsData[actualBoardDataIndex]) {
            fillData(actualBoardsData[actualBoardDataIndex], $tasksList);
          }
        }
        disableAddButton(actualBoardsData);
      }
    });
    for (let i = 0; i < boardsData.length; i += 1) {
      if (boardsData[i].title === prevTitle) {
        for (let j = 0; j < boardsData[i].issues.length; j += 1) {
          const $option = d.createElement('option');
          $option.dataset.id = boardsData[i].issues[j].id;
          $option.innerText = boardsData[i].issues[j].name;
          $tasksDropown.appendChild($option);
        }
        break;
      }
    }
    $tasksList.appendChild($tasksDropown);
  }
};

export const createInput = (title, tasksList) => {
  const $tasksList = tasksList;
  const inputClass = 'new-task-input';

  if ($tasksList && !$tasksList.querySelector(`.${inputClass}`)) {
    const $newTaskInputEl = d.createElement('input');
    $newTaskInputEl.className = inputClass;

    $tasksList.appendChild($newTaskInputEl);

    const $addInputEl = d.querySelector(`.${title}-container .${inputClass}`);
    if ($addInputEl) {
      const addTask = (value) => {
        if (value.trim().length > 0) {
          const boardsData = JSON.parse(localStorage.getItem('boards'));

          for (let i = 0; i < boardsData.length; i += 1) {
            if (boardsData[i].title === title) {
              const dateNow = new Date();
              boardsData[i].issues.push({
                id: `${dateNow.getFullYear()}/${dateNow.getMonth()}/${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
                name: value,
              });

              localStorage.setItem('boards', JSON.stringify(boardsData));
              updateActiveTasksCounter();
              updateFinishedTasksCounter();

              $tasksList.innerHTML = '';
              fillData(boardsData[i], $tasksList);

              break;
            }
          }
          disableAddButton(boardsData);
        } else {
          $addInputEl.parentNode.removeChild($addInputEl);
        }
      };

      $addInputEl.focus();
      $addInputEl.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          addTask(event.target.value);
          if (event.stopPropagation) {
            event.stopPropagation();
          }
        }
      });
      $addInputEl.addEventListener('blur', (event) => {
        addTask(event.target.value);
        if (event.stopPropagation) {
          event.stopPropagation();
        }
      });
    }
  }
};

export const createSelectItem = ({
  title,
  type,
  $tasksList,
  prevTitle,
}) => {
  const $prevTasksList = d.querySelector(`.${prevTitle}-container .tasks-list`);
  switch (type) {
    case 'input':
      createInput(title, $tasksList);
      break;
    case 'select':
      createSelect({
        title,
        $tasksList,
        prevTitle,
        $prevTasksList,
      });
      break;
    default:
      break;
  }
};

export const createNoBoardIcon = () => {
  const $iconContainer = d.createElement('div');
  $iconContainer.className = 'board-icon-container';
  const $boardIcon = d.createElementNS(xmlns, 'svg');
  $boardIcon.setAttributeNS(null, 'class', 'board-icon');
  $boardIcon.setAttributeNS(null, 'viewBox', '0 0 24 24');
  const $path = d.createElementNS(xmlns, 'path');
  $path.setAttributeNS(
    null,
    'd',
    'M9,3 L9,21 L15,21 L15,3 L9,3 Z M8,3 L3.5,3 C2.67157288,3 2,3.67157288 2,4.5 L2,19.5 C2,20.3284271 2.67157288,21 3.5,21 L8,21 L8,3 Z M16,3 L16,21 L20.5,21 C21.3284271,21 22,20.3284271 22,19.5 L22,4.5 C22,3.67157288 21.3284271,3 20.5,3 L16,3 Z M1,4.5 C1,3.11928813 2.11928813,2 3.5,2 L20.5,2 C21.8807119,2 23,3.11928813 23,4.5 L23,19.5 C23,20.8807119 21.8807119,22 20.5,22 L3.5,22 C2.11928813,22 1,20.8807119 1,19.5 L1,4.5 Z M4,6 L6,6 C6.55228475,6 7,6.44771525 7,7 L7,8 C7,8.55228475 6.55228475,9 6,9 L4,9 C3.44771525,9 3,8.55228475 3,8 L3,7 C3,6.44771525 3.44771525,6 4,6 Z M4,10 L6,10 C6.55228475,10 7,10.4477153 7,11 L7,12 C7,12.5522847 6.55228475,13 6,13 L4,13 C3.44771525,13 3,12.5522847 3,12 L3,11 C3,10.4477153 3.44771525,10 4,10 Z M11,6 L13,6 C13.5522847,6 14,6.44771525 14,7 L14,8 C14,8.55228475 13.5522847,9 13,9 L11,9 C10.4477153,9 10,8.55228475 10,8 L10,7 C10,6.44771525 10.4477153,6 11,6 Z M18,6 L20,6 C20.5522847,6 21,6.44771525 21,7 L21,8 C21,8.55228475 20.5522847,9 20,9 L18,9 C17.4477153,9 17,8.55228475 17,8 L17,7 C17,6.44771525 17.4477153,6 18,6 Z M18,10 L20,10 C20.5522847,10 21,10.4477153 21,11 L21,12 C21,12.5522847 20.5522847,13 20,13 L18,13 C17.4477153,13 17,12.5522847 17,12 L17,11 C17,10.4477153 17.4477153,10 18,10 Z M18,14 L20,14 C20.5522847,14 21,14.4477153 21,15 L21,16 C21,16.5522847 20.5522847,17 20,17 L18,17 C17.4477153,17 17,16.5522847 17,16 L17,15 C17,14.4477153 17.4477153,14 18,14 Z M4,7 L4,8 L6,8 L6,7 L4,7 Z M4,11 L4,12 L6,12 L6,11 L4,11 Z M11,7 L11,8 L13,8 L13,7 L11,7 Z M18,7 L18,8 L20,8 L20,7 L18,7 Z M18,11 L18,12 L20,12 L20,11 L18,11 Z M18,15 L18,16 L20,16 L20,15 L18,15 Z M3.5,5 C3.22385763,5 3,4.77614237 3,4.5 C3,4.22385763 3.22385763,4 3.5,4 L6.5,4 C6.77614237,4 7,4.22385763 7,4.5 C7,4.77614237 6.77614237,5 6.5,5 L3.5,5 Z M10.5,5 C10.2238576,5 10,4.77614237 10,4.5 C10,4.22385763 10.2238576,4 10.5,4 L13.5,4 C13.7761424,4 14,4.22385763 14,4.5 C14,4.77614237 13.7761424,5 13.5,5 L10.5,5 Z M17.5,5 C17.2238576,5 17,4.77614237 17,4.5 C17,4.22385763 17.2238576,4 17.5,4 L20.5,4 C20.7761424,4 21,4.22385763 21,4.5 C21,4.77614237 20.7761424,5 20.5,5 L17.5,5 Z',
  );
  $boardIcon.appendChild($path);
  const $iconCaption = d.createElement('span');
  $iconCaption.innerText = 'You have no boards now, add the first one using the "Create new list" button';

  $iconContainer.appendChild($boardIcon);
  $iconContainer.appendChild($iconCaption);

  $scrollContainer.appendChild($iconContainer);
};

export const addBoardEvents = (data, index, prevTitle) => {
  const { title } = data;
  const type = index === 0 ? 'input' : 'select';

  const $boardTasksList = d.querySelector(`.${title}-container .tasks-list`);
  const $boardAddButton = d.querySelector(`.${title}-container .add-card-button`);

  if ($boardTasksList) {
    $boardTasksList.innerHTML = '';
    fillData(data, $boardTasksList);
  }

  if ($boardAddButton && $boardTasksList) {
    $boardAddButton.addEventListener('click', () => {
      createSelectItem({
        title,
        type,
        $tasksList: $boardTasksList,
        prevTitle,
      });
    });
  }
};

export const enableAddButton = (boards) => {
  for (let i = 0; i < boards.length; i += 1) {
    if (i !== 0) {
      const $addButton = d.querySelector(`.${boards[i].title}-container .add-card-button`);
      if (boards[i - 1].issues.length > 0 && $addButton) {
        $addButton.disabled = false;
      }
    } else {
      const $addButton = d.querySelector(`.${boards[i].title}-container .add-card-button`);
      if ($addButton) {
        $addButton.disabled = false;
      }
    }
  }
};

const redrawBoardsAddButton = (boardsData) => {
  for (let i = 0; i < boardsData.length; i += 1) {
    const $addButton = d.querySelector(`.${boardsData[i].title}-container .add-card-button`);
    if ($addButton) {
      const $kandabColumn = $addButton.parentNode;
      $kandabColumn.removeChild($addButton);

      const $addCardButtonPlus = d.createElement('span');
      $addCardButtonPlus.className = 'plus';
      $addCardButtonPlus.innerText = '+';

      const $addCardButton = d.createElement('button');
      $addCardButton.className = 'add-card-button';
      $addCardButton.disabled = true;
      $addCardButton.appendChild($addCardButtonPlus);
      $addCardButton.innerHTML = `${$addCardButton.innerHTML}Add card`;

      $kandabColumn.appendChild($addCardButton);

      if (i !== 0) {
        addBoardEvents(boardsData[i], i, boardsData[i - 1].title);
      } else {
        addBoardEvents(boardsData[i], i);
      }
    }
  }
  enableAddButton(boardsData);
};

export const removeNoBoardIcon = () => {
  const $iconContainer = d.querySelector('.board-icon-container');
  if ($iconContainer) {
    $iconContainer.parentNode.removeChild($iconContainer);
  }
};

const deleteBoardHandler = (board) => {
  const $board = d.querySelector(`.${board}-container`);
  if ($board) {
    const $boardContainer = $board.parentNode;

    const boardsData = JSON.parse(localStorage.getItem('boards')).filter((boardData) => boardData.title !== board);
    localStorage.setItem('boards', JSON.stringify(boardsData));
    updateActiveTasksCounter();
    updateFinishedTasksCounter();

    $boardContainer.parentNode.removeChild($boardContainer);

    redrawBoardsAddButton(boardsData);

    if (boardsData.length === 0) {
      $scrollContainer.innerHTML = '';
      console.log('createNoBoardIcon call');
      createNoBoardIcon();
    }
  }
};

const getTitle = (board) => {
  const $boardTitle = d.createElement('h3');
  $boardTitle.className = 'title';
  $boardTitle.innerText = `${board[0].toUpperCase()}${board.replace(board[0], '')}`;
  return $boardTitle;
};

export const createBoard = (board, isNew) => {
  const $div = d.createElement('div');

  const $boardContainer = d.createElement('div');
  $boardContainer.className = `kanban-column ${board}-container`;

  const $titleContainer = d.createElement('div');

  const $tasksList = d.createElement('div');
  $tasksList.className = 'tasks-list';

  const $dropdownOpenButton = d.createElement('button');
  $dropdownOpenButton.innerText = '...';
  $dropdownOpenButton.className = 'context-menu-open-button';

  const $contextMenu = d.createElement('div');
  $contextMenu.className = 'context-menu';
  $contextMenu.appendChild($dropdownOpenButton);

  $dropdownOpenButton.addEventListener('click', ({ target }) => {
    const $foundDropdown = target.parentNode.querySelector('.dropdown');
    if ($foundDropdown) {
      target.parentNode.removeChild($foundDropdown);
    } else {
      const $deleteOption = d.createElement('button');
      $deleteOption.innerText = 'Delete';

      const $dropdown = d.createElement('div');
      $dropdown.className = 'dropdown';
      $dropdown.appendChild($deleteOption);

      $deleteOption.addEventListener('click', () => {
        deleteBoardHandler(board);
      });

      target.parentNode.appendChild($dropdown);
    }
  });

  if (!isNew) {
    $titleContainer.appendChild(getTitle(board));
  } else {
    const $boardTitleInput = d.createElement('input');
    $boardTitleInput.className = 'title-input';
    $boardTitleInput.placeholder = 'New Board';
    $titleContainer.appendChild($boardTitleInput);

    $boardTitleInput.addEventListener('blur', ({ target: { value } }) => {
      // eslint-disable-next-line no-use-before-define
      boardTitleClickHandler(board, value);
    });

    $addListButton.disabled = true;
  }

  $titleContainer.className = 'title-container';
  $titleContainer.appendChild($contextMenu);

  const $addCardButtonPlus = d.createElement('span');
  $addCardButtonPlus.className = 'plus';
  $addCardButtonPlus.innerText = '+';

  const $addCardButton = d.createElement('button');
  $addCardButton.className = 'add-card-button';
  $addCardButton.disabled = true;
  $addCardButton.appendChild($addCardButtonPlus);
  $addCardButton.innerHTML = `${$addCardButton.innerHTML}Add card`;

  $boardContainer.appendChild($titleContainer);
  $boardContainer.appendChild($tasksList);
  $boardContainer.appendChild($addCardButton);

  $div.appendChild($boardContainer);

  $scrollContainer.prepend($div);
  const $titleInput = d.querySelector('.title-input');

  if ($titleInput) {
    $titleInput.focus();
  }
};

const boardTitleClickHandler = (board, value) => {
  const $board = d.querySelector(`.${board}-container`);
  if ($board) {
    if (value.trim()) {
      const $boardContainer = $board.parentNode;
      const formattedValue = value.trim().replaceAll(/\s+/g, '-');
      const boardsData = JSON.parse(localStorage.getItem('boards'));
      boardsData.unshift({ title: formattedValue, issues: [] });

      localStorage.setItem('boards', JSON.stringify(boardsData));
      updateActiveTasksCounter();
      updateFinishedTasksCounter();

      $scrollContainer.removeChild($boardContainer);

      createBoard(formattedValue);

      redrawBoardsAddButton(boardsData);
    } else {
      const $boardContainer = $board.parentNode;
      $scrollContainer.removeChild($boardContainer);
    }
    $addListButton.disabled = false;
  }
};
