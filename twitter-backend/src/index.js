import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 8000;
import connectDB from './db/db.js';
import app from './app.js';

// mongodb
connectDB()
.then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
  console.log('MongoDB Connected in index.js')
})
.catch((err) => {
  console.log(err);
})

