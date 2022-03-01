import React, { useState } from "react";

import axios from "react";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

//   const uploadHandler = () => {
//     const formData = new FormData();
//     formData.append(
//       "myFile",
//       this.state.selectedFile,
//       this.state.selectedFile.name
//     );
//     axios.post("my-domain.com/file-upload", formData, {
//       onUploadProgress: (progressEvent) => {
//         console.log(progressEvent.loaded / progressEvent.total);
//       },
//     });
//   };

  return (
    <div>
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
        </div>
      )}
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
      />
      {/* <button onClick={uploadHandler}>Upload!</button> */}
    </div>
  );
};

export default UploadAndDisplayImage;
