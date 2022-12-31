import { Routes, Route } from "react-router-dom";
import OptionsListing from "./options-listing";
import NewOption from "./new-option";
import EditOption from "./edit-option-modal";

const Options = () => {
  return (
    <Routes>
      <Route path="/" element={<OptionsListing />} />
      <Route path=":optionId" element={<EditOption />} />
      <Route path="/new" element={<NewOption />} />
    </Routes>
  );
};

export default Options;
