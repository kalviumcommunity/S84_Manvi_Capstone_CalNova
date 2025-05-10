const express=require('express');
const app = express();

const port = 8000;

const appointmentRoutes = require('./routes/appointment');

app.use(express.json());

app.use('/api',appointmentRoutes);

app.listen(port,()=>{
    console.log(`server running at port http://localhost:${port}`);
})