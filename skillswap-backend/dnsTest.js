const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.hcum51h.mongodb.net",
  (err, addresses) => {
    console.log(err);
    console.log(addresses);
  }
);