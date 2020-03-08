import React, { useState } from "react";
import { Typography, message, Form, Input, Icon, Button } from "antd";
import Dropzone from "react-dropzone";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const PrivacyOption = [
   { value: 0, label: "Privacy" },
   { value: 1, label: "Public" }
];
const CategoryOption = [
   { value: 0, label: "Film & Animation" },
   { value: 0, label: "Autos & Vehicles" },
   { value: 0, label: "Music" },
   { value: 0, label: "Pets & Animals" },
   { value: 0, label: "Sports" }
];

function UploadVideoPage() {
   const [VideoTitle, setVideoTitle] = useState("");
   const [Description, setDescription] = useState("");
   const [Privacy, setPrivacy] = useState(0);
   const [Category, setCategory] = useState("Film & Animation");

   const handleChangeVideoTitle = e => {
      setVideoTitle(e.currentTarget.value);
   };
   const handleChangeDescription = e => {
      setDescription(e.currentTarget.value);
   };
   const handleChangePrivacy = e => {
      setPrivacy(e.currentTarget.value);
   };
   const handleChangeCategory = e => {
      setCategory(e.currentTarget.value);
   };

   const onDrop = files => {
      let formData = new FormData();
      const config = {
         header: { "content-type": "multipart/form-data" }
      };
      console.log(files);
      formData.append("file", files[0]);

      Axios.post("/api/video/uploadfiles", formData, config).then(response => {
         if (response.data.success) {
            console.log(response.data);
         } else {
            alert("Failed to save the video in server");
            console.log(response.data.err);
         }
      });
   };

   return (
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
         <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Title level={2}>Upload Video</Title>
         </div>

         <Form onSubmit>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
               {/* Dropzone */}
               <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                  {({ getRootProps, getInputProps }) => (
                     <div style={{ width: "300px", height: "240px", border: "1px solid lightgray", display: "flex", alignItems: "center", justifyContent: "center" }} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: "3rem" }} />
                     </div>
                  )}
               </Dropzone>
               {/* Thumnail */}
               <img src alt></img>
            </div>
            <br />
            <br />

            <label>Title</label>
            <Input onChange={handleChangeVideoTitle} value={VideoTitle} />
            <br />
            <br />

            <label>Description</label>
            <TextArea onChange={handleChangeDescription} value={Description} />
            <br />
            <br />

            <select onChange={handleChangePrivacy}>
               {PrivacyOption.map((item, index) => (
                  <option key={index} value={item.value}>
                     {item.label}
                  </option>
               ))}
            </select>
            <br />
            <br />

            <select onChange={handleChangeCategory}>
               {CategoryOption.map((item, index) => (
                  <option key={index} value={item.value}>
                     {item.label}
                  </option>
               ))}
            </select>
            <br />
            <br />

            <Button type="primary" size="large" onClick>
               Submit
            </Button>
         </Form>
      </div>
   );
}

export default UploadVideoPage;
