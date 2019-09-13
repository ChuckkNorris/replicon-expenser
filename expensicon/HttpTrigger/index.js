const multer = require("multer");

const createExpenseReport = async (context, correlationId, expenseReportPayload) => {
  setTimeout(() => context.log('This is happening later'), 7000);
}

const getProgressStatus = async (correlationid) => {

}

const upload = multer({
  dest: "/receipts-temp"
})

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log(context);
    context.log(req);

    upload.array('receiptFiles')(req, context.res, (nextStuff, next2) => {
      console.log(nextStuff, next2)
    });

    if (req.path === '/create-expense-report') {
      const correlationId = '1234';
      // Create expense report asynchronously
      createExpenseReport(context, correlationId, req.body);
      context.res = {
        status: 200,
        correlationId
      };
    } else if (req.path === '/get-progress-status') {
      const currStatus = await getProgressStatus(req.query.correlationId);
      context.res = {
        ...currStatus
      };
    }

    // if (req.query.name || (req.body && req.body.name)) {
    //     context.res = {
    //         // status: 200, /* Defaults to 200 */
    //         body: "Hello " + (req.query.name || req.body.name)
    //     };
    // }
    // else {
    //     context.res = {
    //         status: 400,
    //         body: "Please pass a name on the query string or in the request body"
    //     };
    // }
};