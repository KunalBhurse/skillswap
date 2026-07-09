const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://kunalbhurseacc_db_user:vNmeluAdujQpz5lS@cluster0.hcum51h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected!");
    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });