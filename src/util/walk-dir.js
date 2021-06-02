const Walker = require('walker');

const {
  join,
  basename,
} = require('path');

const path = join(process.cwd(), 'openAPI');

const openApiDocs = {};

/**
 * Walking the openAPI directory path 
 * and listing all the API documents 
 */

Walker(path)
  .on('file', function (file) {
    const fileName = basename(file);
    openApiDocs[fileName] = {
      fileName,
      filePath: file
    }
  })
  .on('error', function (er, entry) {
    console.log('Got error ' + er + ' on entry ' + entry)
  })
  .on('end', function () {
    Object
      .keys(openApiDocs)
      .forEach(e => console.log(`API file found : ${e}`))
  });

module.exports = {
  openApiDocs
}