import { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      setUploading(true);
      setMessage("");
  
      const response = await axios.post("https://xml-backend-lilac.vercel.app/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setMessage(response.data.message || "File uploaded successfully!");
  
      // Add a 2-second delay before refreshing the page
      setTimeout(() => {
        navigate("/credit-report")
      }, 2000);
    } catch (error) {
      setMessage("File upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Upload XML File</h2>

        <label className="cursor-pointer flex flex-col items-center space-y-3 bg-gray-700 p-4 rounded-lg">
          <FaCloudUploadAlt className="text-4xl text-blue-400" />
          <span className="text-sm">{file ? file.name : "Choose XML File"}</span>
          <input type="file" accept=".xml" className="hidden" onChange={handleFileChange} />
        </label>

        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-400 hover:border hover:border-blue-300 hover:bg-gray-900 text-white hover:text-red-900 px-4 py-2 rounded-full disabled:opacity-50"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {message && <p className="mt-3 text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default UploadFile;
