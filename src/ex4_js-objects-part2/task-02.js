function createObjNoProto() {
  const newEmptyObj = Object.create(null);

  return newEmptyObj;
}

module.exports = createObjNoProto;
