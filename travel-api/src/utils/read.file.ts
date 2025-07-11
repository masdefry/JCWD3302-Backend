import fs from 'fs';

export const readFile = async(path: string) => {
  const db = fs.readFileSync(path, 'utf-8'); // file system (membaca isi file)
  return await JSON.parse(db);
};
