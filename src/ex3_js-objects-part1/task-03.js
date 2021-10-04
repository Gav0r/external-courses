const object = {
  apple1: 111,
  apple2: 222,
  apple3: 333,
};

function checkExistKey(key, obj) {
  return obj.hasOwnProperty(key);
}

checkExistKey('apple1', object);

module.exports = checkExistKey;
