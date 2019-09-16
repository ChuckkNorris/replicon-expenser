const multipart = require('./multipart');
const path = require('path');
const fs = require('fs');
const repliconExpenser = require('./replicon-expenser');
const isLocal = !process.env['WEBSITE_INSTANCE_ID'];

const AZURE_TEMP_FILES_DIR = isLocal ? './receipt-images' : 'D:/local/Temp';

const getFormParts = (req) => {
  const bodyBuffer = Buffer.from(req.body);
  const boundary = multipart.getBoundary(req.headers['content-type']);
  const formParts = multipart.Parse(bodyBuffer, boundary);
  return formParts;
}

const writeImagesToOutputDir = async (formParts) => {
  let fileNames = [];
  const outputDir = path.join(AZURE_TEMP_FILES_DIR);
  for (part of formParts) {
    if (part.filename) {
      fileNames.push(part.filename);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }
      const outputPath = path.join(outputDir, part.filename);
      fs.writeFileSync(outputPath, part.data, { encoding: 'binary' });
    }
  }
  return outputDir;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log(context);
    context.log(req);
    const formParts = getFormParts(req);
    const params = formParts.reduce((prev, next) => {
      if (next.name) {
        prev[next.name] = next.data;
      }
      return prev;
    }, {});
    const outputDir = await writeImagesToOutputDir(formParts);
    await repliconExpenser.createRepliconExpenseReport({
      ...params,
      receiptsPath: outputDir,
    });

    context.res = {
      status: 200,
      body: { fileNames },
      headers: {
        'Content-Type': 'application/json'
      }
    }
};