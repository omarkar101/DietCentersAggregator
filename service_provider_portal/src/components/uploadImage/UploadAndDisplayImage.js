import React from "react";

const UploadAndDisplayImage = ({mealPlanImage, setMealPlanImage}) => {
  return (
    <div>
      {mealPlanImage && (
        <div style={{ width: '50px', height: '50px' }}>
          <img
            alt="not found"
            width={'50px'}
            height={'50px'}
            src={URL.createObjectURL(mealPlanImage)}
          />
        </div>
      )}
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          setMealPlanImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;
