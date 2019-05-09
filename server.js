const express = require('express');
const connectDB = require('./config/db')
const app = express();


connectDB();

app.get('/', (req , res) => res.send('Running...'));

app.use('/api/auth', require('./routes/api/auth'));


const PORT =process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));