const express = require('express');
const router = express.Router();
const Employee = require('../../dbModels/EmployeeDB');
const authMiddleware = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

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
            check('email', 'Email is required').notEmpty(),

            check('designation', 'Designation is required').notEmpty(),
            check('skills', 'Skills is required').notEmpty(),
        ],
    ],
    async (req, res) => {
        try {
            // Checking the validation results
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Generating the uniq ID for employee
            const empID = uuidv4();

            //Checking if the employee exists

            const { email } = req.body;
            const oldEmp = await Employee.findOne({
                email: { $regex: new RegExp(email, 'i') },
            });
            if (oldEmp) {
                return res.status(409).json({
                    errors: [
                        {
                            msg: 'Employee already exists, please update if you like',
                        },
                    ],
                });
            }

            const {
                name,
                status,
                details,
                company,
                location,
                designation,
                skills,
                experience,
                education,
                attendance,
            } = req.body;

            const empFields = {
                name,
                status: status || 'current',
                details,
                company: company || 'Insnpsys',
                location,
                designation,
                skills: skills.split(','),
                experience,
                education,
                attendance,
            };
            const newEmployee = new Employee(empFields);
            const employee = await newEmployee.save();
            res.json(employee);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

//====================================================================================================

// @route   GET api/employees
// @desc    Get all employees
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
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

//====================================================================================================

// @route   GET api/employees/:id
// @desc    Get employee by ID
// @access  Private
router.get('/get/:id', authMiddleware, async (req, res) => {
    try {
        console.log('Received Params:', req.params);

        const employee = await Employee.findOne({ _id: req.params.id });

        console.log('Received Employee ID:', req.params.id);

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        console.log('Employee data:', employee);

        res.json(employee);
    } catch (error) {
        console.error(error.message);

        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.status(500).send('Server error');
    }
});

//====================================================================================================
// @route   PUT api/employee/:id
// @desc    Update employee by ID
// @access  Private
router.put('/edit/:id', authMiddleware, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Emoployee not found' });
        }
        res.status(500).send('Server error');
    }
});
//====================================================================================================
// @route   DELETE api/employee/:id
// @desc    Delete employee by ID
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
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
