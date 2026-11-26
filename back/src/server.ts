import app from "./app.js";
import { config } from "./core/config.js"

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});