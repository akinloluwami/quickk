const Sequelize = require("sequelize");

// create connection to database
const sequelize = new Sequelize(
  'mysql://gn5ifvu36eqt:pscale_pw_1WmX1fcJko2GMDUvLZNSvwfkL3XMbmLb_-PlzrxMx1E@m8xpyiekwgm1.us-east-2.psdb.cloud/quickk?ssl={"rejectUnauthorized":true}'
);

// check connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PlanetScale! 🚀");
  })
  .catch((err) => {
    console.error("Unable to connect to PlanetScale:" + err);
  });

module.exports = sequelize;

/*database: quickk
username: gn5ifvu36eqt
host: m8xpyiekwgm1.us-east-2.psdb.cloud
password: pscale_pw_1WmX1fcJko2GMDUvLZNSvwfkL3XMbmLb_-PlzrxMx1E
*/
