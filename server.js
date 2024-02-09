const express = require('express');
const connectDB = require('./config/db');
const app = express();
connectDB();
app.get('/', (req, res) => res.send('API Running'));

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/api/auth.api'));
app.use('/api/role', require('./routes/api/roles.api'));
app.use('/api/employees', require('./routes/api/employees.api'));
app.use('/api/announcement', require('./routes/api/announcement.api'));
app.use('/api/attendance', require('./routes/api/attendance.api'));
app.use('/api/leave', require('./routes/api/leave.api'));
app.use('/api/timesheet', require('./routes/api/timesheet.api'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
