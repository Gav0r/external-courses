const catArray = [
  'asset/cat1.jpg',
  'asset/cat2.jpg',
  'asset/cat3.jpg',
  'asset/cat4.jpg',
];
const section = document.getElementById('section');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

next.addEventListener('click', () => {
  let current = +section.getAttribute('data-current');
  current += 1;
  if (current >= catArray.length) {
    current = 0;
  }
  section.setAttribute('data-current', current);
  section.innerHTML = `<img  src='${catArray[current]}'/>`;
});

prev.addEventListener('click', () => {
  let current = +section.getAttribute('data-current');
  current -= 1;
  if (current < 0) {
    current = catArray.length - 1;
  }

  section.setAttribute('data-current', current);
  section.innerHTML = `<img src='${catArray[current]}'/>`;
});
