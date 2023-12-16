import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";


function MultiSelectForSkills({ props, setselectedSkills, selectedSkills }) {
  const handleSelectChange = (event, newValue) => {
    setselectedSkills(newValue);
  };

  return (
    <>
      <Autocomplete
        multiple
        options={props ? props?.map((option) => option) : []}
        value={selectedSkills}
        style={{ border: "black" }}
        onChange={handleSelectChange}
        filterSelectedOptions
        freeSolo
        renderInput={(params) => <TextField {...params} label={"Select"} />}
      />
    </>
  );
}

export default MultiSelectForSkills;
