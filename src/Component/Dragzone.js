import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { readxlsx, parseObject } from "../Utils/utilities";

export default function Dropzone({ callback, fileType }) {
  const [filename, setFilename] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was abort");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = (e) => {
          console.log("received file");
          const data = e.target.result;

          const retJson = readxlsx(data);
          console.log(retJson);

          switch (fileType) {
            case "BOM":
              if (retJson.BOM === undefined || retJson.BOM === null) {
                alert("The file you dropped is wrong");
              } else {
                callback(parseObject(retJson));
              }
              break;

            case "NUD":
              if (
                retJson["Electronic parts"] === undefined ||
                retJson["Electronic parts"] === null
              ) {
                alert("The file you dropped/selected is wrong format");
              } else {
                callback(retJson);
              }
              break;

            default:
              break;
          }
        };
        // reader.readAsArrayBuffer(file)
        reader.readAsBinaryString(file);
      });
      setFilename(acceptedFiles[0].name);
    },
    [callback, fileType]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag and drop file here, or click to select files</p>
      </div>
      <div>
        <h4>{filename}</h4>
      </div>
    </div>
  );
}
