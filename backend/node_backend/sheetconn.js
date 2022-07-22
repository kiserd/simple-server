require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const docId = '14VRZ9csDP02oSim0Yl1PgWdM_COTqoTtSAc3K0bW1B4';

const initSheet = async () => {
    // init doc
    const doc = new GoogleSpreadsheet(docId);
    // init auth
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    // build props object to init new sheet
    props = {
        headerValues: ['name', 'done'],
        title: 'data',
    };
    // make new sheet
    doc.loadInfo();
    doc.addSheet(props);
}

const getDoc = async () => {
    // init doc
    const doc = new GoogleSpreadsheet(docId);
    // init auth
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    // load doc properties and worksheets
    await doc.loadInfo();

    return doc
}

module.exports.getDoc = getDoc;
module.exports.initSheet = initSheet;
