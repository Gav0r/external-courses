const $debouncedInput = document.querySelector('.debounced-input');
const $debouncedInputValue = document.querySelector('.debounced-input-value');
const $regularInput = document.querySelector('.regular-input');
const $regularInputVaue = document.querySelector('.regular-input-value');

function debounce(f, ms = 0) {
  let isCooldown = false;

  return function func() {
    if (isCooldown) return;

    // eslint-disable-next-line prefer-rest-params
    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => {
      isCooldown = false;
    }, ms);
  };
}

if ($debouncedInput) {
  const setDebValue = debounce((value) => {
    $debouncedInputValue.innerHTML = value;
  }, 500);

  $debouncedInput.addEventListener('keyup', (event) => {
    const { value } = event.target;
    setDebValue(value);
  });
}

if ($regularInput) {
  $regularInput.addEventListener('keyup', (event) => {
    const { value } = event.target;
    $regularInputVaue.innerHTML = value;
  });
}
