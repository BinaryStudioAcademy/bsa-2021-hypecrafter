const path = require('path');
const fs = require('fs');

function readLocalKeys() {
  return JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, './../dictionaries/en.json'),
      'utf-8'
    )
  ).translation;
}

function writeLocalKeys() {
  const keys = readLocalKeys();
  let str = 'declare type LocaleKeys =';
  Object.keys(keys).forEach((key) => {
    str += `\n | '${key}'`;
  });
  str += ';\n';
  fs.writeFileSync(path.resolve(__dirname, 'locale-keys.d.ts'), str, {
    encoding: 'UTF-8',
  });
}

writeLocalKeys();
