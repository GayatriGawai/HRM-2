import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../Navigation/sidebar';
import moment from 'moment';
import AddEducation from './AddEducation';
const ViewProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('jwtSecret');

                // make sure you always use the await in case of the promises
                const response = await axios.get(
                    `http://localhost:5000/api/profile/getProfile/${id}`,
                    { headers: { 'x-auth-token': token } }
                );

                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Unable to fetch the profile', error);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <i className="fa fa-spinner fa-spin text-5xl text-yellow-400"></i>
            </div>
        );
    }

  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-5 gap-4">
        <div className="md:col-span-1 md:row-span-5">
          <div className="flex">
            <Sidebar />
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="bg-yellow-200 text-black p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Profile Details</h2>
            <div>
              <div>
                <p>
                  <span className="font-bold">First Name:</span>{" "}
                  {profile.firstName}
                </p>
                <p>
                  <span className="font-bold">Last Name:</span>{" "}
                  {profile.lastName}
                </p>
                <p>
                  <span className="font-bold">Role:</span> {profile.role.name}
                </p>
                <p>
                  <span className="font-bold">Phone:</span> {profile.phone}
                </p>
                <p>
                  <span className="font-bold">Email :</span>{" "}
                  {profile.emailAddress}
                </p>

                <div>
                  <h3 className="font-bold">Skills</h3>
                  <ul>
                    {profile.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <p>
                  <span className="font-bold">Gender:</span> {profile.gender}
                </p>
              </div>
              <div>
                <h3 className="font-bold">Education</h3>
                {profile.education.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <p>
                      <span className="font-bold">University:</span>{" "}
                      {edu.university}
                    </p>
                    <p>
                      <span className="font-bold">Degree:</span> {edu.degree}
                    </p>
                    <p>
                      <span className="font-bold">Field Of Study:</span> {edu.fieldofstudy}
                    </p>
                    <p>
                      <span className="font-bold">from:</span> {edu.from}
                    </p>
                    <p>
                      <span className="font-bold">to:</span> {edu.to}
                    </p>
                   
                    <p>
                      <span className="font-bold">Description:</span> {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewProfile;
