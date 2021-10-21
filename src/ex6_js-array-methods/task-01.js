function analogSlice(arr, begin, end) {
  if (
    (typeof begin === 'number' && !Number.isNaN(begin))
    || (typeof begin === 'number'
    && !Number.isNaN(begin)
    && typeof end === 'number'
    && !Number.isNaN(end)
    )
  ) {
    if (typeof end === 'number' && !Number.isNaN(end)) {
      const copyArr = [];
      if (begin >= 0 && end > begin) {
        for (let i = begin; i < end; i += 1) {
          if (i === arr.length) break;
          copyArr.push(arr[i]);
        }
      } else if (begin >= 0) {
        for (let i = begin; i < arr.length + end; i += 1) {
          copyArr.push(arr[i]);
        }
      } else if (end < 0) {
        for (let i = begin + arr.length; i < end + arr.length; i += 1) {
          copyArr.push(arr[i]);
        }
      } else {
        let tmp = arr.length + begin;
        if (tmp < 0) {
          tmp = 0;
        }
        for (let i = tmp; i < end; i += 1) {
          copyArr.push(arr[i]);
        }
      }
      return copyArr;
    }
    const copyArr = [];
    if (begin >= 0) {
      for (let i = begin; i < arr.length && i >= 0; i += 1) {
        copyArr.push(arr[i]);
      }
    } else {
      for (let i = 0; i < arr.length && i >= 0; i += 1) {
        copyArr.push(arr[i]);
      }
    }
    return copyArr;
  }
  return [...arr];
}

module.exports = analogSlice;
