import React from "react";

const UploadAndDisplayImage = ({image, setImage}) => {
  return (
    <div>
      {image && (
        <div style={{ width: '50px', height: '50px' }}>
          <img
            alt="not found"
            width={'50px'}
            height={'50px'}
            src={URL.createObjectURL(image)}
          />
        </div>
      )}
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          setImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;
