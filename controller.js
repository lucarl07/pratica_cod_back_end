import { writeFile, readFile } from 'node:fs';

export const readData = (callback) => {
  readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      callback(err)
    }

    try {
      const users = JSON.parse(data)
      callback(null, users)
    } catch (error) {
      console.error(`Error: ${error}`)
    }
  });
}

export const writeData = (value, callback) => {
  writeFile('./users.json', JSON.stringify(value, null, 2), 
    (err) => {
      if (err) {
        callback(err)
      } else {
        callback(null)
      }
    }
  );
}