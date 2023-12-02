const csv = require('csv-parser');

function parseCSV(csvData) {
  return new Promise((resolve, reject) => {
    const results = [];

    const stream = csv({
      // Specify the separator character if different from the default comma (',')
      separator: ',',
      // TODO: figure out why this is not working
      // columns: [...]
      columns: false
    });

    stream
      .on('data', (data) => {
        console.log('data -> ', data);
        results.push(data);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });

    stream.write(csvData);
    stream.end();
  });
}

module.exports = parseCSV;
