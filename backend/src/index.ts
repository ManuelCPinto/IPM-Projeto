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
      try {
        const users = await connection.getRepository(User).find(); // Fetch all users

        // Print the names of users to the console
        users.forEach(user => {
          console.log(`User: ${user.name}`);
        });

        // Send the users as a JSON response
        res.json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
      }
    });

    // Endpoint to add a new user
    app.post('/users', async (req, res) => {
      try {
        const user = await connection.getRepository(User).create(req.body);
        const results = await connection.getRepository(User).save(user);
        res.send(results);
      } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error saving user' });
      }
    });

    app.listen(5001, () => {
      console.log('🚀 Server is running on port 5001');
    });
  })
  .catch(error => {
    console.error('❌ Error connecting to the database:', error);
  });
