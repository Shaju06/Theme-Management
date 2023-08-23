import express  from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser';
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import setApplicationHeaderOptions from './middleware/setApplicationHeaderOption.js';
import dbConnection from './dbConnection.js';
import { verifyToken } from './middleware/authMiddleware.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const PORT = process.env.PORT || 5000; 
app.use(bodyParser.json());
app.use(dbConnection)
setApplicationHeaderOptions(app)

// // API routes
app.post('/api/login', async (req, res) => {

    const {userName, password } = req.body
    
    try {
      const userCollection = req.collection; 
      
        const user = await userCollection.findOne({ userName: userName });

        console.log(user, req.body)
       
        if (!user) {
          return res.status(401).send({ message: 'Invalid user/password'});
        }
    
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return res.status(401).send({messgae: 'Invalid user/password'});
        }

        var token = jwt.sign(req.body, 'shhhhh');
    
        res.status(200).send({message: 'Login successful.', token, primaryColor: user.primaryColor});
      } catch (error) {
        console.log(error)
        res.status(500).send('Error logging in.');
      }
});

app.patch('/api/update',verifyToken, async (req, res) => {
  
  const {primaryColor} = req.body
  const userCollection = req.collection
  const {userName} = req.user

  console.log(req.body)

  try {
    
    const updatedUser = await userCollection.findOneAndUpdate({userName}, { $set: {primaryColor} }, { new: true });
  
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({message: 'Data updated', primaryColor: updatedUser.value.primaryColor});
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { userName, password, primaryColor } = req.body;
    const userCollection = req.collection
    const salt = 10

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    await userCollection.insertOne({ userName, password: hashedPassword, primaryColor: primaryColor });

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'An error occurred.' });
  }
});

app.get('/hello',(req, res)=> {
  res.send('Hello')
})


// All other routes should serve the React app
if(process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
