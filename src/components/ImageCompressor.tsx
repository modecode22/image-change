import React, { useState } from "react";

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleCompress = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target?.result as string;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.5);
            setCompressedImage(dataUrl);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white shadow-sm border rounded-lg p-10 flex flex-col items-center gap-5">
      <h1 className="text-3xl font-bold text-sky-800 ">
        Image Compression App
      </h1>
      <input
        className="border border-sky-500 p-2 rounded-lg"
        type="file"
        onChange={handleImageChange}
      />
      <button
        className="bg-sky-500 hover:bg-sky-500/90 duration-100 text-sky-50 shadow-md hover:shadow-sm p-2 rounded-lg"
        onClick={handleCompress}
      >
        Compress
      </button>
      {compressedImage && (
        <img className=" rounded-lg" src={compressedImage} alt="Compressed Image" />
      )}
    </div>
  );
};

export default ImageCompressor;
