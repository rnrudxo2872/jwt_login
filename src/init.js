import "dotenv/config"
import app from "./server"

app.listen(4000,() => console.log("Server start"))