const express = require("express")
const { exec } = require('child_process');
const app = express()
const PORT = 5000;
const cors = require('cors');
const multer = require('multer');
const { uploadFile } = require("./functions/storage");
const { createAttestation } = require("./functions/contract");
const { metadataGenerator } = require("./functions/metadata");

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hello World!"
    })
})

app.post('/upload', upload.single('file'), (req, res) => {
    const { claimGenerator, description, address } = req.body;
    // console.log(metadata);
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    let metadata = metadataGenerator(claimGenerator, req.file.mimetype, req.file.originalname, description);
    // console.log(metadata)
    metadata = JSON.stringify(metadata)
    exec(`c2patool "uploads/${req.file.filename}" -c '${metadata}' -o "uploads/signed-${req.file.filename}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.json({
                success: false,
                message: 'Error signing file',
                error
            })
        }
        uploadFile(__dirname + `/uploads/signed-${req.file.filename}`).then((response) => {
            console.log(JSON.parse(metadata))
            console.log('Label: ', JSON.parse(metadata).title);
            console.log('Application: ', JSON.parse(metadata).claim_generator);
            createAttestation(
                address,
                response.data.Hash,
                JSON.parse(metadata).claim_generator,
                JSON.parse(metadata).title,
            ).then((hash) => {
                res.json({
                    success: true,
                    message: 'File uploaded successfully and signed!',
                    filename: req.file.filename,
                    fileHash: response.data.Hash,
                    transactionHash: hash
                })
            }).catch((err) => {
                res.json({
                    success: false,
                    message: 'Error signing file',
                    error: err
                })
            })
        })
    })
});

app.post('/verify', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    exec(`c2patool "uploads/${req.file.filename}"`, (error, stdout, stderr) => {
        if (error) {
            res.json({
                success: false,
                message: 'Error verifying file',
            })
        }
        res.json({
            success: true,
            message: 'File verified successfully',
            data: JSON.parse(stdout)
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})