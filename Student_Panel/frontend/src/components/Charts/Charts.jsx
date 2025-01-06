import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Loader from "../loader/Loader"
// import { jsPDF } from "jspdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "../pdf_document/PDFDocument";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [oceanData, setOceanData] = useState(null);
  const [riasecData, setRiasecData] = useState(null);
  const [discData, setDiscData] = useState(null);
  const [EIData, setEIData] = useState(null);
  const [hireMeData, setHireMeData] = useState(null);
  const [mbtiData, setMbtiData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const oceanResponse = await axios.get(
          "http://localhost:3000/api/test/ocean",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOceanData(oceanResponse.data);

        const riasecResponse = await axios.get(
          "http://localhost:3000/api/test/riasec",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRiasecData(riasecResponse.data);

        const discResponse = await axios.get(
          "http://localhost:3000/api/test/disc",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDiscData(discResponse.data);

        const emotionalIntelligenceResponse = await axios.get(
          "http://localhost:3000/api/test/emotionalintelligence",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEIData(emotionalIntelligenceResponse.data);

        const hireMeResponse = await axios.get(
          "http://localhost:3000/api/test/hireme",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHireMeData(hireMeResponse.data);

        const mbtiResponse = await axios.get(
          "http://localhost:3000/api/test/mbti",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMbtiData(mbtiResponse.data);

        // setLoading(false);
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      //   setError("Error fetching data");
      //   setLoading(false);
      // }
    
    const responses = await Promise.all([
      oceanResponse,
      riasecResponse,
      discResponse,
      emotionalIntelligenceResponse,
      hireMeResponse,
      mbtiResponse
    ]);

    setOceanData(responses[0].data);
    setRiasecData(responses[1].data);
    setDiscData(responses[2].data);
    setEIData(responses[3].data);
    setHireMeData(responses[4].data);
    setMbtiData(responses[5].data);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  } catch (error) {
    console.error("Error fetching data:", error);
    setError("Error fetching data");
    setLoading(false);
  }
};

    fetchData();
  }, []);

  // const generatePDF = () => {
  //   const doc = new jsPDF();
  //   doc.text("OCEAN Test Results", 20, 20);
  //   doc.save("test_results.pdf");
  // };

  // const sendEmail = () => {
  //   alert("Email functionality not implemented in this demo.");
  // };

  if (loading) return (
    <div className="loader-container">
      <Loader />
    </div>
  );
  if (error) return <p>{error}</p>;

  // const mbtiLabels = [
  //   'Extraverted',
  //   'Introverted',
  //   'Sensing',
  //   'Intuition',
  //   'Thinking',
  //   'Feeling',
  //   'Judging',
  //   'Perceiving',
  // ];

  // Sample dataEntries for demonstration
  const dataEntries = [
    {
      label: "Extraverted",
      value: mbtiData.Extraverted,
      color: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    {
      label: "Introverted",
      value: mbtiData.Introverted,
      color: "rgba(255, 99, 132, 0.6)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "Sensing",
      value: mbtiData.Sensing,
      color: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
    {
      label: "Intuition",
      value: mbtiData.Intuition,
      color: "rgba(255, 206, 86, 0.6)",
      borderColor: "rgba(255, 206, 86, 1)",
    },
    {
      label: "Thinking",
      value: mbtiData.Thinking,
      color: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    {
      label: "Feeling",
      value: mbtiData.Feeling,
      color: "rgba(153, 102, 255, 0.6)",
      borderColor: "rgba(153, 102, 255, 1)",
    },
    {
      label: "Judging",
      value: mbtiData.Judging,
      color: "rgba(255, 159, 64, 0.6)",
      borderColor: "rgba(255, 159, 64, 1)",
    },
    {
      label: "Perceiving",
      value: mbtiData.Perceiving,
      color: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
  ];

  // Define pairs with specific order
  const pairs = [
    ["Extraverted", "Introverted"],
    ["Sensing", "Intuition"],
    ["Thinking", "Feeling"],
    ["Judging", "Perceiving"],
  ];

  // Prepare an array to store top entries
  let topEntries = [];

  // Iterate over each pair
  for (const [a, b] of pairs) {
    // Find entries corresponding to labels a and b
    const entryA = dataEntries.find((entry) => entry.label === a);
    const entryB = dataEntries.find((entry) => entry.label === b);

    // Determine which entry has a higher value or if they are equal
    if (entryA.value > entryB.value) {
      topEntries.push(entryA);
    } else if (entryB.value > entryA.value) {
      topEntries.push(entryB);
    } else {
      // Handle case where values are equal by pushing both entries
      topEntries.push(entryA, entryB);
    }
  }

  // Prepare data for chart.js with initials
  const labelInitials = {
    Extraverted: "E",
    Introverted: "I",
    Sensing: "S",
    Intuition: "N",
    Thinking: "T",
    Feeling: "F",
    Judging: "J",
    Perceiving: "P",
  };

  const data = {
    labels: topEntries.map((item) => labelInitials[item.label]), // Use map to extract initials
    datasets: [
      {
        label: "MBTI Test Result",
        data: topEntries.map((item) => item.value), // Use map to extract values
        backgroundColor: topEntries.map((item) => item.color), // Use map to extract colors
        borderColor: topEntries.map((item) => item.borderColor), // Use map to extract border colors
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {/* <div className="min-h-screen flex flex-col "> */}
      <Navbar />

      {/* <div className=" mx-auto bg-white p-6 rounded-lg shadow-md"> */}
      <div className="mb-8 p-50 mt-10" style={{ paddingLeft: "20px" }}>
        <h1 className="text-3xl font-bold mb-4 text-center">MBTI</h1>
        <div className="mb-8">
          <div style={{ height: "400px" }}>
            <Bar
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  datalabels: {
                    display: true,
                    anchor: "center",
                    align: "center",
                    color: "#000",
                    font: {
                      size: 14,
                      weight: "bold",
                    },
                    formatter: function (value) {
                      return value;
                    },
                  },
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    weight: "bold",
                    size: 18,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      font: {
                        size: 18,
                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                  y: {
                    max: 100,
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 18,
                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4 mt-10 text-center style={{ paddingLeft: '20px' }}">
        Learning Style
      </h1>
      <div className="mb-8">
        <div style={{ height: "400px" }}>
          <Bar
            data={{
              labels: ["Auditory ", "Visual", "Kinesthetic"],
              datasets: [
                {
                  label: "Learning Style Results",
                  data: [
                    mbtiData.AuditoryLearning,
                    mbtiData.VisualLearning,
                    mbtiData.KinestheticLearning,
                  ],
                  backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                  ],
                  borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(153, 102, 255, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  display: true,
                  anchor: "center",
                  align: "center",
                  color: "#000", // color of the text
                  font: {
                    size: 14, // adjust font size as needed
                    weight: "bold", // adjust font weight as needed
                  },
                  formatter: function (value, context) {
                    return value; // display the value directly
                  },
                },
                legend: {
                  display: false, // hide legend
                },
              },
              scales: {
                y: {
                  max: 100,
                  beginAtZero: true,
                  ticks: {
                    font: {
                      size: 18,
                      weight: "bold", // adjust font size as needed
                    },
                  },
                },
              },
              x: {
                ticks: {
                  font: {
                    size: 18,
                    weight: "bold", // adjust font size as needed
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4 mt-10 text-center ">Brain Type</h1>
      <div className="mb-8 style={{ paddingLeft: '20px' }}">
        <div style={{ height: "400px" }}>
          <Pie
            data={{
              labels: [
                `Left Brain: ${mbtiData.LeftBrain}`,
                `Right Brain: ${mbtiData.RightBrain}`,
              ],
              datasets: [
                {
                  label: "Brain Type",
                  data: [mbtiData.LeftBrain, mbtiData.RightBrain],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.6)", // Red for Left Brain
                    "rgba(54, 162, 235, 0.6)", // Blue for Right Brain
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4 mt-10 text-center ">
        Highest Intelligence :
      </h1>
      <div className="mb-20 style={{ paddingLeft: '20px' }}">
        <div className="grid grid-cols-2 gap-4">
          <div style={{ paddingLeft: "20px" }}>
            <h2 className="text-xl font-semibold mb-2 ">Intelligence Type:</h2>
            <p>{mbtiData.IntelligenceType}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 style={{ paddingLeft: '20px' }}">
              Intelligence value:
            </h2>
            <p>{mbtiData.IntelligenceScore}</p>
          </div>
          <br />
        </div>
      </div>

      <div className="max-h-400 overflow-y-auto mb-20 style={{ paddingLeft: '20px' }}">
        <h1 className="text-3xl font-bold mb-4 text-center">DISC</h1>
        {discData && (
          <div style={{ height: "400px" }}>
            <Bar
              data={{
                labels: ["Dominance", "Influence", "Steadiness", "Compliance"],
                datasets: [
                  {
                    label: "DISC Test Results",
                    data: [
                      discData.Dominance,
                      discData.Influence,
                      discData.Steadiness,
                      discData.Compliance,
                    ],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 206, 86, 0.6)",
                      "rgba(75, 192, 192, 0.6)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  datalabels: {
                    display: true,
                    anchor: "center",
                    align: "center",
                    color: "#000", // color of the text
                    font: {
                      size: 14, // adjust font size as needed
                      weight: "bold", // adjust font weight as needed
                    },
                    formatter: function (value, context) {
                      return value; // display the value directly
                    },
                  },
                  legend: {
                    display: false, // hide legend
                  },
                },
                scales: {
                  y: {
                    max: 60,
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 18,
                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                  x: {
                    ticks: {
                      display: true, // show x-axis ticks
                      font: {
                        size: 18,
                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      <br />
      <div className="mb-20 style={{ maxHeight: '400px', overflowY: 'auto' }}">
        <h1 className="text-3xl font-bold mb-4 text-center">OCEAN</h1>
        {oceanData && (
          <div style={{ height: "400px" }}>
            <Bar
              data={{
                labels: [
                  "Openness",
                  "Conscientiousness",
                  "Extraversion",
                  "Agreeableness",
                  "Natural Reactions",
                ],
                datasets: [
                  {
                    label: "OCEAN Test Results",
                    data: [
                      oceanData.Openness,
                      oceanData.Conscientiousness,
                      oceanData.Extraversion,
                      oceanData.Agreeableness,
                      oceanData.NaturalReactions,
                    ],
                    backgroundColor: [
                      "rgba(75, 192, 192, 0.6)", // Light Blue
                      "rgba(255, 159, 64, 0.6)", // Light Orange
                      "rgba(153, 102, 255, 0.6)", // Light Purple
                      "rgba(255, 205, 86, 0.6)", // Light Yellow
                      "rgba(54, 162, 235, 0.6)", // Light Sky Blue
                    ],
                    borderColor: [
                      "rgba(75, 192, 192, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 205, 86, 1)",
                      "rgba(54, 162, 235, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  datalabels: {
                    display: true,
                    anchor: "center",
                    align: "center",
                    color: "#000", // color of the text
                    font: {
                      size: 14, // adjust font size as needed
                      weight: "bold", // adjust font weight as needed
                    },
                    formatter: function (value, context) {
                      return value; // display the value directly
                    },
                  },
                  legend: {
                    display: false, // hide legend
                  },
                },
                scales: {
                  y: {
                    max: 100,
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 18,
                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                },
                x: {
                  ticks: {
                    font: {
                      size: 18,
                      weight: "bold", // adjust font size as needed
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      <br />
      <div className="mb-20 style={{ maxHeight: '400px', overflowY: 'auto' }}">
        <h1 className="text-3xl font-bold mb-4 mt-10 text-center">RIASEC</h1>
        {riasecData && (
          <div style={{ height: "400px" }}>
            <Bar
              data={{
                labels: [
                  "Realistic",
                  "Investigative",
                  "Artistic",
                  "Social",
                  "Enterprising",
                  "Conventional",
                ],
                datasets: [
                  {
                    label: "RIASEC Test Results",
                    data: [
                      riasecData.Realistic,
                      riasecData.Investigative,
                      riasecData.Artistic,
                      riasecData.Social,
                      riasecData.Enterprising,
                      riasecData.Conventional,
                    ],
                    backgroundColor: [
                      "rgba(75, 192, 192, 0.6)",
                      "rgba(255, 159, 64, 0.6)",
                      "rgba(153, 102, 255, 0.6)",
                      "rgba(255, 205, 86, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 99, 132, 0.6)",
                    ],
                    borderColor: [
                      "rgba(75, 192, 192, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 205, 86, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 99, 132, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  datalabels: {
                    display: true,
                    anchor: "center",
                    align: "center",
                    color: "#000", // color of the text
                    font: {
                      size: 14, // adjust font size as needed
                      weight: "bold", // adjust font weight as needed
                    },
                    formatter: function (value, context) {
                      return value; // display the value directly
                    },
                  },
                  legend: {
                    display: false, // hide legend
                  },
                },
                scales: {
                  y: {
                    max: 60,
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 18,
                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                },
                x: {
                  ticks: {
                    font: {
                      size: 18,
                      weight: "bold", // adjust font size as needed
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      <br />
      <div className="mb-20 style={{ maxHeight: '400px', overflowY: 'auto' }}">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Emotional Intelligence
        </h1>
        {EIData && (
          <div style={{ height: "400px" }}>
            <Bar
              data={{
                labels: [
                  "Self Awareness",
                  "Self Management",
                  "Social Awareness",
                  "Relationship Management",
                ],
                datasets: [
                  {
                    label: "Emotional Intelligence Test Results",
                    data: [
                      EIData.selfAwareness,
                      EIData.selfManagement,
                      EIData.socialAwareness,
                      EIData.relationshipManagement,
                    ],
                    backgroundColor: [
                      "rgba(255, 205, 86, 0.6)",
                      "rgba(75, 192, 192, 0.6)",
                      "rgba(255, 159, 64, 0.6)",
                      "rgba(153, 102, 255, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                    ],
                    borderColor: [
                      "rgba(255, 205, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(54, 162, 235, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  datalabels: {
                    display: true,
                    anchor: "center",
                    align: "center",
                    color: "#000", // color of the text
                    font: {
                      size: 14, // adjust font size as needed
                      weight: "bold", // adjust font weight as needed
                    },
                    formatter: function (value, context) {
                      return value; // display the value directly
                    },
                  },
                  legend: {
                    display: false, // hide legend
                  },
                },
                scales: {
                  x: {
                    max: 10,
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 18,
                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                },
                y: {
                  ticks: {
                    font: {
                      size: 18,
                      weight: "bold", // adjust font size as needed
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      <br />
      {/* <div className="container mb-20  mx-auto "> */}
      <h1 className="text-3xl font-bold mb-10 text-center ">HireMee&#174;</h1>

      {hireMeData && (
        <>
          <div className="mb-6" style={{ height: "400px" }}>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Aptitude
            </h2>
            <Bar
              data={{
                labels: [
                  "Verbal",
                  "Quantitative",
                  "Logical",
                  "Core",
                  "Fundamentals",
                  "Communication",
                ],
                datasets: [
                  {
                    label: "Aptitude Test Results",
                    data: [
                      hireMeData.Verbal,
                      hireMeData.Quantitative,
                      hireMeData.Logical,
                      hireMeData.Core,
                      hireMeData.Fundamentals,
                      hireMeData.Communication,
                    ],
                    backgroundColor: [
                      "rgba(255, 206, 86, 0.7)", // Gold
                      "rgba(173, 216, 230, 0.7)", // Light Blue
                      "rgba(218, 112, 214, 0.7)", // Orchid
                      "rgba(152, 251, 152, 0.7)", // Pale Green
                      "rgba(255, 182, 193, 0.7)", // Light Pink
                      "rgba(135, 206, 250, 0.7)", // Light Sky Blue
                    ],
                    borderColor: [
                      "rgba(255, 206, 86, 1)", // Gold
                      "rgba(173, 216, 230, 1)", // Light Blue
                      "rgba(218, 112, 214, 1)", // Orchid
                      "rgba(152, 251, 152, 1)", // Pale Green
                      "rgba(255, 182, 193, 1)", // Light Pink
                      "rgba(135, 206, 250, 1)", // Light Sky Blue
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: "y",
                plugins: {
                  datalabels: {
                    display: true,
                    anchor: "center",
                    align: "center",
                    color: "#000", // color of the text
                    font: {
                      size: 14, // adjust font size as needed
                      weight: "bold", // adjust font weight as needed
                    },
                    formatter: function (value, context) {
                      return value; // display the value directly
                    },
                  },
                  legend: {
                    display: false, // hide legend
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      font: {
                        size: 18,
                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                  x: {
                    max: 9,
                    ticks: {
                      font: {
                        size: 18,

                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                },
              }}
            />
          </div>

          {/* Team Work Qualities Bar Graph */}
          <div className="mb-6" style={{ height: "400px" }}>
            <h2 className="text-2xl font-semibold mb-4 mt-20 text-center">
              Team Work Qualities
            </h2>
            <Bar
              data={{
                labels: [
                  "Affective Communication",
                  "Assertiveness",
                  "Desire To Lead",
                  "Trusting",
                  "Diversity",
                  "Social Relationship",
                  "Relationship Building",
                  "Team Spirit",
                  "Recognition",
                  "Security",
                ],
                datasets: [
                  {
                    label: "Team Work Qualities",
                    data: [
                      hireMeData.AffectiveCommunication,
                      hireMeData.Assertiveness,
                      hireMeData.DesireToLead,
                      hireMeData.Trusting,
                      hireMeData.Diversity,
                      hireMeData.SocialRelationship,
                      hireMeData.RelationshipBuilding,
                      hireMeData.TeamSpirit,
                      hireMeData.Recognition,
                      hireMeData.Security, // Corrected from hireMeData.Security
                    ],
                    backgroundColor: [
                      "rgba(46, 134, 193, 0.6)", // Blue shade
                      "rgba(75, 192, 192, 0.6)", // Light cyan
                      "rgba(255, 205, 86, 0.6)", // Yellow
                      "rgba(255, 99, 132, 0.6)", // Pink
                      "rgba(153, 102, 255, 0.6)", // Purple
                      "rgba(54, 162, 235, 0.6)", // Sky blue
                      "rgba(255, 159, 64, 0.6)", // Orange
                      "rgba(131, 233, 211, 0.6)", // Aqua green
                      "rgba(255, 206, 86, 0.6)", // Gold
                      "rgba(89, 77, 224, 0.6)", // Indigo
                    ],
                    borderColor: [
                      "rgba(46, 134, 193, 1)", // Blue shade
                      "rgba(75, 192, 192, 1)", // Light cyan
                      "rgba(255, 205, 86, 1)", // Yellow
                      "rgba(255, 99, 132, 1)", // Pink
                      "rgba(153, 102, 255, 1)", // Purple
                      "rgba(54, 162, 235, 1)", // Sky blue
                      "rgba(255, 159, 64, 1)", // Orange
                      "rgba(131, 233, 211, 1)", // Aqua green
                      "rgba(255, 206, 86, 1)", // Gold
                      "rgba(89, 77, 224, 1)", // Indigo
                    ],

                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: "y",
                plugins: {
                  datalabels: {
                    display: true,
                    anchor: "center",
                    align: "center",
                    color: "#000", // color of the text
                    font: {
                      size: 14, // adjust font size as needed
                      weight: "bold", // adjust font weight as needed
                    },
                    formatter: function (value, context) {
                      return value; // display the value directly
                    },
                  },
                  legend: {
                    display: false, // hide legend
                  },
                },
                scales: {
                  x: {
                    max: 10,
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 18,
                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                  y: {
                    ticks: {
                      font: {
                        size: 18,
                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                },
              }}
            />
          </div>

          {/* Work Orientation Bar Graph */}
          <div className="mb-6" style={{ height: "400px" }}>
            <h2 className="text-2xl font-semibold mb-4 mt-20 text-center">
              Work Orientation
            </h2>
            <Bar
              data={{
                labels: [
                  "Planning",
                  "Achievement Orientation",
                  "Process Orientation",
                  "Service Orientation",
                  "System Orientation",
                ],
                datasets: [
                  {
                    label: "Work Orientation",
                    data: [
                      hireMeData.Planning,
                      hireMeData.AchievementOrientation,
                      hireMeData.ProcessOrientation,
                      hireMeData.ServiceOrientation,
                      hireMeData.SystemOrientation,
                    ],
                    backgroundColor: [
                      "rgba(255, 99, 71, 0.6)", // Tomato
                      "rgba(144, 238, 144, 0.6)", // Light Green
                      "rgba(255, 165, 0, 0.6)", // Orange
                      "rgba(255, 182, 193, 0.6)", // Light Pink
                      "rgba(54, 162, 235, 0.6)",
                      // "rgba(147, 112, 219, 0.6)",    // Medium Purple
                    ],
                    borderColor: [
                      "rgba(255, 99, 71, 1)", // Tomato
                      "rgba(144, 238, 144, 1)", // Light Green
                      "rgba(255, 165, 0, 1)", // Orange
                      "rgba(255, 182, 193, 1)", // Light Pink
                      "rgba(54, 162, 235, 1)", // Powder Blue
                      // "rgba(147, 112, 219, 1)",    // Medium Purple
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: "y",
                plugins: {
                  datalabels: {
                    display: true,
                    anchor: "center",
                    align: "center",
                    color: "#000", // color of the text
                    font: {
                      size: 14, // adjust font size as needed
                      weight: "bold", // adjust font weight as needed
                    },
                    formatter: function (value, context) {
                      return value; // display the value directly
                    },
                  },
                  legend: {
                    display: false, // hide legend
                  },
                },
                scales: {
                  x: {
                    max: 10,
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 18,
                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                },
                y: {
                  ticks: {
                    font: {
                      size: 18,
                      weight: "bold", // adjust font size as needed
                    },
                  },
                },
              }}
            />
          </div>

          {/* Soft Skills Bar Graph */}
          <div className="mb-20" style={{ height: "400px" }}>
            <h2 className="text-2xl font-semibold mb-4 mt-20 text-center">
              Soft Skills
            </h2>
            <Bar
              data={{
                labels: [
                  "Self Esteem",
                  "Self Confidence",
                  "Empathy",
                  "Decision Making",
                  "Creativity",
                  "Innovation",
                  "Problem Solving",
                  "Inquisitiveness",
                  "Adaptability",
                  "Flexibility",
                  "Integrity",
                  "Dutifulness",
                  "Accountability",
                ],
                datasets: [
                  {
                    label: "Soft Skills",
                    data: [
                      hireMeData.SelfEsteem,
                      hireMeData.SelfConfidence,
                      hireMeData.Empathy,
                      hireMeData.DecisionMaking,
                      hireMeData.Creativity,
                      hireMeData.Innovation,
                      hireMeData.ProblemSolving,
                      hireMeData.Inquisitiveness,
                      hireMeData.Adaptability,
                      hireMeData.Flexibility,
                      hireMeData.Integrity,
                      hireMeData.Dutifulness,
                      hireMeData.Accountability,
                    ],
                    backgroundColor: [
                      "rgba(255, 159, 64, 0.6)", // Orange
                      "rgba(106, 90, 205, 0.6)", // Slate blue (new)
                      "rgba(255, 206, 86, 0.6)", // Gold
                      "rgba(240, 128, 128, 0.6)", // Light coral (new)

                      "rgba(32, 178, 170, 0.6)", // Light sea green (new)
                      "rgba(54, 162, 235, 0.6)", // Sky blue
                      "rgba(153, 102, 255, 0.6)", // Purple
                      "rgba(75, 192, 192, 0.6)", // Light cyan
                      "rgba(89, 77, 224, 0.6)", // Indigo
                      "rgba(255, 205, 86, 0.6)", // Yellow
                      "rgba(46, 134, 193, 0.6)", // Blue shade
                      "rgba(131, 233, 211, 0.6)", // Aqua green
                      "rgba(255, 99, 132, 0.6)", // Pink
                    ],
                    borderColor: [
                      "rgba(255, 159, 64, 1)", // Orange
                      "rgba(106, 90, 205, 1)", // Slate blue (new)
                      "rgba(255, 206, 86, 1)", // Gold
                      "rgba(240, 128, 128, 1)", // Light coral (new)

                      "rgba(32, 178, 170, 1)", // Light sea green (new)
                      "rgba(54, 162, 235, 1)", // Sky blue
                      "rgba(153, 102, 255, 1)", // Purple
                      "rgba(75, 192, 192, 1)", // Light cyan
                      "rgba(89, 77, 224, 1)", // Indigo
                      "rgba(255, 205, 86, 1)", // Yellow
                      "rgba(46, 134, 193, 1)", // Blue shade
                      "rgba(131, 233, 211, 1)", // Aqua green
                      "rgba(255, 99, 132, 1)", // Pink
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: "y",
                plugins: {
                  datalabels: {
                    display: true,
                    anchor: "center",
                    align: "center",
                    color: "#000", // color of the text
                    font: {
                      size: 14, // adjust font size as needed
                      weight: "bold", // adjust font weight as needed
                    },
                    formatter: function (value, context) {
                      return value; // display the value directly
                    },
                  },
                  legend: {
                    display: false, // hide legend
                  },
                },
                scales: {
                  x: {
                    max: 10,
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 18,
                        weight: "bold", // adjust font size as needed
                      },
                    },
                  },
                },
                y: {
                  ticks: {
                    font: {
                      size: 18,
                      weight: "bold", // adjust font size as needed
                    },
                  },
                },
              }}
            />
          </div>
          <br />
        </>
      )}
      {/* </div> */}
      {/* <div className="mb-8 style ">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {" "}
          Counselor's Feedback
        </h1>
        <textarea
          className="w-full h-32 border border-gray-300 p-2 rounded-md"
          placeholder="Provide your feedback here..."
        ></textarea>
      </div> */}
      {/* <div className="flex justify-center space-x-4 mb-4"> */}
      {/* <PDFDownloadLink
              document={
                <PDFDocument
                  mbtiData={mbtiData}
                  discData={discData}
                  oceanData={oceanData}
                  riasecData={riasecData}
                  EIData={EIData}
                  hireMeData={hireMeData}
                />
              }
              fileName="test_results.pdf"
            >
              {({ loading }) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Generate as PDF
                  </button>
                )
              }
            </PDFDownloadLink> */}
      {/* <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Sava as PDF
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Send as Email
        </button> */}
      {/* </div> */}
    </>
  );
};

export default Charts;
