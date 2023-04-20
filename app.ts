import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import routes from "./routes/routes"
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./swagger";  
import { myDB } from "./db"


const app: Express = express()
const port = 1234;

const PORT: string | number = process.env.PORT || 4000

app.use(express.json()); 
//app.use(cors())
app.use(routes)
app.use("/documentation",swaggerUi.serve, swaggerUi.setup(swaggerSetup));

// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`


myDB.initDB()
    .then(() => 
        app.listen(port, () => 
            console.log(`Escuchando en el puerto ${port}!`)
        )
    )
    .catch(error => {
        throw error
      })

