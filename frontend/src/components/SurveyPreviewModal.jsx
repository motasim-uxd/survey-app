// SurveyPreviewModal.jsx
import React from "react";

export default function SurveyPreviewModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  workTypes
}) {
  if (!isOpen) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Survey Preview</h2>

        <p><strong>Shop:</strong> {formData.shopName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>Remarks:</strong> {formData.remarks}</p>

        {workTypes.map((wt) => (
          <div key={wt.type} style={{ marginTop: 10 }}>
            <h4>{wt.type}</h4>

            {wt.dimensions.length === 0 && <p>No entries</p>}

            {wt.dimensions.map((d, i) => (
              <div key={i} style={{ marginLeft: 10 }}>
                <p>Height: {d.height} | Width: {d.width}</p>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {d.images.map((img, idx) => {
                    // Case 1: freshly selected image (File object)
                    if (img instanceof File) {
                      return (
                        <img
                          key={idx}
                          src={URL.createObjectURL(img)}
                          alt="preview"
                          width={70}
                          height={70}
                          style={{ objectFit: "cover", borderRadius: 4 }}
                        />
                      );
                    }

                    // Case 2: image already saved (string filename)
                    if (typeof img === "string") {
                      return (
                        <img
                          key={idx}
                          src={`http://localhost:5000/uploads/${img}`}
                          alt="uploaded"
                          width={70}
                          height={70}
                          style={{ objectFit: "cover", borderRadius: 4 }}
                        />
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}

        <div style={{ marginTop: 20, textAlign: "right" }}>
          <button onClick={onClose}>Edit</button>
          <button onClick={onSubmit} style={{ marginLeft: 10 }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "#999",
  padding: 20,
  maxWidth: 600,
  width: "95%",
  maxHeight: "90vh",
  overflowY: "auto"
};
