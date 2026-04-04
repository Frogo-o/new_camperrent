require("./load-env");
process.env.NODE_ENV = "production";
require("./.next/standalone/server.js");
