function countChars(str) {
  const result = {};
  const chars = str.split('');

  for (let i = 0; i < chars.length - 1; i += 1) {
    const count = result[chars[i]] ? result[chars[i]] : 0;
    result[chars[i]] = count + 1;
  }
  console.log(Object.keys(result).forEach((key) => console.log(`${key} =  ${result[key]}`)));
}

module.exports = countChars;
