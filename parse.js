const fs = require('fs');

const rimraf = require('rimraf');

let raw_html = fs.readFileSync('raw.html', 'utf8');

let regex = new RegExp(/<span[\s\S]+?js-description-text[\s\S]+?>([\s\S]+?)<\/span>/, 'g');

if(!fs.existsSync('output'))
  fs.mkdirSync('output');

const dir_path = `output/${new Date().toISOString().split('T')[0]}`
if(fs.existsSync(dir_path))
  rimraf.sync(dir_path);
fs.mkdirSync(dir_path);

function zfill(original) {
  let str_val = '' + original;
  while(str_val.length < 4)
    str_val = '0' + str_val;
  return str_val;
}

let counter = 0;
let m = null;
do {
    m = regex.exec(raw_html);
    if(m) {
      fs.writeFileSync(`${dir_path}/${zfill(counter)}.html`, m[1]);
      counter += 1;
    }
} while (m);

