import React, { useState } from "react";
import axios from "axios";
import WorkTypeSection from "./WorkTypeSection";
import SurveyPreviewModal from "./SurveyPreviewModal";

const workTypesList = ["Signboard", "Wall Rack", "Desk", "Vinyl"];

export default function SurveyForm() {
  const [formData, setFormData] = useState({
    shopName: "",
    email: "",
    address: "",
    remarks: ""
  });

  const [workTypes, setWorkTypes] = useState(
    workTypesList.map((type) => ({ type, dimensions: [] }))
  );

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  /* -------------------- handlers -------------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const resetForm = () => {
    setFormData({
      shopName: "",
      email: "",
      address: "",
      remarks: ""
    });

    setWorkTypes(
      workTypesList.map((type) => ({ type, dimensions: [] }))
    );
  };

  const handleFinalSubmit = async () => {
    setIsPreviewOpen(false);
    const fd = new FormData();

    const payload = {
      ...formData,
      workTypes: workTypes.map((wt) => ({
        ...wt,
        dimensions: wt.dimensions.map((d) => ({
          height: d.height,
          width: d.width,
          imagesCount: d.images.length
        }))
      }))
    };

    fd.append("data", JSON.stringify(payload));

    workTypes.forEach((wt) =>
      wt.dimensions.forEach((d) =>
        d.images.forEach((img) => fd.append("images", img))
      )
    );

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/surveys`,
        {
          ...formData,
          workTypes
        }
      );

      /*await axios.post("http://localhost:5000/api/surveys", fd);
      alert("Survey submitted successfully");

      setFormData({ shopName: "", email: "", address: "", remarks: "" });
      setWorkTypes(workTypesList.map((t) => ({ type: t, dimensions: [] })));*/
      console.log("API URL:", import.meta.env.VITE_API_URL);

    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };



  /* -------------------- UI -------------------- */

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Shop Name</label><br />
          <input
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label><br />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Address</label><br />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Remarks</label><br />
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>

        {workTypes.map((wt, idx) => (
          <WorkTypeSection
            key={wt.type}
            workType={wt}
            updateWorkType={(updated) => {
              const updatedWorkTypes = [...workTypes];
              updatedWorkTypes[idx] = updated;
              setWorkTypes(updatedWorkTypes);
            }}
          />
        ))}

        <button type="button" onClick={handlePreview}>
          Preview
        </button>
      </form>

      <SurveyPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onSubmit={handleFinalSubmit}
        formData={formData}
        workTypes={workTypes}
      />
    </>
  );
}
