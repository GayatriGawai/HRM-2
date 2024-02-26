const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
connectDB();

// Enabled CORS for all routes
// Enabled CORS for specific origins
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => res.send('API Running'));

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/api/auth.api'));
app.use('/api/profile', require('./routes/api/employeesProfile.api'));
app.use('/api/announcement', require('./routes/api/announcement.api'));
app.use('/api/attendance', require('./routes/api/attendance.api'));
app.use('/api/leave', require('./routes/api/leave.api'));
app.use('/api/timesheet', require('./routes/api/timesheet.api'));
app.use('/api/module', require('./routes/api/module.api'));
app.use('/api/roles', require('./routes/api/roles.api'));
app.use('/api/permission', require('./routes/api/permissions.api'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
