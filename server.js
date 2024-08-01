import { app } from "./index.js";
import { ConnectToDB } from "./public/config/db.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
  ConnectToDB();
});
