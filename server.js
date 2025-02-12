import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './Routes/user.js';
dotenv.config();
const app = express();  
const PORT = process.env.PORT ;
mongoose.connect(process.env.MONGO_URI,
    {
        dbName: "userReferral",
    }
)
.then(console.log("Db connected"))
.catch((error) => console.log("Error: ", error));

app.use(express.json());
app.use('/user', UserRoutes);

app.listen(3000, () => {console.log(`Server is running on http://localhost${PORT}:`)});