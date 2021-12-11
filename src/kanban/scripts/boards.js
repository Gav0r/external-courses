const $backlogTasksList = document.querySelector('.backlog-container .tasks-list');
const $readyTasksList = document.querySelector('.ready-container .tasks-list');
const $inProgresssTasksList = document.querySelector('.in-progress-container .tasks-list');
const $finishedTasksList = document.querySelector('.finished-container .tasks-list');

const $backLogAddButton = document.querySelector('.backlog-container .add-card-button');
const $readyAddButton = document.querySelector('.ready-container .add-card-button');
const $inProgressAddButton = document.querySelector('.in-progress-container .add-card-button');
const $finishedAddButton = document.querySelector('.finished-container .add-card-button');

/**
 * @param {Array<{ title: string; issues: Array<{ id: string; name: string; }>>} data
 */
const fillData = (data, $tasksList) => {
  if ($tasksList) {
    for (let i = 0; i < data.issues.length; i += 1) {
      const task = document.createElement('div');
      task.className = 'task';
      task.dataset.id = data.issues[i].id;
      task.innerText = data.issues[i].name;
      $tasksList.appendChild(task);
    }
  }
};

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

  const backlogData = boards.find((board) => board.title === 'backlog');
  const readyData = boards.find((board) => board.title === 'ready');
  const inProgressData = boards.find((board) => board.title === 'in-progress');
  const finishedData = boards.find((board) => board.title === 'finished');

  if (backlogData) {
    fillData(backlogData, $backlogTasksList);
    if (backlogData.issues.length > 0) {
      $readyAddButton.disabled = false;
    }
  }
  if (readyData) {
    fillData(readyData, $readyTasksList);
    if (readyData.issues.length > 0) {
      $inProgressAddButton.disabled = false;
    }
  }
  if (inProgressData) {
    fillData(inProgressData, $inProgresssTasksList);
    if (inProgressData.issues.length > 0) {
      $inProgressAddButton.disabled = false;
    }
  }
  if (finishedData) {
    fillData(finishedData, $finishedTasksList);
  }

  $backLogAddButton.addEventListener('click', () => {
    const inputClass = 'new-task-input';
    if ($backlogTasksList && !$backlogTasksList.querySelector(`.${inputClass}`)) {
      const $newTaskInputEl = document.createElement('input');
      $newTaskInputEl.className = inputClass;

      $backlogTasksList.appendChild($newTaskInputEl);

      const $addInputEl = document.querySelector('.backlog-container .new-task-input');
      if ($addInputEl) {
        $addInputEl.addEventListener('blur', (event) => {
          const { value } = event.target;
          if (value.trim().length > 0) {
            const boardsData = JSON.parse(localStorage.getItem('boards'));

            for (let i = 0; i < boardsData.length; i += 1) {
              if (boardsData[i].title === 'backlog') {
                let lastTaskId = 'task1';

                if (boardsData[i].issues.length > 0) {
                  const lastTaskIdNumber = boardsData[i].issues[boardsData[i].issues.length - 1].id.replace('task', '');
                  lastTaskId = `task${+lastTaskIdNumber + 1}`;
                }
                boardsData[i].issues.push({
                  id: lastTaskId,
                  name: value,
                });

                localStorage.setItem('boards', JSON.stringify(boardsData));

                $backlogTasksList.innerHTML = '';
                const newBacklogData = JSON.parse(localStorage.getItem('boards')).find((board) => board.title === 'backlog');
                if (newBacklogData) {
                  if (newBacklogData.issues.length > 0) {
                    $readyAddButton.disabled = false;
                  }
                  fillData(newBacklogData, $backlogTasksList);
                }

                break;
              }
            }
          } else {
            $addInputEl.parentNode.removeChild($addInputEl);
          }
        });
      }
    }
  });

  $readyAddButton.addEventListener('click', () => {
    const dropdownClass = 'tasks-dropdown ready-tasks-dropdown';
    if (!$readyTasksList.querySelector(`.${dropdownClass}`)) {
      const boardsData = JSON.parse(localStorage.getItem('boards'));
      const $backlogTasksDropown = document.createElement('select');
      $backlogTasksDropown.className = dropdownClass;
      const $defaultOption = document.createElement('option');
      $defaultOption.selected = true;
      $defaultOption.disabled = true;
      $defaultOption.innerText = 'Select task';
      $backlogTasksDropown.appendChild($defaultOption);

      $backlogTasksDropown.addEventListener('change', ({ target: { value } }) => {
        const actualBoardsData = JSON.parse(localStorage.getItem('boards'));
        for (let i = 0; i < actualBoardsData.length; i += 1) {
          if (actualBoardsData[i].title === 'backlog') {
            const foundTask = actualBoardsData[i].issues.find((task) => task.name === value);
            if (foundTask) {
              actualBoardsData[i].issues = actualBoardsData[i].issues
                .filter((task) => task.id !== foundTask.id);
              for (let j = 0; j < actualBoardsData.length; j += 1) {
                if (actualBoardsData[j].title === 'ready') {
                  actualBoardsData[j].issues.push(foundTask);
                  localStorage.setItem('boards', JSON.stringify(actualBoardsData));

                  $backlogTasksList.innerHTML = '';
                  $readyTasksList.innerHTML = '';

                  const actualBacklogData = actualBoardsData.find((board) => board.title === 'backlog');
                  const actualReadyData = actualBoardsData.find((board) => board.title === 'ready');

                  if (actualBacklogData) {
                    if (actualBacklogData.issues.length > 0) {
                      $readyAddButton.disabled = true;
                    } else {
                      $readyAddButton.disabled = false;
                    }
                    fillData(actualBacklogData, $backlogTasksList);
                  }
                  if (actualReadyData) {
                    if (actualReadyData.issues.length > 0) {
                      $inProgressAddButton.disabled = false;
                    }
                    fillData(actualReadyData, $readyTasksList);
                  }
                  break;
                }
              }
            }
            break;
          }
        }
      });
      for (let i = 0; i < boardsData.length; i += 1) {
        if (boardsData[i].title === 'backlog') {
          for (let j = 0; j < boardsData[i].issues.length; j += 1) {
            const $option = document.createElement('option');
            $option.dataset.id = boardsData[i].issues[j].id;
            $option.innerText = boardsData[i].issues[j].name;
            $backlogTasksDropown.appendChild($option);
          }
          break;
        }
      }
      $readyTasksList.appendChild($backlogTasksDropown);
    }
  });

  $inProgressAddButton.addEventListener('click', () => {
    const dropdownClass = 'tasks-dropdown in-progress-tasks-dropdown';
    if (!$inProgresssTasksList.querySelector(`.${dropdownClass}`)) {
      const boardsData = JSON.parse(localStorage.getItem('boards'));
      const $readyTasksDropown = document.createElement('select');
      $readyTasksDropown.className = dropdownClass;
      const $defaultOption = document.createElement('option');
      $defaultOption.selected = true;
      $defaultOption.disabled = true;
      $defaultOption.innerText = 'Select task';
      $readyTasksDropown.appendChild($defaultOption);

      $readyTasksDropown.addEventListener('change', ({ target: { value } }) => {
        const actualBoardsData = JSON.parse(localStorage.getItem('boards'));
        for (let i = 0; i < actualBoardsData.length; i += 1) {
          if (actualBoardsData[i].title === 'ready') {
            const foundTask = actualBoardsData[i].issues.find((task) => task.name === value);
            if (foundTask) {
              actualBoardsData[i].issues = actualBoardsData[i].issues
                .filter((task) => task.id !== foundTask.id);
              for (let j = 0; j < actualBoardsData.length; j += 1) {
                if (actualBoardsData[j].title === 'in-progress') {
                  actualBoardsData[j].issues.push(foundTask);
                  localStorage.setItem('boards', JSON.stringify(actualBoardsData));

                  $readyTasksList.innerHTML = '';
                  $inProgresssTasksList.innerHTML = '';

                  const actualReadyData = actualBoardsData.find((board) => board.title === 'ready');
                  const actualInProgressData = actualBoardsData.find((board) => board.title === 'in-progress');

                  if (actualReadyData) {
                    if (actualReadyData.issues.length === 0) {
                      $inProgressAddButton.disabled = true;
                    } else {
                      $inProgressAddButton.disabled = false;
                    }
                    fillData(actualReadyData, $readyTasksList);
                  }
                  if (actualInProgressData) {
                    if (actualInProgressData.issues.length > 0) {
                      $finishedAddButton.disabled = false;
                    }
                    fillData(actualInProgressData, $inProgresssTasksList);
                  }
                  break;
                }
              }
            }
            break;
          }
        }
      });
      for (let i = 0; i < boardsData.length; i += 1) {
        if (boardsData[i].title === 'ready') {
          for (let j = 0; j < boardsData[i].issues.length; j += 1) {
            const $option = document.createElement('option');
            $option.dataset.id = boardsData[i].issues[j].id;
            $option.innerText = boardsData[i].issues[j].name;
            $readyTasksDropown.appendChild($option);
          }
          break;
        }
      }
      $inProgresssTasksList.appendChild($readyTasksDropown);
    }
  });

  $finishedAddButton.addEventListener('click', () => {
    const dropdownClass = 'tasks-dropdown finished-tasks-dropdown';
    if (!$finishedTasksList.querySelector(`.${dropdownClass}`)) {
      const boardsData = JSON.parse(localStorage.getItem('boards'));
      const $inProgressTasksDropown = document.createElement('select');
      $inProgressTasksDropown.className = dropdownClass;
      const $defaultOption = document.createElement('option');
      $defaultOption.selected = true;
      $defaultOption.disabled = true;
      $defaultOption.innerText = 'Select task';
      $inProgressTasksDropown.appendChild($defaultOption);

      $inProgressTasksDropown.addEventListener('change', ({ target: { value } }) => {
        const actualBoardsData = JSON.parse(localStorage.getItem('boards'));
        for (let i = 0; i < actualBoardsData.length; i += 1) {
          if (actualBoardsData[i].title === 'in-progress') {
            const foundTask = actualBoardsData[i].issues.find((task) => task.name === value);
            if (foundTask) {
              actualBoardsData[i].issues = actualBoardsData[i].issues
                .filter((task) => task.id !== foundTask.id);
              for (let j = 0; j < actualBoardsData.length; j += 1) {
                if (actualBoardsData[j].title === 'finished') {
                  actualBoardsData[j].issues.push(foundTask);
                  localStorage.setItem('boards', JSON.stringify(actualBoardsData));
                  $inProgresssTasksList.innerHTML = '';
                  $finishedTasksList.innerHTML = '';

                  const actualInProgressData = actualBoardsData.find((board) => board.title === 'in-progress');
                  const actualFinishedData = actualBoardsData.find((board) => board.title === 'finished');

                  if (actualInProgressData) {
                    if (actualInProgressData.issues.length === 0) {
                      $inProgressAddButton.disabled = true;
                    }
                    fillData(actualInProgressData, $inProgresssTasksList);
                  }
                  if (actualFinishedData) {
                    fillData(actualFinishedData, $finishedTasksList);
                  }
                  break;
                }
              }
            }
            break;
          }
        }
      });
      for (let i = 0; i < boardsData.length; i += 1) {
        if (boardsData[i].title === 'in-progress') {
          for (let j = 0; j < boardsData[i].issues.length; j += 1) {
            const $option = document.createElement('option');
            $option.dataset.id = boardsData[i].issues[j].id;
            $option.innerText = boardsData[i].issues[j].name;
            $inProgressTasksDropown.appendChild($option);
          }
          break;
        }
      }
      $finishedTasksList.appendChild($inProgressTasksDropown);
    }
  });
})();
