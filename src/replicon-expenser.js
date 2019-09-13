const puppeteer = require("puppeteer");
const path = require("path");
const fsp = require("fs").promises;
const helpers = require("./page.helpers");
const process = require("process");
const moment = require("moment");
const slash = require("slash");

const TEMP_DESCRIPTION = "Test Description CHANGE";
const TEMP_PROJECT = "Training";

const loginToReplicon = async (page, email, password) => {
  const myAppsUrl = "https://myapps.microsoft.com";
  await page.goToAndWaitNetwork("https://myapps.microsoft.com");
  await page.setValue("[name=loginfmt]", email);
  await page.clickAndWaitSelector(
    "[type=submit]",
    "#aadTile, input.form-control[type=password]"
  );
  const multipleAccountsText = await page.getInnerText("#aadTile");
  if (multipleAccountsText) {
    console.log("Selecting Organization Active Directory type...");
    await page.clickAndWaitSelector("#aadTile", "[type=password]");
  }
  await page.setValue("[type=password]", password);
  await page.clickAndWaitNetwork("[type=submit]");
  const staySignedInText = await page.getInnerText("#KmsiDescription");
  console.log("Stay signed in text... ", staySignedInText);
  if (
    staySignedInText &&
    staySignedInText.indexOf("times you are asked to sign in.") >= 0
  ) {
    console.log("Choosing not to stay signed in...");
    await page.clickAndWaitSelector("#idBtn_Back", "[title=Replicon]");
  }
  await page.click("[title=Replicon]");
};

const uploadReceiptImage = async (page, rowId, receiptPath) => {
  await page.clickAndWaitSelector(
    `[onclick="expGUI.openReceiptUploadWindow('/a/expense/ExpenseReceiptUpload.aspx?id=${rowId}&tempId=-1&expenseId=');"]`,
    'iframe[title="Upload Expense Receipt"]'
  );
  console.log("Upload Expense iFrame is up");
  const iframeHandle = await page.$('iframe[title="Upload Expense Receipt"]');
  const frame = helpers.setPuppetPage(await iframeHandle.contentFrame());
  await frame.waitForSelector("#uploadFile");
  console.log("Waiting for File Chooser");
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    frame.click("#uploadFile")
  ]);
  console.log("Uploading receipt image");
  await fileChooser.accept([receiptPath]);
  await frame.clickAndWaitSelector("#button_Upload", "#button_Close");
  try {
    await frame.click("#button_Close");
  } catch (err) {
    // iframe closes which throws error
  }
};

const clickDetailButton = async (page, rowId) => {
  // let duplicateButton = document.querySelector(`a[onclick="expGUI.duplicateExpenseLine('n0')"`);
  const duplicateLink = await page.$(
    `a[onclick="expGUI.duplicateExpenseLine('${rowId}')"`
  );
  const detailButton = await page.evaluateHandle(
    el => el.previousElementSibling.previousElementSibling,
    duplicateLink
  );
  await detailButton.click();
  await page.waitForSelector(`#advanced_infofield_2_${rowId}`);
};

const addExpense = async (page, receipt, rowId) => {
  // const rowId = `n${index}`;
  // Set Date
  await page.focus(`#date_${rowId}`);
  await page.keyboard.type("\n");
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

const getReceipts = async directoryPath => {
  const files = await fsp.readdir(directoryPath);
  let receipts = [];

  for (fileName of files) {
    console.log(fileName);
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

const createNewExpenseReport = async (page, receipts, description, project) => {
  // Click Expense Report Tab
  await page.clickAndWaitSelector(
    'a[href="/Credera/my/expenses/"]',
    "#addNewExpenseButton"
  );
  // Create New Expense Report
  await page.clickAndWaitSelector("#addNewExpenseButton", "#date_n0");
  await page.setValue("#expenseDescription", description);
  await page.clickAndWaitSelector(
    "#searchDDLabel_expenseProject_n0",
    '[aria-label="Type to Search"]'
  );
  await page.setValue('[aria-label="Type to Search"]', project);
  await page.waitFor(1000);
  await page.keyboard.type("\n");
  await page.keyboard.type("\n");
  for (const [index, receipt] of receipts.entries()) {
    const rowId = `n${index}`;
    const dateRowSel = `#date_${rowId}`;
    const rowExists = (await page.$(dateRowSel)) ? true : false;
    if (!rowExists) {
      await page.clickAndWaitSelector(`button[title="Add"]`, dateRowSel);
    }
    await addExpense(page, receipt, rowId);
  }
  await page.click(`button[title="Save"]`);
};

const fileExpenseReport = async (
  receipts,
  email,
  password,
  description,
  project
) => {
  const { page, browser } = await helpers.createPuppetPage();
  browser.on("targetcreated", async function() {
    console.log("Tab Count: ", (await browser.pages()).length);
    const allTabs = await browser.pages();
    const nextTab = allTabs[allTabs.length - 1];
    const repliconPage = helpers.setPuppetPage(nextTab);
    repliconPage.waitFor(500);
    await repliconPage.waitForSelector('a[href="/Credera/my/expenses/"]');
    await createNewExpenseReport(repliconPage, receipts, description, project);
    await page.waitFor(500);
    await browser.close();
  });

  await loginToReplicon(page, email, password);
};

const main = async () => {
  const [
    a,
    b,
    email,
    password,
    receiptsPath,
    description,
    project
  ] = process.argv;
  // Name receipts as: '2019-09-05_Travel_Lunch_Chipotle_$23.65.png'
  const receipts = await getReceipts(receiptsPath);
  await fileExpenseReport(receipts, email, password, description, project);
};
main();
