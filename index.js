require("dotenv").config();
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.set;
  await page.goto("https://www.wodboard.com/login", {
    waitUntil: "networkidle0",
  });
  await page.type("#user_session_email", process.env.USERNAME);
  await page.type("#user_session_password", process.env.PASSWORD);
  await page.click('input[type="submit"]');

  // Go to timetable calendar
  await page.goto("https://www.wodboard.com/calendars/10", {
    waitUntil: "networkidle0",
  });

  //   Go to month view
  const [monthButton] = await page.$x("//button[contains(., 'month')]");

  await (() => {
    monthButton.click();
    console.log("now in month view");
  })();

  await (() => {
  const monthDetail = await page.evaluate(() => document.querySelector('.fc-toolbar .fc-center h2').textContent);
    console.log("monthDetail", monthDetail)
  })();
  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  // booking date
  const classDate = "04/12/2021";
  const classDateObject = new Date(classDate);
  const classDateMonth = monthNames[classDateObject.getMonth()];

  const currentMonthPageShown = "hello";

  // console.log(classDateMonth)

  // @todo
  // Once on month view
  // Check if on correct year
  // Check month on current page
  // If it is the correct month then find right day
  // Then book the class
  // Then email confirmation

  //   await browser.close();
})();
