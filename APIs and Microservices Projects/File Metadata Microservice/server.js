var express = require("express");
var cors = require("cors");
var multer = require("multer");

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function (req, res) {
  res.json({ greetings: "Hello, API" });
});

const upload = multer({ dest: "Files/" });

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (req.file) {
    console.log(req.file);
    res.send({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  } else {
    res.send({ error: "Error uploading file!" });
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Node.js listening ...");
});
