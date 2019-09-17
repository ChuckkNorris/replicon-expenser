const express = require('express');
const multipart = require('./multipart');
const path = require('path');
const fs = require('fs');
const { createRepliconExpenser } = require('./replicon-expenser');
const atob = require('atob');
const formidable = require('formidable');
const uuidv4 = require('uuid/v4');

const app = express();
const port = 3005;
// const isLocal = !process.env['WEBSITE_INSTANCE_ID'];
const AZURE_TEMP_FILES_DIR = 'receipt-images'; // : 'D:/local/Temp';

const createDirsRecursively = (path) => {
  console.log('Creating directory: ', path);
  const dirs = path.indexOf('\\') ? path.split('\\') : path.split('/');
  let nextPath = '';
  for (dir of dirs) {
    if (!nextPath) {
      nextPath += dir;
    } else {
      nextPath += '/' + dir;
    }
    if (!fs.existsSync(nextPath)) {
      fs.mkdirSync(nextPath);
    }
  }
}

const getFormPartsRedux = async (req) => {
  return new Promise((resolve, reject) => {
    const guid = uuidv4();
    const outputDir = path.join(__dirname, AZURE_TEMP_FILES_DIR, guid);
    let toReturn = { fields: {}, files: [], outputDir };
    createDirsRecursively(outputDir);
   
    const incForm = new formidable.IncomingForm();
    incForm.multiples = true;
    incForm.parse(req)
      .on('fileBegin', (name, file) => {
        file.path = path.join(outputDir, file.name);
      })
      .on('file', (name, file) => {
        console.log('Uploaded file', name, file);
        toReturn.files.push(file);
      })
      .on('field', (name, field) => {
        if (name === 'password') {
          toReturn.fields[name] = atob(field);
        } else {
          toReturn.fields[name] = field;
        }
        
      })
      .on('end', () => {
        resolve(toReturn);
      });
  });
}

app.post('/api/create-expense-report', async (req, res, next) => {
  console.log('You posted to create an expense!');
  try {
    console.log('JavaScript HTTP trigger function processed a request.');
    const { fields, files, outputDir } = await getFormPartsRedux(req);

    console.log('Output Directory: ', outputDir);
    const repliconExpenser = createRepliconExpenser(console);
    await repliconExpenser.createRepliconExpenseReport({
      ...fields,
      receiptsPath: outputDir,
    });

    res.send({
      status: 200,
      body: { message: "Upload complete" },
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (err) {
    console.log('Error Occurred...', err);
    res.send({
      status: 500,
      body: { message: "Error Occurred", error: err },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    throw err;
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
