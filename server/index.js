const express = require("express")
const { exec } = require('child_process');
const app = express()
const PORT = 3000;
const multer = require('multer');

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


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hello World!"
    })
})

app.post('/upload', upload.single('file'), (req, res) => {
    const { metadata } = req.body;
    // console.log(metadata);
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    exec(`c2patool uploads/${req.file.filename} -c '${JSON.stringify(JSON.parse(metadata))}' -o uploads/signed-${req.file.filename}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        res.json({
            success: true,
            message: 'File uploaded successfully and signed!',
            filename: req.file.filename,
        })
    })
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})