const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// REGISTER AUTH ROUTES
app.use('/api/auth', require('./routes/authRoutes'));

// REGISTER CATEGORY ROUTES (if present)
app.use('/api/categories', require('./routes/categoryRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
