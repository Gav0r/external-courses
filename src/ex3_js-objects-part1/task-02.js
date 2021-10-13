const obj = {
  key1: 111,
  key2: 222,
  key3: 3,
};

function printObjectCase(object) {
  Object.keys(object).forEach((key) => console.log(`${key} ${object[key]}`));

  return undefined;
}

module.exports = printObjectCase(obj);
