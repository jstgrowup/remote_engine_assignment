import React from "react";
import { Autocomplete, TextField } from "@mui/material";

function MultiSelect({ props, developerSkills, setdeveloperSkills }) {
  const handleSelectChange = (event, newValue) => {
    console.log('event:', event)
    console.log("newValue:", newValue);
    setdeveloperSkills(newValue);
  };

  return (
    <>
      <Autocomplete
        multiple
        options={props ? props?.map((option) => option) : []}
        value={developerSkills}
        style={{ border: "black" }}
        onChange={handleSelectChange}
        filterSelectedOptions
        freeSolo
        renderInput={(params) => <TextField {...params} label={"Select"} />}
      />
    </>
  );
}

export default MultiSelect;
