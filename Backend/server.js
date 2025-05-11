const express=require('express');
const app = express();

const PORT =process.env.PORT || 8000;

const appointmentRoutes = require('./routes/appointment');

app.use(express.json());

app.use('/api',appointmentRoutes);

app.listen(PORT,()=>{
    console.log(`server running at port http://localhost:${PORT}`);
})