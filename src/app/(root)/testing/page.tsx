// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function Home() {
//   const [image, setImage] = useState<File | null>(null);
//   const [imageURL, setImageURL] = useState<string | null>(null);
//   const [result, setResult] = useState<string>('');
//   const [department, setDepartment] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImage(file);
//       setImageURL(URL.createObjectURL(file));
//     }
//   };

//   const handleAnalyzeImage = async (e) => {
//     if (!image) return;

//     setIsLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", image);

//       const response = await axios.post(
//         'https://microsoft-computer-vision3.p.rapidapi.com/analyze',
//         formData,
//         {
//           headers: {
//             'X-RapidAPI-Key': 'a74f98ca07msh13a3e05599ca2aep1dbfd2jsnd0b1eab05732',
//             'X-RapidAPI-Host': 'microsoft-computer-vision3.p.rapidapi.com',
//             'Content-Type': 'application/octet-stream'
//           },
//           params: {
//             visualFeatures: 'Description',
//             language: 'en'
//           }
//         }
//       );

//       const description = response.data.description.captions[0].text;
//       console.log(response);
//       setResult(description);
//       setDepartment(suggestDepartment(description));
//     } catch (error) {
//       console.error("Error analyzing image:", error);
//       setResult("Sorry, something went wrong. Please try again.");
//       setDepartment("");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const suggestDepartment = (description: string): string => {
//     const departmentMapping: { [key: string]: string } = {
//       'cat': 'Veterinary',
//       'dog': 'Veterinary',
//       'plant': 'Botany',
//       'person': 'General Medicine',
//       'eye': 'Ophthalmology',
//       'skin': 'Dermatology',
//       // Add more mappings based on your use case
//     };

//     const lowerDescription = description.toLowerCase();
//     for (const key in departmentMapping) {
//       if (lowerDescription.includes(key)) {
//         return departmentMapping[key];
//       }
//     }
//     return "General Medicine";
//   };

//   useEffect(() => {
//     return () => {
//       if (imageURL) {
//         URL.revokeObjectURL(imageURL);
//       }
//     };
//   }, [imageURL]);

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
//       <div className="w-full max-w-screen-md bg-white p-4 rounded-lg shadow-md">
//         <div className="mb-4">
//           <div className="text-4xl font-bold text-blue-500 mb-2">
//             Medical Assistant
//           </div>
//           <p className="text-gray-600 text-lg">
//             Upload an image and I'll analyze it to suggest the department you should visit.
//           </p>
//         </div>
//         <div className="mb-4">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="p-2 border border-gray-300 rounded-l-lg"
//           />
//         </div>
//         {imageURL && (
//           <div className="mb-4">
//             <img id="uploaded-image" src={imageURL} alt="Uploaded" className="max-w-full h-auto" />
//           </div>
//         )}
//         <div className="flex mb-4">
//           {isLoading ? (
//             <div className="bg-blue-500 text-gray-100 p-2 rounded-lg animate-pulse">
//               Analyzing...
//             </div>
//           ) : (
//             <button onClick={handleAnalyzeImage} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
//               Analyze Image
//             </button>
//           )}
//         </div>
//         {result && (
//           <div className="bg-green-100 p-4 rounded-lg shadow-md">
//             <p className="text-green-800 text-lg font-semibold">Prediction: {result}</p>
//             <p className="text-green-800 text-lg font-semibold">Suggested Department: {department}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  const handleAnalyzeImage = async () => {
    if (!image) return;

    setIsLoading(true);

    try {
      const imgElement = document.getElementById("uploaded-image") as HTMLImageElement;
      const model = await mobilenet.load();
      const predictions = await model.classify(imgElement);

      console.log(predictions);

      if (predictions.length > 0) {
        const description = predictions[0].className;
        setResult(description);
        setDepartment(suggestDepartment(description));
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResult("Sorry, something went wrong. Please try again.");
      setDepartment("");
    } finally {
      setIsLoading(false);
    }
  };

  const suggestDepartment = (description: string): string => {
    const departmentMapping: { [key: string]: string } = {
      "cat": "Veterinary",
      "dog": "Veterinary",
      "person": "General Medicine",
      "eye": "Ophthalmology",
      "skin": "Dermatology",
      // Add more mappings based on your use case
    };

    const lowerDescription = description.toLowerCase();
    for (const key in departmentMapping) {
      if (lowerDescription.includes(key)) {
        return departmentMapping[key];
      }
    }
    return "General Medicine";
  };

  useEffect(() => {
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-md bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <div className="text-4xl font-bold text-blue-500 mb-2">Medical Assistant</div>
          <p className="text-gray-600 text-lg">Upload an image and I'll analyze it to suggest the department you should visit.</p>
        </div>
        <div className="mb-4">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border border-gray-300 rounded-l-lg" />
        </div>
        {imageURL && (
          <div className="mb-4">
            <img id="uploaded-image" src={imageURL} alt="Uploaded" className="max-w-full h-auto" />
          </div>
        )}
        <div className="flex mb-4">
          {isLoading ? (
            <div className="bg-blue-500 text-gray-100 p-2 rounded-lg animate-pulse">Analyzing...</div>
          ) : (
            <button onClick={handleAnalyzeImage} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Analyze Image</button>
          )}
        </div>
        {result && (
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <p className="text-green-800 text-lg font-semibold">Prediction: {result}</p>
            <p className="text-green-800 text-lg font-semibold">Suggested Department: {department}</p>
          </div>
        )}
      </div>
    </div>
  );
}

