const multipart = require('./multipart');
const path = require('path');
const fs = require('fs');
const { createRepliconExpenser } = require('./replicon-expenser');
const atob = require('atob');
const formidable = require('formidable');
const uuidv4 = require('uuid/v4');

const isLocal = !process.env['WEBSITE_INSTANCE_ID'];
const AZURE_TEMP_FILES_DIR = isLocal ? './receipt-images' : 'D:/local/Temp';

const getFormParts = (context, req) => {
  const bodyBuffer = Buffer.from(req.body);
  const boundary = multipart.getBoundary(req.headers['content-type']);
  const formParts = multipart.Parse(context, bodyBuffer, boundary);
  return formParts;
}

// const getFormPartsRedux = async (req) => {
//   return new Promise((resolve, reject) => {
//     const incForm = new formidable.IncomingForm();
//     incForm.parse(req, function(err, fields, files) {
//       console.log('Formidable Files: ', fields, files);
//       const toReturn = fields.concat(files);
//       resolve(toReturn);
//       // resolve({
//       //   fields,
//       //   files
//       // });
//     });
//   });
// }

const deleteExistingFiles = async (directory) => {
  return new Promise((resolve) => {
    if (fs.existsSync(directory)) {
      fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
        }
        resolve(true);
      });
    } else {
      resolve(false);
    }
  });
}

const writeImagesToOutputDir = async (context, formParts) => {
  let fileNames = [];
  const guid = uuidv4();
  const outputDir = path.join(AZURE_TEMP_FILES_DIR, guid);
  context.log(`Setting output directory to: ${outputDir}`);
  await deleteExistingFiles(outputDir);
  for (part of formParts) {
    if (part.filename) {
      fileNames.push(part.filename);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      const outputPath = path.join(outputDir, part.filename);
      fs.writeFileSync(outputPath, part.data, { encoding: 'binary' });
    }
  }
  return outputDir;
}

module.exports = async function (context, req) {
  try {
    context.log('JavaScript HTTP trigger function processed a request.');
    const formParts = await getFormParts(context, req);
    context.log('Parsed form parts: ');
    context.log(formParts);
    const params = formParts.reduce((prev, next) => {
      if (next.name) {
        prev[next.name] = next.data;
      }
      if (next.name === 'password') {
        prev[next.name] = atob(next.data);
      }
      return prev;
    }, {});
    const outputDir = await writeImagesToOutputDir(context, formParts);
    context.log('Output Directory: ', outputDir);
    const repliconExpenser = createRepliconExpenser(context);
    await repliconExpenser.createRepliconExpenseReport({
      ...params,
      receiptsPath: outputDir,
    });

    context.res = {
      status: 200,
      body: { message: "Upload complete" },
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } catch (err) {
    context.log('Error Occurred...', err);
    context.res = {
      status: 500,
      body: { message: "Error Occurred", error: err },
      headers: {
        'Content-Type': 'application/json'
      }
    }
    throw err;
  }
};