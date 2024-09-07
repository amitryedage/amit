const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8080;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the project root
app.use(express.static(path.join(__dirname)));

// Serve the patients data
app.get('/patients', (req, res) => {
    fs.readFile(path.join(__dirname, 'patients.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
