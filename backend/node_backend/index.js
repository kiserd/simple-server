// express init
const express = require('express');
const app = express();
app.set('port', 5000);

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to google sheet
const sheetConnector = require('./sheetconn.js');

app.get('/all', async (req, res) => {
    const doc = await sheetConnector.getDoc();
    const sheet = doc.sheetsByTitle['data'];
    const rows = await sheet.getRows();
    const records = [];
    rows.forEach((row) => records.push({"name": row.name, "done": row.done}))
    // console.log('records: ', records);
    res.send(records);
});

// used in development
app.get('/init_sheet', async (req, res) => {
    await sheetConnector.initSheet();
});

app.post('/data', async (req, res) => {
    // define some convenient helper variables
    const doc = await sheetConnector.getDoc();
    const sheet = doc.sheetsByTitle['data'];
    const rows = await sheet.getRows();
    const key = Object.keys(req.body)[0];
    const value = req.body.key;
    // test for UPDATE (existence of key)
    for (const row of rows) {
        if (row.name === key) {
            row.value = value;
            await row.save();
            res.send('special response');
        }
    }
    // handle CREATE (key does not exist)
    if (Object.keys(req.body).length == 1) {
        rowValues = {
            'name': key,
            'done': value,
        };
        const result = sheet.addRow(rowValues);
        res.send(result);
    }
});

app.delete('/data/:id', async (req, res) => {
    const doc = await sheetConnector.getDoc();
    const sheet = doc.sheetsByTitle['data'];
    const rows = await sheet.getRows();
    console.log('rows: ', rows);
    console.log('req.params: ', req.params);
    for (const row of rows) {
        if (row.name == req.params.id) {
            row.delete();
            res.send({description: "OK"});
        }
    }
});

app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:` + app.get('port') + `; press ctrl-c to terminate.`);
});