const fs = require('fs');
const csv = require('csv-parser');

async function parseCsv(filePath) {
  return new Promise((resolve, reject) => {
    const secrets = [];
    const stream = fs.createReadStream(filePath);

    stream.on('error', (error) => {
      reject(error);
    });

    stream
      .pipe(csv())
      .on('data', (row) => {
        const secretName = row.secretName;
        const secretValue = row.secretValue;

        if (secretName && secretValue) {
          secrets.push({ name: secretName, value: secretValue });
        } else {
          console.warn('Warning: Skipping row due to missing secretName or secretValue.', row);
        }
      })
      .on('end', () => {
        resolve(secrets);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

module.exports = parseCsv;
