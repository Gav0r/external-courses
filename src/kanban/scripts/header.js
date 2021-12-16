// eslint-disable-next-line import/extensions
import { createBoard, removeNoBoardIcon } from './boards/board-element.js';

const d = document;

const $avatarContainer = d.querySelector('.header__avatar-container');
const $headerArrow = d.querySelector('.header__arrow');
const $addListButton = d.querySelector('.header__list-button');

const $dropdownMenu = d.createElement('div');
$dropdownMenu.className = 'dropdown-menu';
const $myAcc = d.createElement('a');
$myAcc.className = 'dropdown-menu-link';
$myAcc.href = '/me';
$myAcc.innerText = 'My account';
const $myTasks = d.createElement('a');
$myTasks.className = 'dropdown-menu-link';
$myTasks.href = '/tasks';
$myTasks.innerText = 'My tasks';
const $logOutButton = d.createElement('button');
$logOutButton.className = 'logout-button';
$logOutButton.innerText = 'Logout';

$dropdownMenu.appendChild($myAcc);
$dropdownMenu.appendChild($myTasks);
$dropdownMenu.appendChild($logOutButton);

$avatarContainer.addEventListener('click', () => {
  const $foundDropdownMenu = d.querySelector('.header__avatar-container .dropdown-menu');
  if ($foundDropdownMenu) {
    $avatarContainer.removeChild($foundDropdownMenu);
  } else {
    $avatarContainer.appendChild($dropdownMenu);
  }
  $headerArrow.classList.toggle('active');
});

$addListButton.addEventListener('click', () => {
  removeNoBoardIcon();

  createBoard('new-board', true);
});
