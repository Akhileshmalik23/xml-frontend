import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const IndividualView = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`https://xml-backend-lilac.vercel.app/api/reports/${id}`);
        setReport(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user details.");
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="loader border-t-4 border-b-4 border-blue-500 h-12 w-12 rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <motion.button
        onClick={() => navigate(-1)}
        className="mb-6 px-8 py-2 bg-blue-300 hover:border hover:border-blue-300 hover:bg-gray-900 text-white rounded-full transition duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
       Back
      </motion.button>

      <motion.div
        className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          {report.Basic_Details?.Name?.First_Name}{" "}
          {report.Basic_Details?.Name?.Middle_Name}{" "}
          {report.Basic_Details?.Name?.Last_Name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-yellow-400">Basic Details</h2>
            <p><strong>Mobile:</strong> {report.Basic_Details?.Mobile_Phone || "N/A"}</p>
            <p><strong>PAN:</strong> {report.Basic_Details?.PAN_Number || "N/A"}</p>
            <p><strong>Credit Score</strong> {report.Basic_Details?.Credit_Score || "N/A"}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-green-400">Report Summary</h2>
            <p><strong>Total Accounts:</strong> {report.Report_Summary?.Total_number_of_accounts || "N/A"}</p>
            <p><strong>Active Accounts:</strong> {report.Report_Summary?.Active_accounts || "N/A"}</p>
            <p><strong>Closed Accounts:</strong> {report.Report_Summary?.Closed_accounts || "N/A"}</p>
            <p><strong>Current Balance:</strong> ₹{report.Report_Summary?.Current_balance_amount || "N/A"}</p>
            <p><strong>Secured Accounts Amount:</strong> ₹{report.Report_Summary?.Secured_accounts_amount || "N/A"}</p>
            <p><strong>Unsecured Accounts Amount:</strong> ₹{report.Report_Summary?.Unsecured_accounts_amount || "N/A"}</p>
            <p><strong>Last 7 Days Credit Enquiries:</strong> {report.Report_Summary?.Last_7_days_credit_enquiries || "N/A"}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-purple-400">Credit Accounts Information</h2>
            <p><strong>Bank:</strong> {report.Credit_Accounts_Information?.Bank_Name || "N/A"}</p>
            <p><strong>Account No:</strong> {report.Credit_Accounts_Information?.Account_Number || "N/A"}</p>
            <p><strong>Address:</strong> {report.Credit_Accounts_Information?.Address || "N/A"}</p>
            <p><strong>Amount Overdue:</strong> ₹{report.Credit_Accounts_Information?.Amount_Overdue || "N/A"}</p>
            <p><strong>Current Balance:</strong> ₹{report.Credit_Accounts_Information?.Current_Balance || "N/A"}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IndividualView;
