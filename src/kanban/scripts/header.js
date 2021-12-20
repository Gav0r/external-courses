const $avatarContainer = document.querySelector('.header__avatar-container');
const $headerArrow = document.querySelector('.header__arrow');

const $dropdownMenu = document.createElement('div');
$dropdownMenu.className = 'dropdown-menu';
const $myAcc = document.createElement('a');
$myAcc.className = 'dropdown-menu-link';
$myAcc.href = '/me';
$myAcc.innerText = 'My account';
const $myTasks = document.createElement('a');
$myTasks.className = 'dropdown-menu-link';
$myTasks.href = '/tasks';
$myTasks.innerText = 'My tasks';
const $logOutButton = document.createElement('button');
$logOutButton.className = 'logout-button';
$logOutButton.innerText = 'Logout';

$dropdownMenu.appendChild($myAcc);
$dropdownMenu.appendChild($myTasks);
$dropdownMenu.appendChild($logOutButton);

$avatarContainer.addEventListener('click', () => {
  const $foundDropdownMenu = document.querySelector('.header__avatar-container .dropdown-menu');
  if ($foundDropdownMenu) {
    $avatarContainer.removeChild($foundDropdownMenu);
  } else {
    $avatarContainer.appendChild($dropdownMenu);
  }
  $headerArrow.classList.toggle('active');
});
