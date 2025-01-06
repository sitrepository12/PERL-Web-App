import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaFileExcel } from "react-icons/fa";
import { utils, writeFile } from "xlsx";
import * as XLSX from "xlsx";
import Navbar from "../navbar/Navbar";

function DataPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { branch, batch } = location.state || {};

  // State variables
  const [data, setData] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [showSelectMessage, setShowSelectMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate graduation year based on batch
  const graduationYear = batch;

  // Fetch users based on branch and batch
  useEffect(() => {
    if (branch && batch) {
      axios
        .get("http://localhost:3000/api/auth/users", {
          params: { branch, batch },
        })
        .then((res) => {
          // Map user data to include counselor if available
          const usersWithCounselor = res.data.map((user) => ({
            ...user,
            counselor: user.counselor || null, // Set counselor to null if not assigned
          }));
          setData(usersWithCounselor);
        })
        .catch((err) => console.log(err));
    }
  }, [branch, batch]);

  // Fetch counselors
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/counselors")
      .then((res) => {
        console.log("Counselors fetched:", res.data); // Debugging log
        setCounselors(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAssignClick = (userId) => {
    setSelectedUserId(userId);
    //setSelectedCounselor(null); // Reset selected counselor when opening the modal
    setShowSelectMessage(false); // Reset the message
  };

  // Handle counselor selection
  const handleCounselorSelect = (counselor) => {
    console.log("Selected counselor:", counselor); // Debugging log
    setSelectedCounselor(counselor);
    setShowSelectMessage(false); // Hide the message when a counselor is selected
  };

  // Handle OK button click in the modal
  const handleOkClick = async () => {
    if (selectedCounselor) {
      const selectedUser = data.find((item) => item._id === selectedUserId);
      const recipientEmail = selectedUser?.email;
      const counselorName =
        selectedCounselor.firstName + " " + selectedCounselor.middleName;

      if (recipientEmail) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/assign",
            {
              to: recipientEmail,
              subject: "Your Counselor",
              text: `You have been assigned  ${counselorName}. as your counselor:`,
            }
          );

          if (response.status === 200) {
            console.log("Email sent successfully");
            // Handle success (e.g., show a success message)
          } else {
            console.error("Failed to send email");
            // Handle failure (e.g., show an error message)
          }
        } catch (error) {
          console.error("Error sending email:", error);
          // Handle error (e.g., show an error message)
        }

        // Update the data with the selected counselor
        try {
          await axios.put(
            `http://localhost:3000/api/auth/user/${selectedUserId}/${counselorName}`
          );

          const updatedData = data.map((item) =>
            item._id === selectedUserId
              ? { ...item, counselor: selectedCounselor }
              : item
          );
          setData(updatedData);

          setSelectedUserId(null); // Close the modal
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error("No email found for the selected user");
      }
    } else {
      setShowSelectMessage(true); // Show the message
    }
  };
  // Close the modal
  const closeModal = () => {
    setSelectedUserId(null);
    setShowSelectMessage(false); // Reset the message
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    `${item.firstName} ${item.middleName ? item.middleName + " " : ""}${
      item.lastName
    } ${item.email} ${item.branch} ${
      item.counselor ? item.counselor + " " : ""
    }`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Sort the filtered data by email in increasing order
  const sortedData = filteredData.sort((a, b) =>
    a.email.localeCompare(b.email)
  );

  // Function to fetch and combine user and test data
  const fetchUserTestData = async () => {
    const combinedData = await Promise.all(
      data.map(async (user) => {
        const testTypes = [
          "disc",
          "emotionalintelligence",
          "hireme",
          "mbti",
          "ocean",
          "riasec",
        ];
        const testData = {};

        for (const test of testTypes) {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/test/${test}/${user._id}`
            );
            testData[test] = response.data;
          } catch (error) {
            console.error(
              `Error fetching ${test} data for user ${user._id}:`,
              error
            );
          }
        }

        return {
          ...user,
          testData,
        };
      })
    );

    return combinedData;
  };

  // Function to export data to Excel
  // Function to export data to Excel with customized formatting
  const exportToExcel = async () => {
    const userTestData = await fetchUserTestData();
    const columnsToExclude = [
      "_id",
      "password",
      "createdAt",
      "updatedAt",
      "__v",
      "mbti",
      "disc",
      "ocean",
      "riasec",
      "emotionalIntelligence",
      "hireme",
      "disc__id",
      "disc_user",
      "disc___v",
      "hireme___v",
      "emotionalintelligence__id",
      "emotionalintelligence_user",
      "emotionalintelligence___v",
      "hireme__id",
      "hireme_user",
      "hireme__v",
      "mbti__id",
      "mbti_user",
      "mbti___v",
      "ocean__id",
      "ocean_user",
      "ocean___v",
      "riasec__id",
      "riasec_user",
      "riasec___v",
    ];

    const exportData = userTestData.map((user) => {
      const { testData, ...userData } = user;
      const testEntries = Object.entries(testData).reduce(
        (acc, [testName, test]) => ({
          ...acc,
          ...Object.entries(test).reduce(
            (innerAcc, [key, value]) => ({
              ...innerAcc,
              [`${testName}_${key}`]: value,
            }),
            {}
          ),
        }),
        {}
      );

      // Combine userData and testEntries
      const combinedData = { ...userData, ...testEntries };

      // Filter out the columns to exclude
      const filteredData = Object.fromEntries(
        Object.entries(combinedData).filter(
          ([key]) => !columnsToExclude.includes(key)
        )
      );

      return filteredData;
    });

    // Reorder columns if needed
    const reorderedColumns = [
      "firstName",
      "middleName",
      "lastName",
      "email",
      "branch",
      "batch",
      "mbti_Introverted",
      "mbti_Extraverted",
      "mbti_Intuition",
      "mbti_Sensing",
      "mbti_Feeling",
      "mbti_Thinking",
      "mbti_Perceiving",
      "mbti_Judging",
      "mbti_AuditoryLearning",
      "mbti_VisualLearning",
      "mbti_KinestheticLearning",
      "mbti_LeftBrain",
      "mbti_RightBrain",
      "mbti_IntelligenceType",
      "mbti_IntelligenceScore",
      "disc_Dominance",
      "disc_Influence",
      "disc_Steadiness",
      "disc_Compliance",
      "ocean_Openness",
      "ocean_Conscientiousness",
      "ocean_Extraversion",
      "ocean_Agreeableness",
      "ocean_NaturalReactions",
      "riasec_Realistic",
      "riasec_Investigative",
      "riasec_Artistic",
      "riasec_Social",
      "riasec_Enterprising",
      "riasec_Conventional",
      "emotionalintelligence_selfAwareness",
      "emotionalintelligence_selfManagement",
      "emotionalintelligence_socialAwareness",
      "emotionalintelligence_relationshipManagement",
      "hireme_Verbal",
      "hireme_Quantitative",
      "hireme_Logical",
      "hireme_Core",
      "hireme_Fundamentals",
      "hireme_Communication",
      "hireme_AffectiveCommunication",
      "hireme_Assertiveness",
      "hireme_DesireToLead",
      "hireme_Trusting",
      "hireme_Diversity",
      "hireme_SocialRelationship",
      "hireme_RelationshipBuilding",
      "hireme_TeamSpirit",
      "hireme_Recognition",
      "hireme_Security",
      "hireme_Planning",
      "hireme_AchievementOrientation",
      "hireme_ProcessOrientation",
      "hireme_ServiceOrientation",
      "hireme_SystemOrientation",
      "hireme_SelfEsteem",
      "hireme_SelfConfidence",
      "hireme_Empathy",
      "hireme_DecisionMaking",
      "hireme_Creativity",
      "hireme_Innovation",
      "hireme_ProblemSolving",
      "hireme_Inquisitiveness",
      "hireme_Adaptability",
      "hireme_Integrity",
      "hireme_Dutifulness",
      "hireme_Accountability",
    ];

    // Map old keys to new column names
    const columnNamesMap = {
      firstName: "First Name",
      middleName: "Middle Name",
      lastName: "Last Name",
      email: "Email",
      branch: "Branch",
      batch: "Graduation Year",
      mbti_Introverted: "MBTI - Introverted",
      mbti_Extraverted: "MBTI - Extraverted",
      mbti_Intuition: "MBTI - Intuition",
      mbti_Sensing: "MBTI - Sensing",
      mbti_Feeling: "MBTI - Feeling",
      mbti_Thinking: "MBTI - Thinking",
      mbti_Perceiving: "MBTI - Perceiving",
      mbti_Judging: "MBTI - Judging",
      mbti_AuditoryLearning: "MBTI - Auditory Learning",
      mbti_VisualLearning: "MBTI - Visual Learning",
      mbti_KinestheticLearning: "MBTI - Kinesthetic Learning",
      mbti_LeftBrain: "MBTI - Left Brain",
      mbti_RightBrain: "MBTI - Right Brain",
      mbti_IntelligenceType: "MBTI - Intelligence Type",
      mbti_IntelligenceScore: "MBTI - Intelligence Score",
      disc_Dominance: "DISC - Dominance",
      disc_Influence: "DISC - Influence",
      disc_Steadiness: "DISC - Steadiness",
      disc_Compliance: "DISC - Compliance",
      ocean_Openness: "OCEAN - Openness",
      ocean_Conscientiousness: "OCEAN - Conscientiousness",
      ocean_Extraversion: "OCEAN - Extraversion",
      ocean_Agreeableness: "OCEAN - Agreeableness",
      ocean_NaturalReactions: "OCEAN - Natural Reactions",
      riasec_Realistic: "RIASEC - Realistic",
      riasec_Investigative: "RIASEC - Investigative",
      riasec_Artistic: "RIASEC - Artistic",
      riasec_Social: "RIASEC - Social",
      riasec_Enterprising: "RIASEC - Enterprising",
      riasec_Conventional: "RIASEC - Conventional",
      emotionalintelligence_selfAwareness:
        "Emotional Intelligence - Self Awareness",
      emotionalintelligence_selfManagement:
        "Emotional Intelligence - Self Management",
      emotionalintelligence_socialAwareness:
        "Emotional Intelligence - Social Awareness",
      emotionalintelligence_relationshipManagement:
        "Emotional Intelligence - Relationship Management",
      hireme_Verbal: "HireMe - Verbal",
      hireme_Quantitative: "HireMe - Quantitative",
      hireme_Logical: "HireMe - Logical",
      hireme_Core: "HireMe - Core",
      hireme_Fundamentals: "HireMe - Fundamentals",
      hireme_Communication: "HireMe - Communication",
      hireme_AffectiveCommunication: "HireMe - Affective Communication",
      hireme_Assertiveness: "HireMe - Assertiveness",
      hireme_DesireToLead: "HireMe - Desire to Lead",
      hireme_Trusting: "HireMe - Trusting",
      hireme_Diversity: "HireMe - Diversity",
      hireme_SocialRelationship: "HireMe - Social Relationship",
      hireme_RelationshipBuilding: "HireMe - Relationship Building",
      hireme_TeamSpirit: "HireMe - Team Spirit",
      hireme_Recognition: "HireMe - Recognition",
      hireme_Security: "HireMe - Security",
      hireme_Planning: "HireMe - Planning",
      hireme_AchievementOrientation: "HireMe - Achievement Orientation",
      hireme_ProcessOrientation: "HireMe - Process Orientation",
      hireme_ServiceOrientation: "HireMe - Service Orientation",
      hireme_SystemOrientation: "HireMe - System Orientation",
      hireme_SelfEsteem: "HireMe - Self Esteem",
      hireme_SelfConfidence: "HireMe - Self Confidence",
      hireme_Empathy: "HireMe - Empathy",
      hireme_DecisionMaking: "HireMe - Decision Making",
      hireme_Creativity: "HireMe - Creativity",
      hireme_Innovation: "HireMe - Innovation",
      hireme_ProblemSolving: "HireMe - Problem Solving",
      hireme_Inquisitiveness: "HireMe - Inquisitiveness",
      hireme_Adaptability: "HireMe - Adaptability",
      hireme_Integrity: "HireMe - Integrity",
      hireme_Dutifulness: "HireMe - Dutifulness",
      hireme_Accountability: "HireMe - Accountability",
    };

    const reorderedData = exportData.map((item) => {
      const reorderedItem = {};
      reorderedColumns.forEach((col) => {
        reorderedItem[columnNamesMap[col] || col] = item[col];
      });
      return reorderedItem;
    });

    const worksheet = XLSX.utils.json_to_sheet(reorderedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "userTestData.xlsx");
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl mt-8 p-4 bg-white rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800 mr-4">
              Student List
            </h1>
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 px-2 py-1 border rounded-lg focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 ml-auto rounded hover:bg-green-600 flex items-center"
              onClick={exportToExcel}
            >
              <FaFileExcel className="mr-2" />
              Export to Excel
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-[#FFCD9F] text-gray-800">
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Full Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Branch</th>
                  <th className="py-2 px-4">Graduation Year</th>
                  <th className="py-2 px-4">Assign Counselor</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item, index) => (
                  <tr
                    key={item._id}
                    className={
                      index % 2 === 0 ? "bg-[#FFF7F2]" : "bg-[#F5E6D9]"
                    }
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      <Link to={`/charts/${item._id}`}>
                        {`${item.firstName} ${
                          item.middleName ? item.middleName + " " : ""
                        }${item.lastName}`}
                      </Link>
                    </td>
                    <td className="border px-4 py-2">{item.email}</td>
                    <td className="border px-4 py-2">{item.branch}</td>
                    <td className="border px-4 py-2">{graduationYear}</td>
                    <td className="border px-4 py-2 text-center">
                      {item.counselor ? (
                        <div
                          className="bg-green-200 text-green-800 px-4 py-2 rounded shadow cursor-pointer"
                          onClick={() => handleAssignClick(item._id)}
                        >
                          {item.counselor}
                        </div>
                      ) : (
                        <button
                          className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 shadow"
                          onClick={() => handleAssignClick(item._id)}
                        >
                          Assign
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedUserId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Assign Counselor</h2>
            <ul className="mb-4 max-h-48 overflow-y-auto">
              {counselors.map((counselor) => (
                <li
                  key={counselor._id}
                  className={`p-2 border rounded-lg mb-2 cursor-pointer ${
                    selectedCounselor && selectedCounselor._id === counselor._id
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleCounselorSelect(counselor)}
                >
                  {counselor.firstName} {counselor.lastName}
                </li>
              ))}
            </ul>
            {showSelectMessage && (
              <p className="text-red-500 mb-4">Please select a counselor.</p>
            )}
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded"
                onClick={handleOkClick}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataPage;
