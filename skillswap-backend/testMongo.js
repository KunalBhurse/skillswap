const dns = require("dns");

// Force Google DNS
dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://kunalbhurseacc_db_user:vNmeluAdujQpz5lS@cluster0.hcum51h.mongodb.net/skillswap?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Connected");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
  });