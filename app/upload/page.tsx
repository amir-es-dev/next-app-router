"use client";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryInfo {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");

  return (
    <>
      {publicId && (
        <CldImage src={publicId} width={270} height={180} alt="Mosh image" />
      )}
      <CldUploadWidget
        uploadPreset="ikjut4tf"
        onSuccess={(result, second) => {
          if (result.event !== "success") return;
          setPublicId((result.info as CloudinaryInfo).public_id);
        }}
        options={{ sources: ["local"], multiple: false }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
