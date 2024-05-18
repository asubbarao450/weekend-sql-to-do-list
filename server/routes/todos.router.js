const express = require('express')
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos" ORDER BY "id";';

    //to maintain the order added by use order by id 

    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
      .catch(error => {
        console.log('error getting books', error);
        res.sendStatus(500);
      });
  });



  router.post('/', (req, res) => {
    let todo = req.body;
    
    let queryText = `INSERT INTO "todos" ("text", "isComplete")
                     VALUES ($1, $2);`;

    //post pool uses the query [todo.text and todo.isComplete defined in the same array]
    pool.query(queryText, [todo.text, todo.isComplete])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new book`, error);
        res.sendStatus(500);
      });
  });
  


  router.put('/:id', (req, res) => {

    //****** adding to router /isRead breaks functionality *******
    let todoid = req.params.id
    //not sure if I should change direction 
    //isRead refers to the body as the isRead is in the data part of put request
    let isComplete = req.body.isComplete
  
    let queryText = ''
  
   
  
    queryText = `
            UPDATE "todos" SET "isComplete"= NOT "isComplete"
            WHERE "id"= $1;
        `
  
  
  

    //put will have [todoid] in Array
    pool.query(queryText, [todoid])
      .then((result) => {
        res.sendStatus(204)
      })
      .catch((err) => {
        console.log(`Error making query.. '${queryText}'`, err)
        res.sendStatus(500)
      })
  })
  


  router.delete('/:id', (req, res) => {
    //:id passes in the id of the item to delete from url 
    
  
    //$1 is an example of parameterization 
    let queryText = `
        DELETE FROM "todos" WHERE "id" = $1;
    `
  
    //reqId will equal [req.params.id]
    let reqId = [req.params.id]
  
    pool.query(queryText, reqId)
      .then((result) => {
        
        res.sendStatus(200)
      })
      .catch((err) => {
        console.log(`Error making query.. '${queryText}'`, err)
        res.sendStatus(500)
      })
  });

module.exports = router;
