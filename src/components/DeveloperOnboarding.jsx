import React, { useEffect, useState } from "react";
import NavbarForDevelopers from "./NavbarForDevelopers";
import axios from "axios";
import MultiSelectForSkills from "./MultiSelectForSkills";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import MultiSelect from "./MultiSelect";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};
const getSkills = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/onboarding/skills");
    return data;
  } catch (error) {
    console.log("error:", error);
  }
};
function DeveloperOnboarding() {
  const [skills, setskills] = useState([]);
  const [selectedSkills, setselectedSkills] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [developerSkills, setdeveloperSkills] = useState([]);
  const [developerTechStack, setdeveloperTechStack] = useState([]);
  const [professionalExperience, setprofessionalExperience] = useState({
    companyName: "",
    techStack: developerTechStack,
    skillsUsed: developerSkills
  });
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    getSkills()
      .then((items) => {
        setskills(items);
      })
      .catch((error) => console.log(error));
  }, []);
  const submitForProfessionalExperience = () => {
    // setprofessionalExperience((item)=>[...item,{companyName:}])
  };
  return (
    <div>
      <NavbarForDevelopers />
      <div className="w-[80%] mx-auto bg-blue-300 p-8 mt-8 rounded-md shadow-2xl flex gap-10">
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Onboarding Form</h2>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-600 font-medium mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-600 font-medium mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-600 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4 text-black">
            <label
              htmlFor="skills"
              className="block text-gray-600 font-medium mb-2"
            >
              Skills
            </label>
            <MultiSelectForSkills
              props={skills}
              setselectedSkills={setselectedSkills}
              selectedSkills={selectedSkills}
            />
          </div>
        </div>
        <div className="border border-black w-1/2">
          <p className="block text-gray-700 font-medium mb-2">
            Professional Experience
          </p>
          <div className="flex flex-col items-center">
            <button
              onClick={toggleSidebar}
              className="bg-black hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-700 w-[80%]"
            >
              Add Professional Experience
            </button>
            {isSidebarOpen && (
              <div className="fixed inset-0 z-0 flex items-center justify-center">
                <div className="w-80 bg-white rounded-xl p-4 transform transition-transform translate-x-0">
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-gray-600 font-medium mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="companyName"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>{" "}
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-gray-600 font-medium mb-2"
                    >
                      Tech Stack
                    </label>
                    <MultiSelect
                      props={[]}
                      developerSkills={developerTechStack}
                      setdeveloperSkills={setdeveloperTechStack}
                    />
                  </div>{" "}
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-gray-600 font-medium mb-2"
                    >
                      Skills Used
                    </label>
                    <MultiSelect
                      props={[]}
                      developerSkills={developerSkills}
                      setdeveloperSkills={setdeveloperSkills}
                    />

                    <div className="flex justify-center items-center w-full mt-4 border">
                      <button
                        onClick={submitForProfessionalExperience}
                        type="submit"
                        className="w-[60%] bg-gray-800 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none mx-auto"
                      >
                        Submit
                      </button>
                      <button
                        onClick={toggleSidebar}
                        className="text-white bg-gray-800 p-2 rounded-md  mx-auto"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center w-full  justify-center mt-4">
        <button
          type="submit"
          className="w-[20%] bg-gray-800 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default DeveloperOnboarding;
