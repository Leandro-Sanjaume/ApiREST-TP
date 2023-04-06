import { Case } from './case';
import express from 'express';
import { Virus } from './virus';
import { json } from 'body-parser';
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./swagger";

const app: express.Application = express();

const port = 1234;

app.use(express.json()); 

app.use("/documentation",swaggerUi.serve, swaggerUi.setup(swaggerSetup));

let virusCases: Array<Case> = new Array <Case>;


  app.get('/', (req , res) => res.send('Bienvenido a mi API REST!'));

  app.get("/infection", (req,res) => {
    if(virusCases.length != 0) {
      res.json(virusCases);
    }else {
      res.sendStatus(404);
    }    
  });

  app.get("/infection/:id", (req,res) => {
    let virusInstance = virusCases.find(item => {
        return item.id == Number(req.params.id);
    });
    if(virusInstance) {
        res.json(virusInstance);
    }else {
        res.sendStatus(404);
    }
  });
  

  app.post("/infection", (req,res) => {
    const obj = new Case(req.body);
    virusCases.push(obj);
    res.json(obj);   
  });
  

  app.delete("/infection/:id", (req,res) => {
    const del = virusCases.find(item => {
        return item.id == Number(req.params.id);
    });
    if (del != undefined) {
      virusCases.splice(virusCases.indexOf(del));
      res.sendStatus(204);
    }else {
      res.sendStatus(404);
    }
  });


app.put("/infection/:id", (req,res) => {
  const pu = virusCases.find(item => {
    return item.id == Number(req.params.id);
  });
  if (pu != undefined) {
    pu.caseVirus = Virus.fromJson(JSON.stringify(req.body.caseVirus));
    pu.caseDate = req.body.caseDate;
    pu.age = req.body.age;
    pu.gender = req.body.gender;
    pu.location = req.body.location;
    pu.subjectState = req.body.subjectState;
    res.json(pu);   
  }else {
    res.send(404);
  }
});


app.patch("/infection/:id", (req,res) => {
  const pa = virusCases.find(item => {
    return item.id == Number(req.params.id)
  });
  if (pa != undefined) {
    pa.caseVirus.sciName = req.body.sciName;
    pa.caseVirus.virusType = req.body.virusType;
    pa.caseVirus.hasVaccine = req.body.hasVaccine;
    res.json(pa); 
  }else {
    res.send(404);
  }
});


// 1) TODOS LOS CASOS CON DETERMINADO VIRUS

app.get("/infection/virus/:name", (req,res) => {
  let aux: Array<Case> = new Array <Case>;
  virusCases.forEach(element => {
    if(element.caseVirus.sciName == req.params.name){
      aux.push(element);
    };
  });
  if(aux.length == 0) {
    res.send(404);
  }
  res.json(aux);
});



// 2) TODOS LOS CASOS CON PACIENTES DE DETERMINADA EDAD
app.get("/infection/case/:age", (req,res) => {
  let aux2: Array<Case> = new Array <Case>;
  virusCases.forEach(element => {
    if(element.age == Number(req.params.age)) {
      aux2.push(element);
    }
  }); 
  if(aux2.length == 0) {
    res.send(404);
  }
  res.json(aux2);
});


// 3) SI UN VIRUS TIENE VACUNA
  app.get("/infection/virus/vaccine/:name", (req,res) => {
    let virusVacccine = virusCases.find(item => {
      return item.caseVirus.sciName == req.params.name;
    });
    if(virusVacccine == undefined) {
      res.send(404);
    }else if(virusVacccine?.caseVirus.hasVaccine) {
        res.send("El virus " + virusVacccine?.caseVirus.sciName + " tiene vacuna");
    }else if(!virusVacccine?.caseVirus.hasVaccine) {
      res.send("El virus " + virusVacccine?.caseVirus.sciName + " NO tiene vacuna");
    }
  });


app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));

