const object = {
  apple1: 111,
  apple2: 222,
  apple3: 333,
};

function checkExistKey(key, obj) {
  if (obj.hasOwnProperty(key)) {
    return obj;
  }

  // const newObj = Object.assign({}, obj);
  const newObj = { ...obj };
  newObj[key] = 'new';
  return newObj;
}

console.log('before call object: ', object);
console.log(checkExistKey('apple4', object));
console.log('after call object: ', object);

module.exports = checkExistKey;
