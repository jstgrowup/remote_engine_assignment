import React from "react";
import { Autocomplete, TextField } from "@mui/material";

export function MultiSelectForDevelopers({
  props,
  developerSkills,
  setdeveloperSkills,
}) {
  const handleSelectChange = (event, newValue) => {
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
