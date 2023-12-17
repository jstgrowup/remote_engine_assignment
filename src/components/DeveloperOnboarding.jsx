import React, { useEffect, useState } from "react";
import NavbarForDevelopers from "./NavbarForDevelopers";
import axios from "axios";
import MultiSelectForSkills from "./MultiSelectForSkills";
import MultiSelect from "./MultiSelect";
import Cookies from "js-cookie";

const getSkills = async () => {
  try {
    const { data } = await axios.get(
      "https://remote-engine-backend.vercel.app/onboarding/skills"
    );
    return data;
  } catch (error) {
    console.log("error:", error);
  }
};
const setOnboardingData = async (data) => {
  try {
    const result = await axios.post(
      "https://remote-engine-backend.vercel.app/onboarding/developers",
      data,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};
function DeveloperOnboarding() {
  const [onboardingForm, setonboardingForm] = useState({});
  const [skills, setskills] = useState([]);
  const [selectedSkills, setselectedSkills] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarOpenForEducation, setIsSidebarOpenForEducation] =
    useState(false);

  const [companyName, setcompanyName] = useState("");
  const [developerSkills, setdeveloperSkills] = useState([]);
  const [developerTechStack, setdeveloperTechStack] = useState([]);
  const [allProfessionalExperience, setAllprofessionalExperience] = useState(
    []
  );
  const [allEducationalExperience, setAllEducationalExperience] = useState([]);
  const [professionalExperience, setprofessionalExperience] = useState({
    companyName: "",
    techStack: developerTechStack,
    skillsUsed: developerSkills,
  });
  const [education, seteducation] = useState({
    degreeName: "",
    schoolName: "",
  });
  const [form, setform] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    skills: [],
  });

  const handleChangeForBasicDetails = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    seteducation({ ...education, [name]: value });
  };

  const toggleSidebarForProfessional = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleSidebarForEducation = () => {
    setIsSidebarOpenForEducation(!isSidebarOpenForEducation);
  };
  useEffect(() => {
    getSkills()
      .then((items) => {
        setskills(items);
      })
      .catch((error) => console.log(error));
  }, [allProfessionalExperience, allEducationalExperience]);
  const submitForProfessionalExperience = () => {
    setprofessionalExperience((item) => ({
      ...item,
      companyName: companyName,
      techStack: developerTechStack,
      skillsUsed: developerSkills,
    }));

    setAllprofessionalExperience((items) => [...items, professionalExperience]);
    setIsSidebarOpen(!isSidebarOpen);
  };
  const submitForEducationalExperience = () => {
    setAllEducationalExperience((items) => [...items, education]);
    setIsSidebarOpenForEducation(!isSidebarOpenForEducation);
  };
  const submitForOnboarding = async () => {
    setform((items) => ({ ...items, skills: selectedSkills }));
    setonboardingForm({
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: Number(form.phoneNumber),
      email: form.email,
      skills: selectedSkills,
      professionalExperience: allProfessionalExperience,
      educationalExperience: allEducationalExperience,
    });
    const result = await setOnboardingData(onboardingForm);

    if (result?.status == 200) {
      alert(result.data.message);
      window.location.reload();
    } else {
      alert(result.response.data.data);
    }
  };

  return (
    <div>
      <NavbarForDevelopers />
      <div className="w-[90%] mx-auto bg-blue-300 p-8 mt-8 rounded-md shadow-2xl flex gap-10">
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Onboarding Form</h2>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-600 font-medium mb-2"
            >
              First Name
            </label>
            <input
              onChange={handleChangeForBasicDetails}
              type="text"
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
              onChange={handleChangeForBasicDetails}
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
              onChange={handleChangeForBasicDetails}
              type="tel"
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
              onChange={handleChangeForBasicDetails}
              type="email"
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
        <div className=" w-1/3">
          <p className="block text-black font-medium mb-2">
            Professional Experience
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="w-[70%] flex flex-col gap-3 ">
              {allProfessionalExperience.length > 1
                ? allProfessionalExperience.map((items, index) => {
                    return (
                      <div
                        className="flex justify-around bg-blue-900 w-full p-3 text-white rounded-xl"
                        key={index}
                      >
                        <p>
                          <span>Company Name</span>
                        </p>
                        <p>{items.companyName}</p>
                      </div>
                    );
                  })
                : null}
            </div>
            <button
              onClick={toggleSidebarForProfessional}
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
                      value={companyName}
                      onChange={(e) => setcompanyName(e.target.value)}
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
                        onClick={toggleSidebarForProfessional}
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
        <div className="w-1/3">
          <p className="block text-black font-medium mb-2">
            Educational Experience
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="w-[90%] flex flex-col gap-3 ">
              {allEducationalExperience.length > 1
                ? allEducationalExperience.map((items, index) => {
                    return (
                      <div
                        className="flex justify-around bg-blue-900 w-full p-2 text-white rounded-xl"
                        key={index}
                      >
                        <div className="flex flex-col items-center">
                          <p>School Name</p>
                          <p>{items.schoolName}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <p>Degree Name</p>
                          <p>{items.degreeName}</p>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
            <button
              onClick={toggleSidebarForEducation}
              className="bg-black hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-700 w-[80%]"
            >
              Add Educational Experience
            </button>
            {isSidebarOpenForEducation && (
              <div className="fixed inset-0 z-0 flex items-center justify-center">
                <div className="w-80 bg-white rounded-xl p-4 transform transition-transform translate-x-0">
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-gray-600 font-medium mb-2"
                    >
                      Degree Name
                    </label>
                    <input
                      type="text"
                      name="degreeName"
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>{" "}
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-gray-600 font-medium mb-2"
                    >
                      School Name
                    </label>
                    <input
                      type="text"
                      name="schoolName"
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>{" "}
                  <div className="mb-4">
                    <div className="flex justify-center items-center w-full mt-4 border">
                      <button
                        onClick={submitForEducationalExperience}
                        type="submit"
                        className="w-[60%] bg-gray-800 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none mx-auto"
                      >
                        Submit
                      </button>
                      <button
                        onClick={toggleSidebarForEducation}
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
          onClick={submitForOnboarding}
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
