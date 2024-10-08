import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { User } from './entity/User';

const app = express();
app.use(express.json());

createConnection()
  .then(async connection => {
    console.log('✅ Database connection established.');

    // Endpoint to get all users
    app.get('/users', async (req, res) => {
      const users = await connection.getRepository(User).find();
      res.json(users);
    });

    // Endpoint to add a new user
    app.post('/users', async (req, res) => {
      const user = await connection.getRepository(User).create(req.body);
      const results = await connection.getRepository(User).save(user);
      res.send(results);
    });

    app.listen(5000, () => {
      console.log('🚀 Server is running on port 5000');
    });
  })
  .catch(error => {
    console.error('❌ Error connecting to the database:', error);
  });

