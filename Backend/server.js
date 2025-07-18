const express=require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/authentication');
const serviceRoutes = require('./routes/service');
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

dotenv.config();
app.use(express.json());
const PORT =process.env.PORT || 8000;

const appointmentRoutes = require('./routes/appointment');

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected...!!');
    app.listen(PORT,()=>{
    console.log(`server running at port http://localhost:${PORT}`);
   });
})
.catch((err) => console.log('MongoDB connection error',err));

app.use('/api/appointment',appointmentRoutes);
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/services',serviceRoutes);

app.get('/', (req, res) => {
    res.send('API is running.');
});


