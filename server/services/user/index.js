require("dotenv").config();

const { USER_NAME, USER_HOST, USER_PORT } = process.env;

const User = require("./User");

const user = new User(USER_NAME, USER_HOST, USER_PORT);

user.connectToAppListManager();

let tryConnect = setInterval(() => {
  connectToService.bind(user)("reservation");
}, 1000);

async function connectToService(name) {
  try {
    let isServiceConnected = false;
    const service = await this.connectToApp(
      name,
      () => {
        isServiceConnected = true;
        console.log(`${name} service connect`);
      },
      () => {},
      () => {
        isServiceConnected = false;
        console.log(`${name} service end`);
      },
      () => {
        isServiceConnected = false;
        console.log(`${name} service error`);
      }
    );

    setInterval(() => {
      if (!isServiceConnected) {
        console.log(`try connect to ${name}`);
        service.connect();
      }
    }, 2000);

    clearInterval(tryConnect);
  } catch (e) {
    console.log(e);
  }
}
