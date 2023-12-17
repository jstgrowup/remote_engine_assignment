import React, { useEffect, useState } from "react";
import NavbarForClients from "./NavbarForClients";
import axios from "axios";
import Cookies from "js-cookie";
const getAllDevelopersData = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(
      "https://remote-engine-backend.vercel.app/client/onboarding",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("error:", error);
  }
};
function ClientOnboarding() {
  const [developers, setdevelopers] = useState([]);
  useEffect(() => {
    getAllDevelopersData()
      .then((items) => setdevelopers(items))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <NavbarForClients />
      <div className=" p-8 bg-white ">
        <h1 className="text-2xl font-semibold mb-3">Developers</h1>
        <div className="w-full flex-col gap-10">
          {developers?.length > 0 ? (
            developers?.map(
              ({
                _id,
                onboarding: { firstName, lastName, phoneNumber, skills, email },
              }) => {
                return (
                  <div
                    className="bg-gray-200 p-4 rounded-md shadow-md flex items-center justify-between my-4"
                    key={_id}
                  >
                    <h2 className="text-lg font-semibold">
                      <span>{firstName}</span>

                      <span>{lastName}</span>
                    </h2>
                    <h2 className="text-lg font-semibold">
                      {" "}
                      <span>Contact Number :</span> {phoneNumber}
                    </h2>
                    <h2 className="text-lg font-semibold">
                      {" "}
                      {skills.join(" , ")}
                    </h2>
                    <h2 className="text-lg font-semibold">{email}</h2>

                    <div className="flex items-center">
                      <div className="flex flex-row items-center">
                        <button className="bg-blue-500 py-2 px-4 rounded-lg text-white text-xl ml-4">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div>
              <h1>no Developers yet</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientOnboarding;
