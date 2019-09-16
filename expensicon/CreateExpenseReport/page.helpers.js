const puppeteer = require("puppeteer");
const _ = require("lodash");

const setPuppetPage = page => {
  const click = selector => {
    return page.evaluate(selector => {
      console.log(`Clicking: ${selector}`);
      const elementToClick = document.querySelector(selector);
      console.log("Element to click: ", elementToClick);
      if (elementToClick) {
        elementToClick.click();
      }
    }, selector);
  };

  const clickAndWaitNetwork = (clickSelector, waitUntil = "networkidle0") => {
    console.log(`Clicking on selector: ${clickSelector}...`);
    return Promise.all([
      click(clickSelector),
      page.waitForNavigation({ waitUntil })
    ]);
  };

  const clickAndWaitSelector = (clickSelector, waitSelector) => {
    console.log(`Clicking on selector: ${clickSelector}`);
    console.log(`Waiting for element: ${waitSelector}...`);
    return Promise.all([
      click(clickSelector),
      page.waitForSelector(waitSelector)
    ]);
  };

  const goToAndWaitNetwork = (pageUrl, waitUntil = "networkidle0") => {
    console.log(`Navigating to: ${pageUrl}`);
    return page.goto(pageUrl, { waitUntil });
  };

  const goToAndWaitSelector = (pageUrl, waitSelector) => {
    console.log(`Navigating to: ${pageUrl}`);
    console.log(`Waiting for element: ${waitSelector}...`);
    return Promise.all([
      page.goto(pageUrl),
      page.waitForSelector(waitSelector)
    ]);
  };

  const setValue = async (selector, value) => {
    await page.evaluate(selector => {
      document.querySelector(selector).select();
    }, selector);
    await page.keyboard.type(value);
    await page.waitFor(300);
  };

  const getInnerText = selector => {
    return page.evaluate(selector => {
      const element = document.querySelector(selector);
      return element ? element.innerText : element;
    }, selector);
  };

  const delay = milliseconds => {
    return new Promise(function(resolve) {
      setTimeout(resolve, time);
    });
  };

  const getOptions = selector => {
    //page.get
  };

  return _.merge(page, {
    // target: page,
    click,
    clickAndWaitNetwork,
    clickAndWaitSelector,
    goToAndWaitNetwork,
    goToAndWaitSelector,
    setValue,
    getInnerText,
    delay
  });
};

const createPuppetPage = async (headless = true) => {
  console.log("Opening browser...");
  const browser = await puppeteer.launch({ headless });
  console.log("Opening new page...");
  const tabs = await browser.pages();
  if (tabs.length > 0) {
    return { page: setPuppetPage(tabs[0]), browser: browser };
  } else {
    return { page: setPuppetPage(await browser.newPage()), browser: browser };
  }
};

module.exports = {
  createPuppetPage,
  setPuppetPage
};
