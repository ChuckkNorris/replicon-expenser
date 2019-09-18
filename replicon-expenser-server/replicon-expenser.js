const puppeteer = require("puppeteer");
const path = require("path");
// const fsp = require("fs").promises;
const fs = require("fs");
const helpers = require("./page.helpers");
const process = require("process");
const moment = require("moment");
const slash = require("slash");

const TEMP_DESCRIPTION = "Test Description CHANGE";
const TEMP_PROJECT = "Training";

const createRepliconExpenser = (context) => {

  const loginToReplicon = async (page, email, password) => {
    const myAppsUrl = "https://myapps.microsoft.com";
    context.log(`Navigating to '${myAppsUrl}'`);
    await page.goToAndWaitNetwork(myAppsUrl);
    context.log(`Setting email to: ${email}`);
    await page.setValue("[name=loginfmt]", email);
    context.log(`Clicking submit and waiting for password`);
    await page.clickAndWaitSelector(
      "[type=submit]",
      "#aadTile, input.form-control[type=password]"
    );
    context.log(`Checking for AD type page...`);
    const multipleAccountsText = await page.getInnerText("#aadTile");
    if (multipleAccountsText) {
      context.log("Selecting Organization Active Directory type...");
      await page.clickAndWaitSelector("#aadTile", "[type=password]");
    }
    context.log(`Setting password...`);
    await page.setValue("[type=password]", password);
    context.log(`Submitting password...`);
    await page.clickAndWaitNetwork("[type=submit]");
    context.log(`Checking for 'Stay signed in' page`);
    const staySignedInText = await page.getInnerText("#KmsiDescription");
    context.log("Stay signed in text... ", staySignedInText);
    if (
      staySignedInText &&
      staySignedInText.indexOf("times you are asked to sign in.") >= 0
    ) {
      context.log("Choosing not to stay signed in...");
      await page.clickAndWaitSelector("#idBtn_Back", "[title=Replicon]");
    }
    // await page.click("[title=Replicon]");
  };

  const uploadReceiptImage = async (page, rowId, receiptPath) => {
    await page.clickAndWaitSelector(
      `[onclick="expGUI.openReceiptUploadWindow('/a/expense/ExpenseReceiptUpload.aspx?id=${rowId}&tempId=-1&expenseId=');"]`,
      'iframe[title="Upload Expense Receipt"]'
    );
    context.log("Upload Expense iFrame is up");
    const iframeHandle = await page.$('iframe[title="Upload Expense Receipt"]');
    const frame = helpers.setPuppetPage(await iframeHandle.contentFrame());
    context.log(`Waiting for upload file button...`);
    await frame.waitForSelector("#uploadFile");
    context.log("Waiting for File Chooser");
    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      frame.click("#uploadFile")
    ]);
    context.log(`Uploading receipt image for row '${rowId}' from path: '${receiptPath}'`);
    await fileChooser.accept([receiptPath]);
    context.log(`Uploading and waiting for close button...`);
    await frame.clickAndWaitSelector("#button_Upload", "#button_Close");
    try {
      context.log(`Closing upload iFrame...`);
      await frame.click("#button_Close");
    } catch (err) {
      // iframe closes which throws error
    }
  };

  const clickDetailButton = async (page, rowId) => {
    // let duplicateButton = document.querySelector(`a[onclick="expGUI.duplicateExpenseLine('n0')"`);
    context.log(`Clicking detail button for row: '${rowId}'`);
    const duplicateLink = await page.$(
      `a[onclick="expGUI.duplicateExpenseLine('${rowId}')"`
    );
    const detailButton = await page.evaluateHandle(
      el => el.previousElementSibling.previousElementSibling,
      duplicateLink
    );
    await detailButton.click();
    context.log(`Waiting for detail button`)
    await page.waitForSelector(`#advanced_infofield_2_${rowId}`);
  };

  const addExpense = async (page, receipt, rowId) => {
    // const rowId = `n${index}`;
    // Set Date
    await page.focus(`#date_${rowId}`);
    // await page.keyboard.type("\n");
    await page.waitFor(1000);
    await page.setValue(`#date_${rowId}`, receipt.date);
    // Set Amount
    await page.setValue(`#amount_${rowId}`, receipt.amount);
    await page.waitFor(1000);
    await page.keyboard.type("\n");
    // Upload Receipt
    await uploadReceiptImage(page, rowId, receipt.path);
    // Open Details Panel
    await clickDetailButton(page, rowId);
    // Set Expense Type, 15 = Travel
    await page.select(`[name="advanced_expenseType_"`, receipt.expenseType);
    // Set Place
    await page.setValue(`#advanced_infofield_2_${rowId}`, receipt.place);
    // Set Purpose
    await page.setValue(`#advanced_infofield_3_${rowId}`, receipt.purpose);
    // Submit Receipt Details
    const okayBtn = 'input[type=button][value="OK"]';
    await page.focus(okayBtn);
    await page.click(okayBtn);
  };

  const expenseTypes = {
    meal: "20",
    travel: "22",
    training: "12"
  };

  const getExpenseType = expenseName => {
    const expenseNameLower = expenseName.toLowerCase();
    const expenseType = expenseTypes[expenseNameLower];
    return expenseType ? expenseType : "20"; // client meal by default
  };

  const cleanPath = absolutePath => {
    let fullPath = absolutePath;
    if (absolutePath[1] === ":") {
      return slash(absolutePath.substring(2));
    }
    return fullPath;
  };

  const getReceipts = async (directoryPath) => {
    const files = fs.readdirSync(directoryPath);
    let receipts = [];
    for (fileName of files) {
      context.log(fileName);
      const fullPath = cleanPath(path.resolve(directoryPath, fileName));
      const split = fileName.split("_");
      const amountStr = split[4];
      const date = moment(split[0]).format("MMM D, YYYY");
      const amountWithExt =
        amountStr[0] === "$" ? amountStr.substring(1) : amountStr;
      const amount = amountWithExt.substring(0, amountWithExt.lastIndexOf("."));
      receipts.push({
        path: fullPath,
        date,
        expenseType: getExpenseType(split[1]),
        purpose: split[2],
        place: split[3],
        amount: amount
      });
    }
    return receipts;
  };

  const setClientAndProject = async (client, project) => {
    await page.clickAndWaitSelector(
      "#searchDDLabel_expenseProject_n0",
      '[aria-label="Type to Search"]'
    );
    await page.waitFor(1000);
  
    const clientProjects = await page.$$("a[value]");
    let clientFound = false;
    for (const cp of clientProjects) {
      const cpText = await (await cp.getProperty("innerText")).jsonValue();
      const parentDiv = await (await (await (await (await cp.getProperty(
        "parentElement"
      )).getProperty("parentElement")).getProperty("parentElement")).getProperty(
        "className"
      )).jsonValue();
      if (
        (!clientFound &&
          cpText.indexOf(client) >= 0 &&
          parentDiv === "listArea activeArea overthrow") ||
        (clientFound &&
          cpText.indexOf(project) >= 0 &&
          parentDiv === "subListArea overthrow")
      ) {
        if (!clientFound) clientFound = true;
        const cpHTML = await (await cp.getProperty("outerHTML")).jsonValue();
        const cpValue = cpHTML.substring(
          cpHTML.indexOf("value") + 7,
          cpHTML.indexOf(">") - 1
        );
        await page.clickAndWaitSelector(`[value='${cpValue}']`, "#date_n0");
      }
    }
  }

  const createNewExpenseReport = async (page, receipts, description, client, project) => {
    context.log(`Creating new expense report...`);
    // Dismiss date incorrect dialog
    page.on('dialog', async dialog => {
      const message = dialog.message();
      context.log(`Dialog opened with message: ${message}`);
      if (message.indexOf('date of the expense')) {
        context.log("It's a date error dialog... ignore if date is inside project date");
      } else {
        throw message;
      }
      await dialog.dismiss();
    });

    // Click Expense Report Tab
    context.log(`Clicking expense report tab...`);
    await page.clickAndWaitSelector(
      'a[href="/Credera/my/expenses/"]',
      "#addNewExpenseButton"
    );
    // Create New Expense Report
    context.log(`Adding new expense report...`);
    // Navigating to New Expense page and waiting for first row
    await page.clickAndWaitSelector("#addNewExpenseButton", "#date_n0");
    // Settings description, client, and project

    context.log(`Setting description to '${description}'`);
    await page.setValue("#expenseDescription", description);
    await setClientAndProject(client, project)
    // context.log(`Clicking project input...`);
    // await page.clickAndWaitSelector(
    //   "#searchDDLabel_expenseProject_n0",
    //   '[aria-label="Type to Search"]'
    // );
    // context.log(`Setting project to: '${project}'`);
    // await page.setValue('[aria-label="Type to Search"]', project);
    // await page.waitFor(1000);
    // await page.keyboard.type("\n");
    // await page.keyboard.type("\n");
    for (const [index, receipt] of receipts.entries()) {
      const rowId = `n${index}`;
      const dateRowSel = `#date_${rowId}`;
      const rowExists = (await page.$(dateRowSel)) ? true : false;
      if (!rowExists) {
        context.log(`Adding new expense rows`);
        await page.clickAndWaitSelector(`button[title="Add"]`, dateRowSel);
      }
      await addExpense(page, receipt, rowId);
    }
    context.log(`Saving expense report...`);
    await page.click(`button[title="Save"]`);
  };

  const onTabCreatedAsync = async (browser, page, receipts, description, client, project) => {
    return new Promise(async (resolve, reject) => {
      browser.on("targetcreated", async function() {
        context.log("Tab Created - Tab Count: ", (await browser.pages()).length);
        const allTabs = await browser.pages();
        const nextTab = allTabs[allTabs.length - 1];
        const repliconPage = helpers.setPuppetPage(nextTab);
        repliconPage.waitFor(500);
        context.log(`Waiting for Replicon Expenses link...`);
        await repliconPage.waitForSelector('a[href="/Credera/my/expenses/"]');
        context.log(`Creating new expense report...`);
        context.log({receipts, description, project});
        await createNewExpenseReport(repliconPage, receipts, description, client, project);
        await page.waitFor(500);
        await browser.close();
        resolve();
      });
      await page.click("[title=Replicon]");
    });
  }

  const fileExpenseReport = async (
    receipts,
    email,
    password,
    description,
    client,
    project
  ) => {
    context.log(`Creating puppet page...`);
    const { page, browser } = await helpers.createPuppetPage();
    context.log(`Logging into Replicon...`);
    await loginToReplicon(page, email, password);
    context.log(`Waiting for Replicon tab to be created...`);
    await onTabCreatedAsync(browser, page, receipts, description, client, project);
  };

  const createRepliconExpenseReport = async (expenseDetails) => {
    const {
      email,
      password,
      receiptsPath,
      description,
      client,
      project
    } = expenseDetails;
    context.log('Getting Receipts from : ', receiptsPath);
    const receipts = await getReceipts(receiptsPath);
    context.log(`Filing expense report...`)
    await fileExpenseReport(receipts, email, password, description, client, project);
  }
  return {
    createRepliconExpenseReport
  };
}

module.exports = {
  createRepliconExpenser
}
