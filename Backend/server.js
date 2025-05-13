const express=require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const userRoutes = require('./routes/user');

dotenv.config();
app.use(express.json());

const appointmentRoutes = require('./routes/appointment');
const PORT =process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected...!!');
    app.listen(PORT,()=>{
    console.log(`server running at port http://localhost:${PORT}`);
   });
})
.catch((err) => console.log('MongoDB connection error',err));

app.use('/api',appointmentRoutes);
app.use('/api/users',userRoutes);

app.get('/', (req, res) => {
    res.send('API is running.');
});


