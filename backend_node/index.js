// express init
const express = require('express');
const app = express();
app.set('port', 5000);

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');

// connect to google sheet
const sheetConnector = require('./sheetconn.js');

// serve files for react app
app.use(express.static(path.resolve(__dirname, '../frontend_react/build')));

// used in development
app.get('/init_sheet', async (req, res, next) => {
    try {
        await sheetConnector.initSheet();
        res.status(200).send('worksheet created');
    }
    catch (err) {
        next(err);
    }
});

app.get('/all', async (req, res, next) => {
    try {
        const rows = await sheetConnector.readRows();
        const payload = {};
        rows.forEach((row) => payload[row.name] = row.status);
        res.status(200).send(payload);
    }
    catch(err) {
        err.type = 'READ';
        next(err);
    }
});

app.post('/data', async (req, res, next) => {
    try {
        // define some convenient helper variables
        const doc = await sheetConnector.getDoc();
        const sheet = doc.sheetsByTitle['tasks'];
        const rows = await sheet.getRows();
        const key = Object.keys(req.body)[0];
        const value = req.body[key];
        // test for UPDATE (existence of key)
        let updateFlag = false;
        for (const row of rows) {
            if (row.name === key) {
                row.status = value;
                await row.save();
                updateFlag = true;
                res.status(200).send("OK");
            }
        }
        // handle CREATE (key does not exist)
        if (!updateFlag) {
            rowValues = {
                'name': key,
                'status': value,
            };
            sheet.addRow(rowValues);
            res.status(200).send("OK");
        }
    }
    catch (err) {
        err.type = 'CREATE / UPDATE';
        next(err);
    }
});

app.delete('/data/:id', async (req, res) => {
    const rows = await sheetConnector.readRows();
    let deleteFlag = false;
    for (const row of rows) {
        if (row.name == req.params.id) {
            row.delete();
            deleteFlag = true;
            res.send({description: "OK"});
        }
    }
    // handle case where key not found
    if (!deleteFlag) {
        res.status(404).send("key not found");
    }
});

// catch-all for routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend_react/build', 'index.html'));
})

app.use((err, req, res, next) => {
    res.status(500).send(err);
});

app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:` + app.get('port') + `; press ctrl-c to terminate.`);
});