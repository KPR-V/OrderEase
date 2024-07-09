"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handlesubmit } from "./handlesubmit";
import { useEdgeStore } from "@/components/edgestore";
import Link from "next/link";
const AddDish = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const { edgestore } = useEdgeStore();
  const router = useRouter(); // Use the useRouter hook

  const handleFileChange = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const handleSubmit1 = async (event) => {
    event.preventDefault();
    if (!description || !name || !price || !category || !uploadedFile) {
      alert("Please fill all fields");
      return;
    }

    try {
      await filesubmit();
      router.replace('/admin-dashboard/manage-menu'); 
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  const validExtensions = ["jpg", "jpeg", "png", "gif"];

  const isFileValid = (file) => {
    const fileType = file.type;
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return validMimeTypes.includes(fileType) && validExtensions.includes(fileExtension);
  };

  const filesubmit = async () => {
    try {
      if (!uploadedFile || !isFileValid(uploadedFile)) {
        throw new Error("Invalid file type or extension");
      }

      console.log("Starting file upload:", uploadedFile);

      const res = await edgestore.publicFiles.upload({ file: uploadedFile });

      console.log("File upload response:", res);

      if (!res || !res.url) {
        throw new Error("File upload failed: Invalid response");
      }

      const fileUrl = res.url;

      const result = await handlesubmit({ description, price, name, category, url: fileUrl });
      if (result.success) {
        router.replace('/admin-dashboard/manage-menu'); // Redirect after successful submission
      }
    } catch (error) {
      console.error("Error in file submission:", error.message);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noKeyboard: true,
    accept: "image/jpeg, image/png, image/gif",
    multiple: false,
  });

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex bg-slate-500/40 backdrop-blur-md w-2/3 flex-col items-center gap-7 h-full rounded-lg p-2">
        <h2 className="text-black font-bungee font-bold text-3xl mt-1">Add New Dish</h2>
        <div className="w-full max-w-lg mx-auto">
          <div
            className="w-full h-64 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-slate-400/50"
            {...getRootProps()}
          >
            {uploadedFile ? (
              <Image
                onClick={() => {
                  setUploadedFile(null);
                }}
                src={URL.createObjectURL(uploadedFile)}
                className="p-2 rounded-md object-cover cursor-pointer"
                alt="Uploaded File"
                width={300}
                height={300}
              />
            ) : (
              <>
                <input {...getInputProps()} onChange={handleFileChange} />
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-black"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm font-bungee text-black mt-1">
                    Drag 'n' drop the image of dish here
                  </p>
                  <p className="text-xs font-bungee text-black">PNG, JPG, GIF</p>
                  {isDragActive && <p className="text-xs text-black">Drop the file here...</p>}
                </div>
              </>
            )}
          </div>
        </div>

        <main className="w-full max-w-lg mx-auto">
          <form
            className="w-full p-4 rounded shadow-md bg-zinc-800/80"
            onSubmit={handleSubmit1}
          >
            <h2 className="text-2xl mb-4 tracking-wider font-bold text-white font-bungee text-center">
              Add Details
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div className="col-span-1 text-white">
                <textarea
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 rounded-sm border border-gray-300 bg-slate-800 focus:outline-none focus:border-blue-500 font-bungee resize-none"
                  placeholder="Enter the dish description here..."
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="col-span-1 text-white">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full font-bungee px-3 py-2 rounded-sm border bg-slate-800 border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Name of the dish"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1 text-white">
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="w-full font-bungee px-3 py-2 rounded-sm bg-slate-800 border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Price of the dish"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-1 text-white">
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="w-full px-3 font-bungee py-2 rounded-sm border bg-slate-800 border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Category of the dish"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Link href="/admin-dashboard/manage-menu">
                <button type="button" className="py-2 px-4 bg-slate-800 text-white rounded-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Go Back

                </button>

              </Link>
              <button
                type="submit"
                className="py-2 px-4 bg-slate-800 text-white rounded-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Dish To Menu →
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddDish;
