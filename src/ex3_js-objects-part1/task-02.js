const obj = {
  key1: 111,
  key2: 222,
  key3: 3,
};

function printObjectCase(object) {
  // 1 способ
  Object.keys(object).forEach((key) => console.log(`${key} ${object[key]}`));
  // const array = Object.keys(object); // [ 'key1', 'key2' ]
  // for (let i = 0; i < array.length; i++) {
  // 2 способ
  //   console.log(`${array[i]} ${object[array[i]]}`);
  // }
  // 3 способ
  // for (let key in object) {
  //   console.log(`${key} ${object[key]}`)
  // }
  return undefined;
}

printObjectCase(obj);

module.exports = printObjectCase;
