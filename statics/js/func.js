import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
console.log("new hi")
cytoscape.use( fcose );
const typeColors = {
  1: "#003f5c",
  2: "#2f4b7c",
  3: "#665191",
  4: "#a05195",
  5: "#d45087",
  6: "#f95d6a",
  7: "#ff7c43",
  8: "#ffa600"
};

const elements = {
  nodes: [
    { data: { id: "1", name: "Python with OpenCV", type: 1 } },
    {
      data: {
        id: "2",
        name: "AI based Autonomous vehicle application",
        type: 1
      }
    },
    { data: { id: "3", name: "Autonomous car ", type: 1 } },
    { data: { id: "4", name: "Color following robotic car", type: 1 } },
    { data: { id: "5", name: "Human tracking robot", type: 1 } },
    { data: { id: "6", name: "AI based Health care applications", type: 1 } },
    {
      data: {
        id: "7",
        name: "Cancer cell detection using deep learning",
        type: 1
      }
    },
    {
      data: {
        id: "8",
        name: "Brain tumor detection using deep learning",
        type: 1
      }
    },
    {
      data: {
        id: "9",
        name: "Breast cancer detection using deep learning",
        type: 1
      }
    },
    { data: { id: "10", name: "Using Hardware", type: 1 } },
    {
      data: {
        id: "11",
        name: "Skin cancer detection using deep learning",
        type: 2
      }
    },
    { data: { id: "12", name: "AI based Marketing applications", type: 2 } },
    {
      data: { id: "13", name: "Sales analysis using machine learning", type: 3 }
    },
    {
      data: {
        id: "14",
        name: "Stock market analysis using machine learning",
        type: 2
      }
    },
    {
      data: {
        id: "15",
        name: "AI based Voice assistance applications",
        type: 2
      }
    },
    { data: { id: "16", name: "Chatbot using dialogflow", type: 2 } },
    { data: { id: "17", name: "AI projects using Raspberry Pi", type: 3 } },
    {
      data: { id: "18", name: "AI projects using Nvidia Jetson Nano", type: 3 }
    },
    { data: { id: "19", name: "AI projects using FPGA", type: 3 } },
    { data: { id: "20", name: "AI projects using PC/Laptops", type: 3 } },
    { data: { id: "21", name: "AI Projects using Matlab﻿", type: 3 } },
    { data: { id: "22", name: "AI projects based on application", type: 3 } },
    { data: { id: "23", name: "AI based Interview chatbot ", type: 3 } },
    { data: { id: "24", name: "AI based Food ordering Chatbot", type: 3 } },
    { data: { id: "25", name: "AI based Receptionist bot ", type: 4 } },
    { data: { id: "26", name: "AI based custom voice assistance", type: 4 } },
    { data: { id: "27", name: "AI based Agriculture applications", type: 5 } },
    {
      data: {
        id: "28",
        name: "AI based Plant disease classification using deep learning",
        type: 4
      }
    },
    {
      data: { id: "29", name: "Plant recognition using deep learning", type: 3 }
    },
    {
      data: {
        id: "30",
        name: "Fruits recognition using deep learning",
        type: 2
      }
    },
    {
      data: {
        id: "31",
        name: "Weed plant detection using deep learning",
        type: 3
      }
    },
    {
      data: {
        id: "32",
        name: "Quality assessment using machine learning",
        type: 2
      }
    },
    {
      data: { id: "33", name: "AI based Space research application", type: 2 }
    },
    {
      data: {
        id: "34",
        name: "semantic segmentation in satellite image",
        type: 2
      }
    },
    {
      data: { id: "35", name: "AI based cyber security application ", type: 2 }
    },
    { data: { id: "36", name: "Intrusion detection ", type: 2 } },
    { data: { id: "37", name: "Malware identification ", type: 2 } },
    {
      data: {
        id: "38",
        name: "Spam SMS detection using machine learning",
        type: 2
      }
    },
    { data: { id: "39", name: "AI based education applications", type: 2 } },
    { data: { id: "40", name: "Student performance analysis", type: 4 } },
    { data: { id: "41", name: "Attendance system", type: 6 } },
    {
      data: {
        id: "42",
        name: "AI based Video processing applications",
        type: 4
      }
    },
    { data: { id: "43", name: "AI based Business applications", type: 4 } },
    { data: { id: "44", name: "AI based Insurance applications", type: 5 } },
    { data: { id: "45", name: "AI based Banking applications", type: 3 } },
    { data: { id: "46", name: "AI based Crime applications", type: 3 } },
    { data: { id: "47", name: "AI based social media applications", type: 7 } },
    { data: { id: "48", name: "Python with OpenCV", type: 7 } },
    {
      data: {
        id: "49",
        name: "AI based Autonomous vehicle application",
        type: 8
      }
    },
    { data: { id: "50", name: "Autonomous car ", type: 5 } },
    { data: { id: "51", name: "Color following robotic car", type: 5 } },
    { data: { id: "52", name: "Human tracking robot", type: 5 } },
    { data: { id: "53", name: "AI based Health care applications", type: 5 } },
    {
      data: {
        id: "54",
        name: "Cancer cell detection using deep learning",
        type: 5
      }
    },
    {
      data: {
        id: "55",
        name: "Brain tumor detection using deep learning",
        type: 5
      }
    },
    {
      data: {
        id: "56",
        name: "Breast cancer detection using deep learning",
        type: 8
      }
    },
    { data: { id: "57", name: "Using Hardware", type: 5 } },
    {
      data: {
        id: "58",
        name: "Skin cancer detection using deep learning",
        type: 8
      }
    },
    { data: { id: "59", name: "AI based Marketing applications", type: 8 } },
    {
      data: { id: "60", name: "Sales analysis using machine learning", type: 8 }
    },
    {
      data: {
        id: "61",
        name: "Stock market analysis using machine learning",
        type: 8
      }
    },
    {
      data: {
        id: "62",
        name: "AI based Voice assistance applications",
        type: 8
      }
    },
    { data: { id: "63", name: "Chatbot using dialogflow", type: 8 } },
    { data: { id: "64", name: "AI projects using Raspberry Pi", type: 8 } },
    {
      data: { id: "65", name: "AI projects using Nvidia Jetson Nano", type: 8 }
    },
    { data: { id: "66", name: "AI projects using FPGA", type: 8 } }
  ],
  edges: [
    { data: { id: "2-1", source: "2", target: "1", value: 1 } },
    { data: { id: "3-1", source: "3", target: "1", value: 8 } },
    { data: { id: "4-1", source: "4", target: "1", value: 10 } },
    { data: { id: "4-3", source: "4", target: "3", value: 6 } },
    { data: { id: "5-1", source: "5", target: "1", value: 1 } },
    { data: { id: "6-1", source: "6", target: "1", value: 1 } },
    { data: { id: "7-1", source: "7", target: "1", value: 1 } },
    { data: { id: "8-1", source: "8", target: "1", value: 1 } },
    { data: { id: "9-1", source: "9", target: "1", value: 2 } },
    { data: { id: "10-1", source: "10", target: "1", value: 1 } },
    { data: { id: "12-11", source: "12", target: "11", value: 1 } },
    { data: { id: "12-4", source: "12", target: "4", value: 3 } },
    { data: { id: "12-3", source: "12", target: "3", value: 3 } },
    { data: { id: "12-1", source: "12", target: "1", value: 5 } },
    { data: { id: "13-12", source: "13", target: "12", value: 1 } },
    { data: { id: "14-12", source: "14", target: "12", value: 1 } },
    { data: { id: "15-12", source: "15", target: "12", value: 1 } },
    { data: { id: "16-12", source: "16", target: "12", value: 1 } },
    { data: { id: "18-17", source: "18", target: "17", value: 4 } },
    { data: { id: "19-17", source: "19", target: "17", value: 4 } },
    { data: { id: "19-18", source: "19", target: "18", value: 4 } },
    { data: { id: "20-17", source: "20", target: "17", value: 4 } },
    { data: { id: "20-18", source: "20", target: "18", value: 4 } },
    { data: { id: "20-19", source: "20", target: "19", value: 4 } },
    { data: { id: "21-17", source: "21", target: "17", value: 3 } },
    { data: { id: "21-18", source: "21", target: "18", value: 3 } },
    { data: { id: "21-19", source: "21", target: "19", value: 3 } },
    { data: { id: "21-20", source: "21", target: "20", value: 4 } },
    { data: { id: "22-17", source: "22", target: "17", value: 3 } },
    { data: { id: "22-18", source: "22", target: "18", value: 3 } },
    { data: { id: "22-19", source: "22", target: "19", value: 3 } },
    { data: { id: "22-20", source: "22", target: "20", value: 3 } },
    { data: { id: "22-21", source: "22", target: "21", value: 5 } },
    { data: { id: "23-17", source: "23", target: "17", value: 3 } },
    { data: { id: "23-18", source: "23", target: "18", value: 3 } },
    { data: { id: "23-19", source: "23", target: "19", value: 3 } },
    { data: { id: "23-20", source: "23", target: "20", value: 3 } },
    { data: { id: "23-21", source: "23", target: "21", value: 4 } },
    { data: { id: "23-22", source: "23", target: "22", value: 4 } },
    { data: { id: "24-17", source: "24", target: "17", value: 3 } },
    { data: { id: "24-18", source: "24", target: "18", value: 3 } },
    { data: { id: "24-19", source: "24", target: "19", value: 3 } },
    { data: { id: "24-20", source: "24", target: "20", value: 3 } },
    { data: { id: "24-21", source: "24", target: "21", value: 4 } },
    { data: { id: "24-22", source: "24", target: "22", value: 4 } },
    { data: { id: "24-23", source: "24", target: "23", value: 4 } },
    { data: { id: "24-13", source: "24", target: "13", value: 2 } },
    { data: { id: "24-12", source: "24", target: "12", value: 9 } },
    { data: { id: "25-24", source: "25", target: "24", value: 2 } },
    { data: { id: "25-12", source: "25", target: "12", value: 7 } },
    { data: { id: "26-25", source: "26", target: "25", value: 13 } },
    { data: { id: "26-24", source: "26", target: "24", value: 1 } },
    { data: { id: "26-12", source: "26", target: "12", value: 12 } },
    { data: { id: "27-25", source: "27", target: "25", value: 4 } },
    { data: { id: "27-12", source: "27", target: "12", value: 31 } },
    { data: { id: "27-17", source: "27", target: "17", value: 1 } },
    { data: { id: "27-26", source: "27", target: "26", value: 1 } },
    { data: { id: "28-12", source: "28", target: "12", value: 17 } },
    { data: { id: "28-24", source: "28", target: "24", value: 5 } },
    { data: { id: "28-26", source: "28", target: "26", value: 5 } },
    { data: { id: "28-25", source: "28", target: "25", value: 1 } },
    { data: { id: "28-27", source: "28", target: "27", value: 1 } },
    { data: { id: "29-12", source: "29", target: "12", value: 8 } },
    { data: { id: "29-28", source: "29", target: "28", value: 1 } },
    { data: { id: "30-24", source: "30", target: "24", value: 1 } },
    { data: { id: "30-28", source: "30", target: "28", value: 1 } },
    { data: { id: "30-12", source: "30", target: "12", value: 2 } },
    { data: { id: "31-24", source: "31", target: "24", value: 1 } },
    { data: { id: "32-31", source: "32", target: "31", value: 2 } },
    { data: { id: "32-12", source: "32", target: "12", value: 3 } },
    { data: { id: "32-24", source: "32", target: "24", value: 2 } },
    { data: { id: "32-28", source: "32", target: "28", value: 1 } },
    { data: { id: "33-12", source: "33", target: "12", value: 1 } },
    { data: { id: "34-12", source: "34", target: "12", value: 2 } },
    { data: { id: "34-28", source: "34", target: "28", value: 1 } },
    { data: { id: "35-12", source: "35", target: "12", value: 3 } },
    { data: { id: "35-30", source: "35", target: "30", value: 2 } },
    { data: { id: "36-12", source: "36", target: "12", value: 3 } },
    { data: { id: "36-35", source: "36", target: "35", value: 3 } },
    { data: { id: "36-30", source: "36", target: "30", value: 2 } },
    { data: { id: "37-35", source: "37", target: "35", value: 2 } },
    { data: { id: "37-36", source: "37", target: "36", value: 2 } },
    { data: { id: "37-12", source: "37", target: "12", value: 2 } },
    { data: { id: "37-30", source: "37", target: "30", value: 1 } },
    { data: { id: "38-35", source: "38", target: "35", value: 2 } },
    { data: { id: "38-36", source: "38", target: "36", value: 2 } },
    { data: { id: "38-37", source: "38", target: "37", value: 2 } },
    { data: { id: "38-12", source: "38", target: "12", value: 2 } },
    { data: { id: "38-30", source: "38", target: "30", value: 1 } },
    { data: { id: "39-35", source: "39", target: "35", value: 2 } },
    { data: { id: "39-36", source: "39", target: "36", value: 2 } },
    { data: { id: "39-37", source: "39", target: "37", value: 2 } },
    { data: { id: "39-38", source: "39", target: "38", value: 2 } },
    { data: { id: "39-12", source: "39", target: "12", value: 2 } },
    { data: { id: "39-30", source: "39", target: "30", value: 1 } },
    { data: { id: "40-26", source: "40", target: "26", value: 1 } },
    { data: { id: "41-26", source: "41", target: "26", value: 1 } },
    { data: { id: "42-25", source: "42", target: "25", value: 2 } },
    { data: { id: "42-26", source: "42", target: "26", value: 3 } },
    { data: { id: "43-42", source: "43", target: "42", value: 2 } },
    { data: { id: "43-26", source: "43", target: "26", value: 2 } },
    { data: { id: "43-25", source: "43", target: "25", value: 1 } },
    { data: { id: "44-12", source: "44", target: "12", value: 3 } },
    { data: { id: "44-27", source: "44", target: "27", value: 1 } },
    { data: { id: "44-28", source: "44", target: "28", value: 1 } },
    { data: { id: "45-29", source: "45", target: "29", value: 3 } },
    { data: { id: "45-12", source: "45", target: "12", value: 1 } },
    { data: { id: "46-29", source: "46", target: "29", value: 2 } },
    { data: { id: "48-47", source: "48", target: "47", value: 1 } },
    { data: { id: "49-48", source: "49", target: "48", value: 2 } },
    { data: { id: "49-26", source: "49", target: "26", value: 1 } },
    { data: { id: "49-28", source: "49", target: "28", value: 1 } },
    { data: { id: "49-12", source: "49", target: "12", value: 1 } },
    { data: { id: "50-27", source: "50", target: "27", value: 3 } },
    { data: { id: "50-12", source: "50", target: "12", value: 2 } },
    { data: { id: "51-50", source: "51", target: "50", value: 1 } },
    { data: { id: "51-25", source: "51", target: "25", value: 1 } },
    { data: { id: "52-50", source: "52", target: "50", value: 9 } },
    { data: { id: "52-27", source: "52", target: "27", value: 2 } },
    { data: { id: "52-12", source: "52", target: "12", value: 2 } },
    { data: { id: "53-52", source: "53", target: "52", value: 1 } },
    { data: { id: "53-40", source: "53", target: "40", value: 1 } },
    { data: { id: "54-52", source: "54", target: "52", value: 1 } },
    { data: { id: "55-52", source: "55", target: "52", value: 2 } },
    { data: { id: "55-50", source: "55", target: "50", value: 1 } },
    { data: { id: "55-27", source: "55", target: "27", value: 1 } },
    { data: { id: "56-52", source: "56", target: "52", value: 6 } },
    { data: { id: "56-50", source: "56", target: "50", value: 12 } },
    { data: { id: "56-40", source: "56", target: "40", value: 1 } },
    { data: { id: "56-55", source: "56", target: "55", value: 1 } },
    { data: { id: "56-27", source: "56", target: "27", value: 21 } },
    { data: { id: "56-12", source: "56", target: "12", value: 19 } },
    { data: { id: "56-17", source: "56", target: "17", value: 1 } },
    { data: { id: "56-26", source: "56", target: "26", value: 2 } },
    { data: { id: "56-42", source: "56", target: "42", value: 5 } },
    { data: { id: "56-49", source: "56", target: "49", value: 4 } },
    { data: { id: "57-50", source: "57", target: "50", value: 1 } },
    { data: { id: "57-56", source: "57", target: "56", value: 1 } },
    { data: { id: "58-56", source: "58", target: "56", value: 1 } },
    { data: { id: "58-42", source: "58", target: "42", value: 1 } },
    { data: { id: "58-49", source: "58", target: "49", value: 1 } },
    { data: { id: "59-56", source: "59", target: "56", value: 7 } },
    { data: { id: "59-49", source: "59", target: "49", value: 7 } },
    { data: { id: "59-28", source: "59", target: "28", value: 6 } },
    { data: { id: "59-58", source: "59", target: "58", value: 1 } },
    { data: { id: "59-12", source: "59", target: "12", value: 4 } },
    { data: { id: "60-59", source: "60", target: "59", value: 15 } },
    { data: { id: "60-56", source: "60", target: "56", value: 5 } },
    { data: { id: "60-49", source: "60", target: "49", value: 6 } },
    { data: { id: "60-58", source: "60", target: "58", value: 2 } },
    { data: { id: "61-49", source: "61", target: "49", value: 1 } },
    { data: { id: "61-59", source: "61", target: "59", value: 4 } },
    { data: { id: "61-60", source: "61", target: "60", value: 2 } },
    { data: { id: "62-49", source: "62", target: "49", value: 2 } },
    { data: { id: "62-59", source: "62", target: "59", value: 6 } },
    { data: { id: "62-61", source: "62", target: "61", value: 2 } },
    { data: { id: "62-60", source: "62", target: "60", value: 5 } },
    { data: { id: "62-58", source: "62", target: "58", value: 1 } },
    { data: { id: "62-56", source: "62", target: "56", value: 1 } },
    { data: { id: "63-56", source: "63", target: "56", value: 9 } },
    { data: { id: "63-59", source: "63", target: "59", value: 17 } },
    { data: { id: "63-60", source: "63", target: "60", value: 13 } },
    { data: { id: "63-49", source: "63", target: "49", value: 7 } },
    { data: { id: "63-58", source: "63", target: "58", value: 2 } },
    { data: { id: "63-42", source: "63", target: "42", value: 1 } },
    { data: { id: "63-62", source: "63", target: "62", value: 6 } },
    { data: { id: "63-61", source: "63", target: "61", value: 3 } },
    { data: { id: "64-60", source: "64", target: "60", value: 5 } },
    { data: { id: "64-49", source: "64", target: "49", value: 5 } },
    { data: { id: "64-63", source: "64", target: "63", value: 6 } },
    { data: { id: "64-58", source: "64", target: "58", value: 2 } },
    { data: { id: "64-59", source: "64", target: "59", value: 4 } },
    { data: { id: "64-62", source: "64", target: "62", value: 3 } },
    { data: { id: "64-61", source: "64", target: "61", value: 2 } },
    { data: { id: "64-56", source: "64", target: "56", value: 1 } },
    { data: { id: "65-56", source: "65", target: "56", value: 5 } },
    { data: { id: "65-63", source: "65", target: "63", value: 12 } },
    { data: { id: "65-49", source: "65", target: "49", value: 5 } },
    { data: { id: "65-64", source: "65", target: "64", value: 4 } },
    { data: { id: "65-59", source: "65", target: "59", value: 10 } },
    { data: { id: "65-62", source: "65", target: "62", value: 6 } },
    { data: { id: "65-61", source: "65", target: "61", value: 2 } },
    { data: { id: "65-60", source: "65", target: "60", value: 9 } },
    { data: { id: "65-58", source: "65", target: "58", value: 1 } },
    { data: { id: "65-12", source: "65", target: "12", value: 1 } },
    { data: { id: "66-64", source: "66", target: "64", value: 5 } },
    { data: { id: "66-65", source: "66", target: "65", value: 7 } },
    { data: { id: "66-49", source: "66", target: "49", value: 3 } },
    { data: { id: "66-63", source: "66", target: "63", value: 5 } },
    { data: { id: "66-59", source: "66", target: "59", value: 5 } },
    { data: { id: "66-62", source: "66", target: "62", value: 5 } },
    { data: { id: "66-61", source: "66", target: "61", value: 2 } },
    { data: { id: "66-60", source: "66", target: "60", value: 5 } },
    { data: { id: "66-58", source: "66", target: "58", value: 1 } }
  ]
};

var cy = (window.cy = cytoscape({
  container: document.getElementById("cy"),

  boxSelectionEnabled: false,
  autounselectify: true,

  layout: {
    name: "fcose",
    nodeDimensionsIncludeLabels: false,
    animate: false
  },

  style: [
    {
      selector: "node",
      style: {
        "background-color": (el) => typeColors[el.attr("type")],
        // @ts-ignore
        "background-height": "40%",
        "background-width": "40%",
        "border-color": "#fff",
        "border-width": "2%",
        color: "#000",
        width: 10,
        height: 10,
        shape: "ellipse",
        title: "data(name)",
        "font-family": "Helvetica",
        "font-size": 8,
        "min-zoomed-font-size": 8,
        "overlay-opacity": 0
      }
    },
    {
      selector: "edge",
      style: {
        "line-color": "#999",
        "overlay-opacity": 0,
        "target-arrow-color": "#999",
        "target-arrow-shape": "triangle",
        // @ts-ignore
        "target-distance-from-node": 4,
        width: 0.5,
        "source-arrow-shape": "none"
        // @ts-ignore
      }
    }
  ],

  elements
}));
