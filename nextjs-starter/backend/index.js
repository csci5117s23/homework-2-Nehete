/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, number} from 'yup';
import jwtDecode from 'jwt-decode';

const TodosYup = object({
  title: string().required(),
  done: boolean().required().default(false),
  createdOn: date().default(() => new Date()),
})

const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  } 
}
app.use(userAuth)

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/dev', (req, res) => {
  res.send('CRUD server ready')
})

// Use Crudlify to create a REST API for any collection
crudlify(app, {todos: TodosYup})

// bind to serverless runtime
export default app.init();
