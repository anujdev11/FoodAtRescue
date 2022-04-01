const express = require("express");
const cors = require("cors");
const userRoute = require("./src/routes/userRoute");
const db = require("./src/models");
const passport = require("passport");
const path = require("path");
const fs = require("fs");
const AWS = require('aws-sdk');
const { DYNAMO_REGION, DYNAMO_KEY, DYNAMO_SECRET_KEY } = require('./src/config/index');
var corsOptions = {
  origin: ["http://localhost:3000"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
db.sequelize.sync();
app.use(passport.initialize());
app.use("/src/images", express.static(path.join(__dirname, "src/images")));

require("./src/middleware/passport")(passport);
//Routes

app.use("/api/users", userRoute);

// app.use((req, res, next) => {
//   res.status(404).send({
//     status: 404,
//     error: "Please Enter Correct Route, Current Route Not found",
//   });
// });

AWS.config.update({
  region: DYNAMO_REGION,
  accessKeyId: DYNAMO_KEY,
  secretAccessKey: DYNAMO_SECRET_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'food';

console.log(dynamoClient);

// db.sequelize.sync().then(() => {
//   const listener = app.listen(process.env.PORT || 8080, () => {
//     console.log("Your app is listening on port " + listener.address().port);
//   });
// });
