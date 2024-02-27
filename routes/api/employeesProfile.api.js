const express = require('express');
const router = express.Router();
const Employee = require('../../dbModels/ProfileDB');
const EmployeeUserDB = require('../../dbModels/UserDB');
const authMiddleware = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
// const { v4: uuidv4 } = require('uuid');

// @route   POST api/employees
// @desc    Create a new employee
// @access  Private

router.post(
    '/add-emp',
    [
        authMiddleware,
        [
            check('firstName', 'First name is required').notEmpty(),
            check('lastName', 'Last name is required').notEmpty(),
            check('phone', 'Please enter valid phone number').isLength({
                min: 10,
            }),
            check(
                'emailAddress',
                'Email is required (Personal email)'
            ).notEmpty(),
            check('skills', 'Skills is required').notEmpty(),
            check('gender', 'Gender is required').notEmpty(),
            check('education.*.school', 'School is required').notEmpty(),
            check('education.*.degree', 'Degree is required').notEmpty(),
            check(
                'education.*.fieldofstudy',
                'Field of Study is required'
            ).notEmpty(),
            check('education.*.from', 'Starting date is required').notEmpty(),
            check('position', 'Position is required').notEmpty(),
            check('salary', 'Salary is required').notEmpty(),
            check('isAdmin', 'Please select if employee is admin').notEmpty(),
            check('dob', 'Date of birth is required').notEmpty(),
        ],
    ],
    async (req, res) => {
        try {
            if (req.roles !== 'admin') {
                return res.status(403).json({
                    message: 'Access denied, admin privileges required',
                });
            }
            // Checking the validation results
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Generating the uniq ID for employee
            // const empID = uuidv4();

            //Checking if the employee exists

            const {
                firstName,
                lastName,
                phone,
                emailAddress,
                skills,
                gender,
                education,
                experience,
                position,
                status,
                salary,
                dob,
                attendance,
            } = req.body;
            const oldEmp = await Employee.findOne({
                emailAddress: emailAddress,
            });
            // console.log(64, email, oldEmp.emailAddress);
            if (oldEmp && oldEmp._id) {
                console.log(oldEmp);
                return res.status(409).json({
                    errors: [
                        {
                            msg: 'Employee already exists, please update if you like',
                        },
                    ],
                });
            }

            const empFields = {
                firstName,
                lastName,
                phone,
                emailAddress,
                skills: skills.split(','),
                gender,
                education,
                experience,
                position,
                status: status || 'Trainee',
                salary,

                dob,
                attendance,
            };
            const newEmployee = new Employee(empFields);
            const employee = await newEmployee.save();
            // Create the EmployeeUser document and establish the relationship
            const employeeUserFields = {
                email: req.body.emailAddress,
                password: req.body.password,
                roles: req.roles,
                employee: employee._id, // Reference the newly created Employee
            };

            const newEmployeeUser = new EmployeeUserDB(employeeUserFields);
            await newEmployeeUser.save();

            res.json({ employee, employeeUser: newEmployeeUser });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

//==================================================================================================================================================================================================

// @route   GET api/employees
// @desc    Get all employees list
// @access  Public
router.get('/get-list', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const config = { pageSize: 10 };
    try {
        const totalEmp = await Employee.countDocuments();
        const totalPage = Math.ceil(totalEmp / config.pageSize);

        if (page < 1 || page > totalPage) {
            return res.status(400).json({ msg: 'Invalid page number' });
        }

        const skip = (page - 1) * config.pageSize;

        const employees = await Employee.find()
            .skip(skip)
            .limit(config.pageSize);
        if (!employees || employees.length === 0) {
            return res.status(404).json({ msg: 'No profiles found' });
        }
        res.json(employees);
    } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//==================================================================================================================================================================================================

// @route   GET api/employees/:id
// @desc    Get employee by ID
// @access  Private
router.get('/get/:id', async (req, res) => {
    try {
        // console.log('Received Params:', req.params);

        const employee = await Employee.findOne({ _id: req.params.id });

        // console.log('Received Employee ID:', req.params.id);

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        console.error(error.message);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.status(500).send('Server error');
    }
});

//==================================================================================================================================================================================================
// @route   PUT api/employee/:id
// @desc    Update employee by ID
// @access  Private (Admin Only)
router.put('/edit/:id', authMiddleware, async (req, res) => {
    try {
        // Check if the user has admin privileges
        if (req.roles !== 'admin') {
            return res.status(403).json({
                message: 'Access denied, admin privileges required',
            });
        }

        // Validate req.body (optional but recommended)
        // Example: Validate that at least one field is being updated
        if (Object.keys(req.body).length === 0) {
            return res
                .status(400)
                .json({ msg: 'No fields provided for update' });
        }

        // Update the employee
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // Check if the employee exists
        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        // Respond with the updated employee
        res.json(employee);
    } catch (error) {
        console.error(error.message);
        // Handle the case where the provided ID is not valid
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        // Handle other server errors
        res.status(500).send('Server error');
    }
});

//==================================================================================================================================================================================================
// @route   DELETE api/employee/:id
// @desc    Delete employee by ID
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        if (req.roles !== 'admin') {
            return res.status(403).json({
                message: 'Access denied, admin privileges required',
            });
        }
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;

//==================================================================================================================================================================================================

router.post('/profiles', async (req, res) => {
    try {
        const profile = new Employee(req.body);
        await profile.save();
        res.status(201).send(profile);
    } catch (error) {
        res.status(400).send(error);
    }
});
