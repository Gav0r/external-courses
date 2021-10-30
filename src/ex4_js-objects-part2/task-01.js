function returnValue(key, object) {
  const getProto = Object.getPrototypeOf(object);

  return getProto[key];
}

module.exports = returnValue;
