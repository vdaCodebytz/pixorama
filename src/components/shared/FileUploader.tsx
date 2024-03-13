import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { FileUploaderProps } from "@/types";

function FileUploader({ fieldChange, mediaUrl }: FileUploaderProps) {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setfileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setfileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10 ">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label cursor-pointer">
            Click or Drop to replace
          </p>
        </>
      ) : (
        <div className="file_uploader-box bg-dark-3 rounded-xl">
          <img
            src="/assets/icons/file-upload.png"
            alt="upload"
            width={77}
            height={96}
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag Photos Here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button className="shad-button_dark_4 h-12">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
