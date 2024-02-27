import React, { useState } from 'react';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        skills: [],
        gender: '',
        education: [],
        experience: [],
        position: '',
        salary: '',
        dob: '',
        status: 'Trainee',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEducation = [...profileData.education];
        updatedEducation[index][name] = value;
        setProfileData((prevState) => ({
            ...prevState,
            education: updatedEducation,
        }));
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperience = [...profileData.experience];
        updatedExperience[index][name] = value;
        setProfileData((prevState) => ({
            ...prevState,
            experience: updatedExperience,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(profileData);
        setProfileData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            skills: [],
            gender: '',
            education: [],
            experience: [],
            position: '',
            salary: '',
            dob: '',
            status: 'Trainee',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
            />
            <input
                type="text"
                name="skills"
                value={profileData.skills}
                onChange={handleChange}
                placeholder="Skills"
                required
            />
            <select
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                required
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <input
                type="text"
                name="position"
                value={profileData.position}
                onChange={handleChange}
                placeholder="Position"
                required
            />
            <input
                type="number"
                name="salary"
                value={profileData.salary}
                onChange={handleChange}
                placeholder="Salary"
                required
            />
            <input
                type="date"
                name="dob"
                value={profileData.dob}
                onChange={handleChange}
                placeholder="Date of Birth"
                required
            />
            <select
                name="status"
                value={profileData.status}
                onChange={handleChange}
                required
            >
                <option value="Trainee">Trainee</option>
                <option value="Regular-Employee">Regular Employee</option>
                <option value="Terminated">Terminated</option>
                <option value="Absconded">Absconded</option>
            </select>
            {/* Education Fields */}
            {profileData.education.map((edu, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="school"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, e)}
                        placeholder="School"
                        required
                    />
                    <input
                        type="text"
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, e)}
                        placeholder="Degree"
                        required
                    />
                    {/* Add more fields as needed */}
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    setProfileData((prevState) => ({
                        ...prevState,
                        education: [...prevState.education, {}],
                    }))
                }
            >
                Add Education
            </button>
            {/* Experience Fields */}
            {profileData.experience.map((exp, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="title"
                        value={exp.title}
                        onChange={(e) => handleExperienceChange(index, e)}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, e)}
                        placeholder="Company"
                    />
                    {/* Add more fields as needed */}
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    setProfileData((prevState) => ({
                        ...prevState,
                        experience: [...prevState.experience, {}],
                    }))
                }
            >
                Add Experience
            </button>
            <button type="submit">Save Profile</button>
        </form>
    );
};

export default Profile;
