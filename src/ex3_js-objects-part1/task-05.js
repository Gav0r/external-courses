const obj1 = {
  apple1: '111',
  apple2: '222',
};
function createObjClone(obj) {
  return (Object.assign({}, ...obj));
}

module.exports(createObjClone(obj1));
