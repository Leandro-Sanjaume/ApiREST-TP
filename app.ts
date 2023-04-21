import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import routes from "./routes/routes"
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./swagger";  
import { myDB } from "./db"


const app: Express = express()
const port = 1234;

app.use(express.json()); 
app.use(cors())
app.use(routes)
app.use("/documentation",swaggerUi.serve, swaggerUi.setup(swaggerSetup));


myDB.initDB()
    .then(() => 
        app.listen(port, () => 
            console.log(`Escuchando en el puerto ${port}!`)
        )
    )
    .catch(error => {
        throw error
      })

