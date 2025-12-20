import React from "react";

export default function WorkTypeSection({ workType, updateWorkType }) {
  const addRow = () => {
    updateWorkType({
      ...workType,
      dimensions: [
        ...workType.dimensions,
        { height: "", width: "", images: [] }
      ]
    });
  };

  const updateRow = (index, field, value) => {
    const updated = [...workType.dimensions];
    updated[index][field] = value;

    updateWorkType({
      ...workType,
      dimensions: updated
    });
  };

  const handleImages = (index, files) => {
    const updated = [...workType.dimensions];
    updated[index].images = Array.from(files);

    updateWorkType({
      ...workType,
      dimensions: updated
    });
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
      <h3>{workType.type}</h3>

      {workType.dimensions.map((row, index) => (
        <div key={index} style={{ marginBottom: 15 }}>
          <input
            placeholder="Height"
            value={row.height}
            onChange={(e) => updateRow(index, "height", e.target.value)}
          />

          <input
            placeholder="Width"
            value={row.width}
            onChange={(e) => updateRow(index, "width", e.target.value)}
            style={{ marginLeft: 5 }}
          />

          <div style={{ marginTop: 5 }}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImages(index, e.target.files)}
            />
          </div>

          {/* ✅ IMAGE THUMBNAILS */}
          {row.images.length > 0 && (
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {row.images.map((file, imgIndex) => {
                if (!(file instanceof File)) return null;

                const previewUrl = URL.createObjectURL(file);

                return (
                  <img
                    key={imgIndex}
                    src={previewUrl}
                    alt="preview"
                    width={60}
                    height={60}
                    style={{ objectFit: "cover", borderRadius: 4 }}
                    onLoad={() => URL.revokeObjectURL(previewUrl)}
                  />
                );
              })}
            </div>
          )}
        </div>
      ))}

      <button type="button" onClick={addRow}>
        + Add More
      </button>
    </div>
  );
}
