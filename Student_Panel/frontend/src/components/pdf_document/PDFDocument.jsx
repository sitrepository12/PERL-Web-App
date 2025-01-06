import React, { useEffect, useState, useRef } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { getChartImage } from '../chartutils/ChartUtils'; // Adjust the import path

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1px solid #CCCCCC',
    borderRadius: 5,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  chartContainer: {
    marginVertical: 20,
    height: 200,
  },
  text: {
    marginBottom: 5,
    fontSize: 12,
  },
});

const PDFDocument = ({ mbtiData , discData,oceanData, riasecData, EIData, hireMeData, }) => {
    const [mbtiChartImage, setMbtiChartImage] = useState(null);
    const [discChartImage, setDiscChartImage] = useState(null);
    const [oceanChartImage, setOceanChartImage] = useState(null);
    const [riasecChartImage, setRiasecChartImage] = useState(null);
    const [EIChartImage, setEIChartImage] = useState(null);
    const [hireMeChartImage, setHireMeChartImage] = useState(null);
  

  
    const mbtiChartRef = useRef(null);
    const discChartRef = useRef(null);
    const oceanChartRef = useRef(null);
    const riasecChartRef = useRef(null);
    const EIChartRef = useRef(null);
    const hireMeChartRef = useRef(null);
  

  useEffect(() => {
    const generateCharts = async () => {
      
        setMbtiChartImage(await getChartImage(mbtiChartRef));
        setDiscChartImage(await getChartImage(discChartRef));
        setOceanChartImage(await getChartImage(oceanChartRef));
        setRiasecChartImage(await getChartImage(riasecChartRef));
        setEIChartImage(await getChartImage(EIChartRef));
        setHireMeChartImage(await getChartImage(hireMeChartRef));
      
    };

    generateCharts();
  }, []);

  return (
    <Document>
      <Page style={styles.page}>
      <View style={styles.section}>
          <Text style={styles.header}>MBTI Test Results</Text>
          <View style={styles.chartContainer}>
            <Pie ref={mbtiChartRef} data={{
              labels: ['Introversion', 'Extraversion', 'Thinking', 'Feeling', 'Judging', 'Perceiving'],
              datasets: [{
                data: Object.values(mbtiData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED'],
              }],
            }} />
          </View>
          {mbtiChartImage && <Image src={mbtiChartImage} style={{ width: '100%', height: 200 }} />}
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>DISC Test Results</Text>
          <View style={styles.chartContainer}>
            <Pie ref={discChartRef} data={{
              labels: ['Dominance', 'Influence', 'Steadiness', 'Compliance'],
              datasets: [{
                data: Object.values(discData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED'],
              }],
            }} />
          </View>
          {discChartImage && <Image src={discChartImage} style={{ width: '100%', height: 200 }} />}
        </View>


        <View style={styles.section}>
          <Text style={styles.header}>OCEAN Test Results</Text>
          <View style={styles.chartContainer}>
            <Bar ref={oceanChartRef} data={{
              labels: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'],
              datasets: [{
                label: 'OCEAN Scores',
                data: Object.values(oceanData),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              }],
            }} />
          </View>
          {oceanChartImage && <Image src={oceanChartImage} style={{ width: '100%', height: 200 }} />}
          <Text style={styles.text}>Openness: {oceanData?.Openness}</Text>
          <Text style={styles.text}>Conscientiousness: {oceanData?.Conscientiousness}</Text>
          <Text style={styles.text}>Extraversion: {oceanData?.Extraversion}</Text>
          <Text style={styles.text}>Agreeableness: {oceanData?.Agreeableness}</Text>
          <Text style={styles.text}>Neuroticism: {oceanData?.Neuroticism}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>RIASEC Test Results</Text>
          <View style={styles.chartContainer}>
            <Pie ref={riasecChartRef} data={{
              labels: ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'],
              datasets: [{
                data: Object.values(riasecData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#FF6384', '#36A2EB'],
              }],
            }} />
          </View>
          {riasecChartImage && <Image src={riasecChartImage} style={{ width: '100%', height: 200 }} />}
        </View>

        

        <View style={styles.section}>
          <Text style={styles.header}>Emotional Intelligence Test Results</Text>
          <View style={styles.chartContainer}>
            <Bar ref={EIChartRef} data={{
              labels: ['Self-Awareness', 'Self-Management', 'Social Awareness', 'Relationship Management'],
              datasets: [{
                label: 'EI Scores',
                data: Object.values(EIData),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              }],
            }} />
          </View>
          {EIChartImage && <Image src={EIChartImage} style={{ width: '100%', height: 200 }} />}
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>HireMe Test Results</Text>
          <View style={styles.chartContainer}>
            <Pie ref={hireMeChartRef} data={{
              labels: ['Technical Skills', 'Soft Skills', 'Experience', 'Education'],
              datasets: [{
                data: Object.values(hireMeData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED'],
              }],
            }} />
          </View>
          {hireMeChartImage && <Image src={hireMeChartImage} style={{ width: '100%', height: 200 }} />}
        </View>

        
      </Page>
    </Document>
  );
};

export default PDFDocument;
