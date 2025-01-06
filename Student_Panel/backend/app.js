const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
  })
);

//Adding the userRoute

//for login and signup
const authRoute = require("./routes/auth");
app.use("/api/auth", authRoute);

//for all tests
const testRoutes = require("./routes/test");
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Server!!! ");
});

module.exports = app;

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.json());

// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,POST,PUT,DELETE,PATCH",
//     credentials: true,
//   })
// );

// // For login and signup and user completion status
// const authRoute = require("./routes/auth");
// app.use("/api/auth", authRoute);

// // For all tests
// const testRoutes = require("./routes/test");
// app.use('/api/test', testRoutes);

// app.get('/', (req, res) => {
//     res.send("Hello from Server!!!");
// });

// module.exports = app;
