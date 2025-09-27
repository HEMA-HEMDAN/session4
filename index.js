require("dotenv").config();
const express = require("express");
const productsRouter = require("./routes/products-routes");
const usersRouter = require("./routes/users-routes");
const cors = require("cors");
const path = require("path");
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

mongoose
  .connect(url)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ msg: "يلا ياد من هنا هات عنوان api عدل" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
