const obj1 = {
  apple1: '111',
  apple2: '222',
};

function deepClone(object) {
  return JSON.parse(JSON.stringify(object));
}

console.log(deepClone(obj1));

module.exports(deepClone);
