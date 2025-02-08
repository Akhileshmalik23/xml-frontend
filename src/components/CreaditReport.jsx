import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";

const CreditReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://xml-backend-lilac.vercel.app/api/reports");
        setReports(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <Loading loading={loading} />
    );

  if (error)
    return (
      <Error error={error} />
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-500">
        Click on Name's for Detail View
      </h1>

      {reports.length === 0 ? (
        <p className="text-center text-gray-400">No reports available.</p>
      ) : (
        <div className="max-w-3xl mt-12 mx-auto grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-colors duration-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => navigate(`/individualView/${report?._id}`)}
            >
              <p className="text-xl font-medium text-yellow-300 text-center">
                {report?.Basic_Details?.Name?.First_Name}{" "}
                {report?.Basic_Details?.Name?.Last_Name}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreditReport;
