/* eslint-disable @next/next/no-img-element */
"use client";

import FAQ from "@/components/Faq";
import Footer from "@/components/Footer";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Disease } from "@/models/Disease";
import { Department } from "@/models/utils/Department";
import { faArrowLeft, faArrowRight, faCheckCircle, faHandHolding, faHandHoldingHeart, faHospital, faUserDoctor, faVialVirus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { set } from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const EntityBox = ({ name, photoUrl }: {
    name: string;
    photoUrl: string;
    
}) => {
  return (
    <div className="w-1/5">
    <div className=" mb-6 bg-white w-2/3">
      <img src={photoUrl} alt={name} className="w-full h-20 object-cover rounded-lg mb-2" />
      <div className="text-center text-gray-400">{name}</div>
    </div>
    </div>
  );
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [departmentData, setDepartmentData] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [diseaseData, setDiseaseData] = useState<Disease[]>([]);



  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-all-departments");
      const data = await response.json();
      setDepartmentData(data.departments);
      
    } catch (error) {
      setError(true);
      console.error(error);
    } finally{
      setLoading(false);
    }
  }
  , [setDepartmentData]);

  const fetchDiseases = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-all-diseases");
      const data = await response.json();
      setDiseaseData(data.data2);
      
    } catch (error) {
      setError(true);
      console.error(error);
    } finally{
      setLoading(false);
    }
  }
  , [setDiseaseData]);



  useEffect(() => {

    fetchDepartments();
    fetchDiseases();
  
  }, [fetchDepartments, fetchDiseases])



  const dummySkills = [
    {
      id: 1,
      image: "https://s3-alpha-sig.figma.com/img/de86/24e6/39f85edb6078e19d7a6e7fdbb9054f70?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LoGmoeR8a8XfAz1wsq7RlyaJ8qEH-b6l5HDYNKxGL7M1lPpUBnFJVr91qQqCcxK3wfXB-2vsb6oSoFMxeZgpz8n6DEfyafIPEGOFKkWU~Q-xSxlsCdiGxQmQzutX4Sr~rjMyCms5p1dj8kElSW1IKc1fQ5YsRwYxSX0lxkdfsOMTCpUQB2Hn3vAlHKGo~ge-bIzW-b1wcaCvtPU~ZUzq2zkJri5ois58jydxGca4vleTq11GX44~iRIQsJ70Utln1vjxeut~AmDFkY3YrALUKm65PmtC7eXrDI9Sq1C-6FTyGXW4D4rVh7gQd0BtXsI4EFkiGNBlAj2twDpqcAPxgg__",
    },
    {
      id: 2,
      image: "https://s3-alpha-sig.figma.com/img/b284/93da/72ad49e23d6d55549e1b5970acfba4c0?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GH7KVhvsWBV43zNw2Snq15SYEPEDMEc-uR24rJX8QmwMTMSHyLSULa3X2ohDDMXASYnNYk2K3Le-2e-xqhooCB0immiOEJLGlKiDaDTqRraxuyHr3viznjul2XZR-~CRcE4Wv90zcol0PE1D5R9kbhfBF3lxrG6-Y6v0DFlFLZGL2BvDu~L-57x9BBI8Ap3uGMsTNJo9bc1aOpLOQtvXWYoB1F96HfFZj90FeNsB42T1rjqY8ZFOJT9DsoRqtU13K~J~V2OGWTbGP~w0QgKieswBqdhgjxq4nErta1qRczlx0RhN0Zqwwg36kKcit0hpJwCIy7N-QoEH1uSTDHgSeg__",
    },
    {
      id: 3,
      image: "https://s3-alpha-sig.figma.com/img/de86/24e6/39f85edb6078e19d7a6e7fdbb9054f70?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LoGmoeR8a8XfAz1wsq7RlyaJ8qEH-b6l5HDYNKxGL7M1lPpUBnFJVr91qQqCcxK3wfXB-2vsb6oSoFMxeZgpz8n6DEfyafIPEGOFKkWU~Q-xSxlsCdiGxQmQzutX4Sr~rjMyCms5p1dj8kElSW1IKc1fQ5YsRwYxSX0lxkdfsOMTCpUQB2Hn3vAlHKGo~ge-bIzW-b1wcaCvtPU~ZUzq2zkJri5ois58jydxGca4vleTq11GX44~iRIQsJ70Utln1vjxeut~AmDFkY3YrALUKm65PmtC7eXrDI9Sq1C-6FTyGXW4D4rVh7gQd0BtXsI4EFkiGNBlAj2twDpqcAPxgg__",
    },
    {
      id: 4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiyZAgVK4djn7BYoWmR9VQAZyaueftAjFtlw&s",
    },
    {
      id: 5,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.easyread.co%2Ftop-10-data-scientist-skills-you-should-know-f22a90c3e4f2&psig=AOvVaw2ifwB9kjYejzLT6F385OFh&ust=1714652757878000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKiovde57IUDFQAAAAAdAAAAABAE",
    },
    // Add more dummy data as needed
  ];

  let displayedSkills = dummySkills.slice(currentIndex2, currentIndex2 + 3);

  let displayedDoctors = dummySkills.slice(currentIndex, currentIndex + 3);

  const handleArrow = (direction: string) => {
    if (direction === "left") {
      setCurrentIndex2((prevIndex) => (prevIndex === 0 ? dummySkills.length - 1 : prevIndex - 1));
    } else {
      setCurrentIndex2((prevIndex) => (prevIndex === dummySkills.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const handlArrowClick = (direction : string) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? dummySkills.length - 1 : prevIndex - 1));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex === dummySkills.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const handlArrowClick2 = (direction : string) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? dummySkills.length - 1 : prevIndex - 1));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex === dummySkills.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const entities = [
    { name: 'Dentistry', photoUrl: '/doctors.jpg' },
    { name: 'Primary Care', photoUrl: '/labs.jpg' },
    { name: 'Cardiology', photoUrl: '/hospitals.jpg' },
    { name: 'MRI Resonance', photoUrl: '/medical_store.jpg' },
    { name: 'Blood Test', photoUrl: '/hospitals.jpg' },
    { name: 'Piscologist', photoUrl: '/labs.jpg' },
    { name: 'Laboratory', photoUrl: '/hospitals.jpg' },
    { name: 'X Ray', photoUrl: '/medical_store.jpg' },
  ];
  return (
    <>

   {/* <FormError message={departmentData.length === 0 ? "No departments found" : ""} /> */}
    <div className="bg-blue-100">
    <div className='pt-20 max-w-screen-xl flex relative flex-col justify-center items-center bg-blue-100 ml-40'>

        <div className='flex bg-blue-100 flex-col-reverse md:flex-row justify-around max-w-0.7 w-full rounded-2xl'>

            <div className=' flex-col items-center justify-around  w-full md:w-1/2'>

                <h1 className='bg-cyan-900 inline-block text-transparent bg-clip-text text-2xl font-semibold tracking-wide'>
                Skip the travel! Take Online
                </h1>
                <br />
                <br />
                <h1 className='bg-cyan-900 inline-block text-transparent bg-clip-text text-5xl font-semibold tracking-normal'>
                Doctor <span className="text-blue-400">Consultation</span>
                </h1>
                <br />

                 <div className='mt-3 text-xl text-gray-500 gap-4 flex-col flex' >
                <p className='flex flex-wrap gap-3 font-semibold'>
                Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.
                </p>
            </div>
                <br />
                <div className='flex flex-col md:flex-row gap-5'>
                  <Link href='/consult'>
                    <button className='border-2 rounded-xl px-2 py-2 bg-blue-500 hover:bg-blue-600 text-white min-w-44'>
                      Consult Now With AI
                    </button>
                    </Link>
                </div>


            <br />
            </div>
            <div className='flex justify-center items-center'>
                <img
                src="https://s3-alpha-sig.figma.com/img/7804/e5f2/776e41d6b125a1ff07effac37d6ff11b?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=azrpMEf-WLIMwNMGxho~iwuoNMDCWcSrE2YB-v08OpaefmYH6cG2hG67oPurv7rBoyj3s0RkQiI6UJaB6SbdpQJFpZwnokJNter~Yu7uMYcDWkyTqpd5Xf2xdcb0RR6hNDD3Dahe6CeVUz9Madtj3KowUZoXiTPwiXsemMgXQMnf8zvjsjcqlvmniKf4879kxU-p2TC5kvkc6ypltra89THgS3hVJcCL2WSCkXuY3k5Psba~H1Dr1Qbf7U40vwyBFQ-2ZTRK4z4R4LnqNBfRciewnRgfPPROGujPggpVpj5oYAo3GF-7yQ5B9ARTudx0iJiI3XuugyCXZef6TmyD2w__"
                alt='Loading image'
                className='rounded-3xl bg-clip-border w-10/12'
                />
            </div>


            <div className='flex flex-col items-center justify-center mt-48 min-h-full'>
            <div className='flex flex-row md:absolute md:left-0 justify-between bottom-0 bg-gray-50 p-4 rounded-t-lg w-full max-w-screen-xl px-10 py-10 z-50 shadow-lg'>
                    <div className='flex justify-center items-center'>
                    <SearchBar value="Ex Doctor, Hospital" />
                    </div>
                    <div className='flex justify-center items-center'>
                    <SearchBar value="Ex Surgeon, Cardiologist" />
                    </div>
                    <div className='flex justify-center items-center'>
                    <SearchBar value="Set Your location" />
                    </div>
                    <div className='flex justify-center items-center'>
                    <button className='text-white bg-blue-500 bg-opacity-90 px-4 py-3 rounded-xl'>Search</button>
                    </div>
                </div> 
                {/* <div className="flex flex-col items-center justify-center z-50 top-full left-1/2 absolute">
                  <div className="mt-10">You may be looking for</div>
                  <div className="grid grid-cols-5 gap-5 flex-row flex-wrap items-center justify-center z-50 absolute">
                  {entities.map((entity, index) => (
                 <EntityBox key={index} name={entity.name} photoUrl={entity.photoUrl} />
                  ))}
                 </div>
                </div> */}
                </div>
                </div>
        </div>
        </div>

         <div className="flex items-center justify-center gap-5 pt-10 pb-4 w-full">
      <div className="max-w-screen-lg p-4 bg-white">
      <div className="flex justify-center items-center p-5">
      </div>
      <div className="flex items-center justify-center gap-5 pb-4">
      <FontAwesomeIcon icon={faArrowLeft} onClick={() => handleArrow("left")} className="text-gray-600 p-3 text-lg hover:text-black rounded-full bg-white" />
      <FontAwesomeIcon icon={faArrowRight} onClick={() => handleArrow("right")} className="text-gray-600 p-3 text-lg hover:text-black rounded-full bg-white" />
      </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
     {displayedSkills.map((skill) => (
        <div key={skill.id} className="border h-52 w-80 border-gray-300 p-4 rounded-3xl bg-white flex flex-col justify-center items-center">
          <img src={skill.image} alt='/' className='h-full w-full' />
        </div>
      ))}
      </div>
      </div>
      </div>

      <div className="specialization-box flex flex-col bg-blue-50">
        <div className="flex items-center justify-center">
      <h2 className="text-3xl font-bold mb-7 mt-10 text-blue-900">Find My Specialisation</h2>
      </div>
      <div className="flex flex-wrap gap-7 justify-center items-center max-w-screen-2xl my-2">


        { departmentData &&
          departmentData.map((department, index) => {
            return (
              <div key={index} className="flex flex-col items-center justify-center w-1/5">
                <div className="bg-white rounded-lg p-4">
                  <Image
                    src={department.image || "/hospitals.jpg"}
                    alt="Department"
                    width={100}
                    height={100}
                  ></Image>
                  <h2 className="text-gray-600">{department.name}</h2>
                </div>
              </div>
            
            )
          })
        }

      
        {/* {entities.map((entity, index) => (
          <EntityBox key={index} name={entity.name} photoUrl={entity.photoUrl} />
        ))} */}
      </div>
      <div className="flex items-center justify-center m-5">
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">View All</button>
      </div>
    </div> 

    <div className="flex items-center justify-center gap-5 pt-10 pb-4 w-full">
      <div className="max-w-screen-lg p-4 bg-white">
      <div className="flex justify-center items-center p-5">
      </div>
      <div className="flex items-center justify-center">
      <h2 className="text-3xl font-bold mb-4 mt-10 text-blue-900">Our Medical Specialist</h2>
      </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
     {displayedDoctors.map((skill) => (
      // eslint-disable-next-line react/jsx-key
      <div className="flex flex-col justify-center items-center">
        <div key={skill.id} className="border h-96 w-80 border-gray-300 p-4 rounded-t-full bg-blue-200 flex flex-col justify-center items-center ">
          <img src={skill.image} alt='/' className='h-1/2 w-1/2' />
        </div>
        <h1 className="text-gray-600">Hiuohpbini</h1>
        <h2 className="text-gray-400">yfugiviy</h2>
        </div>
      ))}
      </div>
      <div className="flex items-center justify-center gap-5 pb-4">
      <FontAwesomeIcon icon={faArrowLeft} onClick={() => handlArrowClick("left")} className="text-gray-600 p-3 text-lg hover:text-black rounded-full bg-white" />
      <FontAwesomeIcon icon={faArrowRight} onClick={() => handlArrowClick("right")} className="text-gray-600 p-3 text-lg hover:text-black rounded-full bg-white" />
      </div>
      </div>
      </div>

      <div className="patient-caring-div flex flex-row items-center justify-around p-10 bg-blue-100 rounded-lg shadow-lg">
      <div className="images-container flex">
        <img src="https://s3-alpha-sig.figma.com/img/655b/c5ee/65d5b807171dc49fec96d7ce51d323d1?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aGAFpB-o7BWJ0ietg0xwfVSCnaVodPMlmihxUFw8vI47my8qT4hXmM73RSW3BE~lcqTtiNSzy4-dlTQAwP7jCGuBWJS98Ov1Xu6Zodn-fD6kCbXKtAWIZAhqMKH9~A4Bq1UAqKqu8-LfpB8130z2gy8M3CTGUjvjxN65NZrn827PSvoQk8l1rfmdXSBZ2b9C59AYHhjNpG7~Yw33m9207Dh~B3g3Ndp4U8NEVV62YA0gMD1RnR-LOLhBxvq-ORj1iWxFKEuvlxZ3WXQNvbSjFgAuoo~f5zl6NbODD~1t94Mh1k89c2EU6NE5Qjn7VYdRc4yRhEdtPotbC1hgwnWw0A__" alt="Patient" className="w-80 h-48 object-cover rounded-md border-4 border-white shadow-lg z-10 -mr-8 mt-32" />
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABLCAYAAACP84LNAAAAAXNSR0IArs4c6QAAIABJREFUeF7tfWeYJFd19ltdqXOcnrgTdjZnaaUVShhJCISQEKAEEpIDGDAGY2wyBiySCR/Y5rH9YFu2CZ8/Y2xjTLQAIRDKYaN2V5t3wk7smenclas+n3OrZmaF8ONf5o/60Tw921Ndde896T3vOfdKwguvX+kKSL/Sp7/wcLwggF+xErwggBcE8CtegV/x46V73vWue6RYDLFYDEAMiLnwXXr3Abi/MLwYX0P/0fXhK/p3+FF0Df31udf78GHbLlwbCHwXrk+f/M9fvv/8V4vxn/96vs+Wh7zqerouWgMtWgcae3hL8cjzn0uf0Vjo09UzCOgz34frulhYWMD0/DR2X3A5UukE2o0qP56/F/5I9/z+uwJ6uCSF3kjyEPgxQKJbe+fNaPkaHlwktJVLZFle/gddG/0EQRAKWDzccTw4tg/P8+AFYvh0zf/k9cuui8a2eoyrf3/uvVePj36n+dD4VUm8Ry96Hv09ei690xzoeiGAYFk00aLS4rdaLUxOTiKVLWDnzgvQatbhuzZomWnedC3f+6Pv/P2AB0NaTBKPHkg39j3+96pVXV7U1RNePRlxLQ1a/CZJ8vLiR9J3HQkd21oeBA3kly3scz9/7oKIZ6yEskjr/zvtj76zeg606PQdLSbeo79Fz1ttefSZJwmlee6P4zjodDqYm5+FFFOxc+dFMNp1+L7N/iASJgmJx/Hhd/yeEIAkQVZ8vOyGlyOZUdlN/PT7D6JjdJYlvnqy0XdWT0aShLasvk5MZkWj2AJsD4bjsSZEGvU/sYD/7prVSjC8dg227LgAsgJ4joUHfvgAXHdFkZ5v7JEAFEVZHr9Mc/ED+DGJ12C1VaweSzQHmo9pmpivzKPZ7mDXzhdBjvmwzKZYX9JwSdyLruV1+tDvvj2QYiSAAIoMXHX9K6CqCjzfx6MP/BitpilMZdXC8qKKVV4eLP0qflZ/FrkheVny/HA3QNtyzhMAff7fuYxfZiXR2CKNp8dv2bYJL3/Vy5HNF7C0UMWXv/S3MA33eS1lWflCCyABRJ/FJAme60GSRTBYPYbVv692PZWFBSwuLWHNmmH09Q3ANBqguMACkMN1oDWIXNAHfudtAS9czFvx2QjIi6ySOmnPik9/rv/k77PbEddEryi2SOTfwpdPGhVI8LyAB8ECCXwYHSHo1a/n+t7z/rhqQSKXESBATAJPlO5EC0jvQSDel5Vj1Vyi78oxCbT4pKWxKAYEgOk4SOjaeYsvnGzAIdKnGBYIja43GpianUJvzxoMDgzCdtoIPBEzzhNAEHCQZuV531veGsYAhxd59WtlQcj8hP9a1o4QIvC/aeIkgPOC+cqkV/wxmV8AKCo0PQ05pvDgTKON+fm5ZYH/Mkt4vngQaebiQh1jp8chBxISyThGNw5Cz2V4RhIjthXliO7PgTccMwlAJQGQJSxbcQwNw0AmERexMHLVsgxFU+FLMQSeC8ey0W61cG56CoqWwIZ1m+A5BnzfXXY39EwSMD2TwUcYiKX3vPmNtHoIQvchh0q4OriQe3quAM4TxnMs4LluKBKq5wdwPR9d/RuRLwzwREkA7U4De5/+EfvbWEzhBVttTecFulU6Qp9T0Du4/zBaTQOKqkPXE4hrGuB66O0ton9dPyvG+cGalEaguMgCJFlCQlZY+1ejoPMUksQYCxGTSospw/d8WLaF2dkZtFsGNmzYxOL2XBsBWUfo7+k5kXuLYCpbxh++6TfPE8Cy+yCJk7Yu4+HzJ7Hic8WA+Dr44iExcgGkccJUGXLR4lMA9gKkkllA1tgMXduC69qo1xcgE6ogLZNDTYzFGBKvFoBpW+yyxCvA2Ngknj1+mu+fzfcgrmpwLBMxKUBPNo/RbRug6OLa1WM+X4EI+cg8dl1ZhYJ4/KtQliRB1TTE9QTUON00BsexsbS0iPHxcQwNjSChKnAdh5KcZZQXwdbVFkBzZwG867d+PWAXHRMuY/kVCoAUjtaXEqqYEuH1FaRwnrZD4GNF0QBJZquNKSpPfjnyx2LQFY01yfc8WFYHnuvAlzy4Lg0aUDUdmqYJX+6DY4Xnuqzti9UleOzYgWq1jr37DsF0bAQxGb09w7A7LXTaDcQVBWlVw8j6DegZLLJ3fT7LpM/YEiQhdJ01e5UFsg8jF0EuiNaCBKVyYKY5GUYHlcUFJFM59JW7YHbaHHQFMqJ4xxkbFFoXTayF4/osJBbAG266IcjnsjxhmleU1bHW+aTHgKbIeMs7347RbRciFrj43Ec+iMpCnW+62rTJVTFGdl3UG3WekJZIQFU02I4L07IQj8fZTciEEQOyDBosp4dsIZ1Omy1D1VTEZAWmKWCwZZmc8khQICkaLMfD6SPHMTk/j6SqQomnkS/1ozI3AdPooJhJwHZ9bFy/HcWeBHRd+yUITQiAgIIiK1BVVQRvjm3L/uC82ChQj4eO0cbc3BwSiQy2bt0Gw2guAwvyHrR+pDx/dM/70dU7CN8z8cn3/xEahg22ZN+DdOv1LwtymSzSySQP0JOE6axGIOSV120YwfDaYdiujSce3gs38DlpeT4BCM22YNk2YrLwt4vVGhaWlpahZxRToiDqyyLbjH5URUW5mGXNdF2BmWPsf4UAZNfGYDqOHzx6AFdeuBGX79qFmJbG2MQEjh4/gXqrg/1jU7ji0mshayY0fQWJPRdMRJZBLkIV/uq8GLR6LehvrBC2gUqlwknXpg3bkUzr7EoJYq/Obeja4ZE+DI8OsUvft3c/DMPl9eHn/N6vv4E9z+rszwl+kQP6Regpcdp+/mBXBBdhY4aansfuo95sw7QdWJYRuhsB4ShYUGbBmbdIxlkT0+lkiBp8yDJpZgy+RL8r6M+kMJRU4cgKdm/ZgHi6BFXV4FlL8A0DY+dm8R8PPYGql8PAcA8Z/vJYI78eoZ0oNgjtVzgWLOt+iHxWKwfNpbIwh3q9jqHBEeRyeQ64EUqLro3oBs93IMdkpOJxkKLZls3rQZ9Jb73r9SwAleDXLy0PkG8Xg1odyAJZLJzMfnIlgpCjoB+xmis8D7un0DoMy+Qkh3AyLZyPGDrtmuBkOG6sSvYYz59PV1y8aS02FxJIp0uwHAcOZPT3dMNtL7Jfnp6ZRaVl4METc0jnU6zRfkSPUGx6bs4SwkQ5pvK1qxVytf8hJWk065iamkJXqRs9PT2/wBVFgmAlDFyeM8HdZCLJt7Jtm2OuIquQfvuO13EixniY4R9BUnIbKz5QUAznY2lyBwSfeO2Xky8hBF4sXnm6huiqlRdZBPl427FBsJQCFd/bB0y7LYKcrEAKxILFRE64/OL7wkdSlvHS7euxeWQdzszM4/iJCfT1ZDDam4frORifnEEzkLF3aonZW4qgNBKyIvGv0M0wvGccHSZwEpSYCMSrzICvp4W1bBNT01PQFBVr1gyytUQLLtZBWDX5f2ZMlwUgIxlP8C1JIDGVHLsE6fbXvjbgX5iQE7iLFlf8O0QDws+Egw4nEI7vvKSJkonwFQ2KEAvjK5pjiF7Y7YSZdpT80oADSi1XLXiUwodf48WTZBmvfMXtqIxNYFu3hzX5DKxAxQ+feAwD5V606xX89OkDKGZyMLNFWB5lnJScJZHP52AbFgMEP/A4QJKA2ccL4MyaScIPJ7uyuJS9+z4arToMs4P1Q2s5sAuXKVSEkrlXvurXkMqmcXDvURw9ckY8x3NZwRO6zkpJ6+ohQKNRh/Q7b3l3EFEFwgoEJCVNlGVKVESgVcL0nB/FNyFyKWQ6VyVH4l6EAEJ0EzKHjCwImkWB1hWULGsLTYAyeya8VvvSkB8KU5Lu3l68+rW3AY6Nn3ztT3H5zvWcpVI2Oje/gL71G/HIz+7HmUoTPZkCzspdPMbt27ZgdN0Ia2tSo3kpaHdMnDp7FoeOPAvDpKxVKMWyNofuk+Ezw2gbnuPBtjrQdRW5OLnJkFIO3VkiruFjn/00ZC2Jk0f242/+8m+FvQYuKyFZja7FYbsCTrfbbUif+qNPsXoKLCxWMpCF5sdkStUFgRSZKb+zlRCzJyPkqRAEMnwpDN68nnJIAdDvK59HCx4F6WjxV2uS8PfClChJoQUr9wzg0suu4OdW52Zh7P03KPE4L+rY5DmsG9qATDaHhx7+CXQ1AStThpHuQU+5jGQIhb0YkEolUCgUYDebSKSSsP0YnnjySdQbzVUeJ1yH59DNBCbajUWYZoNS3fO0P/py5OI43vmCciDnp6kqctkMZCWGylKNAzhBUekP3/qmZTo6uskyVRoKZDkxCYXEgVJWcMUVL8JLb7oFMUnGf/zTvXj2meOwfdJs4f+EJYRubJlRBFzX4WSErIFzgVVmLAQSw8jGzdi4dQ/Wrt0g4LHnca5CgqvNzsE//gNGV6Zlw3dlVM/UsGAtoiU7uPrWO5HoKuPZwxNotBrIFfLIZjJQdR2xQEHMaSObScO2LMiJNJREHPf/+D7Mz84ILijitNjxi1URChjAtW3YlsmfRRQ1zSCaA7k0oUxcZgICjxWVGOY1/b2IZ7q4UlapVrC0MA/po+8mF7TyJcrQiNuIHkouhSyDqVRyS+yaRNo+MNCLTTt2QZYl7Hv8cTTqNTYvZjqJKQx5EF0XmS35PnqYSColZjqIGV0dZWn8Oy+6HBu27WbhcPB0PSxNTaLU04uYrsOxHJz+3p+hq1hAZaGKVK6E8aNnMN92kF+7ATsuuwrQAux9ch80XUe+UES5uxvNWhUx04IKE9liHloyjY7hIZ5Jo1Au4Yf3/QD16iLHGrGkYpzhL8suJ/BpDqKWIQiDSAAepNB0OWeRJBiUmRvE9PrYsW0rkrkyao0aZuZmMD83C+lPPvwxtgChrR5ch2CTzb6fF5/fPV5wTlRUFbSg5AeJ9FJUUcKjQEfBxrAsOLYLxw04+yWfSRheiScJsDK8pGSOEpFo4ML3koIF2LjtQuy48FIERFW4Ljwi3CwL+7/5LfRfdBHWb9sCx/fw8795N7Zs3I6KraLjuai2TeSK26CrGlLZJHzJxuzcHCeLBP8yCQWK70ANiLFyoCYzML0ArU6HS4pdfb0odZXw+KOPwLAcDA4OolGngEvaHsAmzspxeYwilnFRWyhRiG+j4iRFQSrm0LrOzk5iamYGmqbixZdeCj1TQK3RwOzcNBYXlyB95o8/KVwQSzsQC+OJpKXdbolSJQtCsHn0Q9qs6TKSmgpFEdZAC8gVIZeE6LF7yKRSMB1KriRIelLw8j5w4uRJ7D2wf7kwHVmboin463v/lWMPLTwxs5Kq4NkHHoC5WMfOm29CXFFhew4e/f69WDc0yAlNRc7jlF3AjZs3QlVjCFwPi4sTOH30MHQphrimgOgWT9EQzxfQqTV4ngQ6TKvDlIes6xgZXYuuriL+8777sXXbVoyMjjJ0JUWUYgEvPiMxSeIsePzMKZw6dRKddmcVlS9AiESuh9xlrYr5pUXksmlcsGU95EQWjVZrRQCfvedTwXlZsNWB61iiwFAXfA7xP/Si32VF+DNm9jilDHgiZISO7UDRdeH/Awn9/f2wXIGGlESaF9/1Ahw5fgwP/OxBthiyOqJ0/cDB+97/GVx65Yuhqyo/n6yNovwDf/UlbL3hRvQNreHnkot84N/+DPFcGcqGPWi7Ckwvhhs2rxNJjyxjce4c5g4/iXJCgQEdXraMpVoNqWwGgd1hFETaxZQAgQ45hlKphJENG5FNJ/EPf/8VvPltb2fTXJ3hUiJGeZFA4T67ZKoFfPvb3+Z1i7Jg+isFYSq/VutL0FUZW9etgZrMod5sYr4yi6WlKqTPf+Izy0GYBGEaLQSeYOqMdotpXQY8McqWFSRUDYl4gi0AnDTFWCAkANcRPBIPLfCgpXOwbKJdAZkswJeYcDszNoWnDj6Lem0eDhXnPY9x+r33fhOSQqxhDLblIaERkpLw2D/+P+y69WZGEuT+yJ8+cewY2pQxyzJcScL2cg9KZJ26gunJKRx4+insTteQlj00C5tQRQK1+iKsdmu5NEgZKc3Zch1oWhzj07N405vfhGRSx9/f+4/4rbfcDTUms5UBMs+NkkhGNpRZk0sK14eU5fSpkzh08CB7DrEOkmBwa4uIqwo2DfdDTxdQa9XYgpaWliB94ZOfZQEIZCPD6DSFADyPf+dCMnxUaw7ga4LTSCahx+NQefFl6JoKKeYgmSTcHuoGCSCVY+4HgQxZT7AgCOufHpvG0TPTWKzMwDZa8DwHt9/5Rtx0w82wiAnVZXTaNhJxGVbHwrP/eR8uvu0WztIZDCDA4yeOw+AYpMCVFFxW7uE+I9swYXU6sAMf9v7vIiXb6GRHMG3HUa0uwHc8ji/VyhwUPYmkTi6N0JQFSynjbb9zJ3RVwje+8e+45bZbWHOpskWgQpBsHieq1LRAsYn+TRZMsS2ZUNFuN7F3715MnZtaBiFL9SVoSgwbB/ugpvJoGU1mUavVKqQ//dTn2AVFboioXN81ObmhgjIFUOLrJ6ZdxPU+2KYNRdaRTGmCs6fvcprbwPAwJRuCTSQt1VIZdCwasApFi8MjV+MHODtVwbNjM6jMT8EzBf38xS9+FbliGobhQE+oaDVtZjDnntiLWG83hjaOLnNVpDBHpiexSPGFsndPwouH+jE+PoNiLoFkKs18TfXpH0H3aojpCUy7WczVDe5WsBoVDOkW2jbQgQpf0TE1P4c9r/4Afu2SASR1H//0z9/ELTffjDhluxIlUkIAhPBkRUGr2YbREppOAuG5eS7y+QIURcKBA/tx6NAznJCSABQpwOhAD7RMgRO/2dlp1Gq15xEARX3P5EBsdOqM8ckaJmYICXVz3bTTtJFKaYKzlyRGPa5fx64dSegKuQjB16jJLAzLh6yqUNVEyJUHmKzUcGpiAbOz43CNJjZv3oW3vOX3Ec/E0Wx22AU06xb0uIoffe7TuPGjH4FG8SfEy2RFT02fQyyd5WpRRlXRPngSw6NrcPjQ47j4okvRNpt44sEHcXE5gNeYZ4UYa0moy11YpzdxbuIsBnt7sFBfQtvuYNzsxvbr34ntoxkM9sdx79/9I+648/VI6AQ0CGCE+YtD1IYQRn2pysrJc6UxtNvI5UusE6lUHAsLFXz/e99DlTrifBej/WXEs11od9qYm59Bo9GA9Oef/vxyEBYuqMOFA+riIgEwYydJqNYdeA61bCAsLgsSin4YIak+hvoTXGjnz6mQk8nDMl2uIMnxJILQAqYX2xibq+PcxGnYnTquevF1eM3r7oCmKZifqyOTiTPPTsH40a98DS975+9AIdojZGMp2D98bhxqLs+pfRFAd1hytE0TreYiMtkitEDGIw98B2cOPoSeXBKbBvrgqTEUskXUazVkMmluoDp7bgzJ3W9GcWgrhvoyGF2j4atf+zruuP02KKooprP7DGn1aN7tRhOG0WYhFItFLCwtIp3KsQdQFZmz7largS9/9SvwHQvDvSUkC93odAQKYirii5/5wrILooXstNuA7yDwhABkWWMeiIrV9K6EgVBgfzJJWmARoOghRKoxDCO6NZVjAWjxODQtuWwBS20P5xYMnDpxGEa7irf89h9gx+4dUDUF58ZryBVSnL7bHRvHfvojXPa6myF5NguQ2mfkIIYHJ85BLnRB1xVkDWAkE+fxOJ4HRQ44eFKT1Nyp45jc/zASkoFcUuWYQYjCdHzOWaanJjG7uIQr3vGPaHc6KJZ0rOuP43Of+Qu8+w/fhlJJh21RbBMdHBRU6YfZAs/H0uICXMdEulBCp9lGKpPj/EAKGVE9rqBaXcT99/8QaRVIFbrR7rQwNxe6oF8UQJO/zBbQbrDrIPMSKTqYy+B8QFaFAHyXSTv+nczTc0TpkNr8kjmYlgOdUVOSEy+KAU1bxkzNxrNHDiCfTeFtb30X8l15xvCnT1XQ1ZUlcIN9+w6glNSwYfta+JYRsqkeYpLD/vtcLI6qr0DvONjVXRR5iGmxxWqUD/geIyLJDeA3JlA9+wzUwGJromSr2TExXalg0Qzwyj/4MhoNyuR9TB/7CR782YP4wuc/j1yeatNUCxE1YJpnrVYXpUtIWFqscLabyhdhtwxkCkV+rhfWfBUlhmw+g6XKLA7vexKGK6HVbuDkqRMsvF+wAIKehCY8x4bZaUFVVwrkXBeICRdEwZmwPiEECkJC8QOOHVwDkIB4PM21Wy2eZJjHTUx+AEvKomEBe/c+ht27LsI1L3kpCt15qEoMx49No9zTBc81cebkEVywcx1nxL7twOmYsBsVDtwSLXahF3vdBAoxFbuKeQYE7bYBTdcQiwWM0sbOTjJNXOruRnXqNM4+dR9kQniEYNQkkOnBlJHC1he9BkuNJZw4sh9FdQ6bN+/AJZdcAlUDcrk0u5UIfs7MzCGbzbKg68RqNupIZrJwLBeZQp5RETcRhJROuacMzyF01sbPf/4w5iszeOaZQ7BJqSgGRAQUuSCjTVV98vcWF7epoC4WnEyXTDEI/y0zvCROhDkeYnPZ9xM2BuN9cj2uE0CPp9l1RUyogSx8OY79+5/CFZe+GBfv3oN0IcWdDEefnUCKatQZQEObn1U5N4nWqUOw5ychuQZyhRKUeApSvIhHgjT0bA82p9KcI1i2h2QywX2h1Gp5+uQ4srkMurrLSBVycNtt3P+NL2HKVBDEs3j1y6/Dk88uIoj3om0GmDzxBH5tdzd6+4ZgGC3s2L6ZwYDI9n2Gjroe56oWPa+2tIhOqymIQshIZdIMXIhTo9hAgpI1lddTDrtGvvrVL+PAgX1wbBPSFz7x+YD8VARFKavzPQuebTPOjSgIAVMjCyCXFLodLrfR4ATfL2hq6gHyuFGKtEZPZnjQVPKgnp5jp6dxdqLCFvPe93yAB5/NJTmhe/bYGFqdAH3dQJ46G6hyVmugc+op2I05TC1WUC70oKu7F6qew7TjYMwrYUNvD7tJy7I5qSPYqOsyzk3OIZfPom+IqlcyzGYDT+/bi29/+zuswR/88IcxMz2NgZEt+N7D81Dap7B+KME4/iVXXYVSqci8F5VFyAVR2zl1dlAcSKfTqMzNolmvsTD8IIZEKsPuiRLReFzn5JOUmhAjfJu/T3T4R97/HtSqNUif//j/WRYADajTarMAiHzyXQdy2C/PAghb2Ln5Cgp3DQckACqWk3+kJSbMxnQ0uZ44LMdFKp3nXh9K4EkgR4+fwvj4Ii68eA9eecOrWLviCQWJRALnJudx+Jlx7NkzgDh1MgQKKs8+DnfmGGodD/fvO4JOo4ard2/DwlId+8ZncfG1t2DdyEZekGarhWQyxQGdqBQKxsWeXsiKDk0WDQBnz57Fl/76L5lo/MSnPoNWs4PhkWE8M9ZCo+Xj0i0amq069HgGREhRvKOsnBY9mUwyfqf1yOczmJmaQrPe4Dl4vsRUB13DHXOGoHTob9lCDq1Gjevn1LZ+9vgx/NUX/xzSJz/0iSCXz7Afp5fZ7sALBUAmRH6VglZUkKHLCElQwYWZZEYdiuD2CauFiIh8YDyRgOsHvyCAw0eO4+xYBS9/xfW44iUvYZOlpIv4etq4cf+PHsX69Xm2gKkTR5GpHkWnaaLWttAyiPls48oLNuPUTBXffnQferdsw2tfdiuS6RSWqlXE4wlkchmcOH4CsSCGnv61yOazaFSXmPMhl/LZz3yC53T9ja9CMpnDxS+6kLupHz9Yw4UbU/C9NpKpDHwpQLtloZRP8jwJwdCiplJJUICdHJtgX08CIQFkslleC2ql0VSNrUXTBYVSXVqEY5pcCydrHDt1EtLHP/CxoFDMrRJAC45jso8jLWbu/zndxAxBSfu55UQkIRSEmQtXZCahqNhBD6fuiHS2yBZASIIGf/jwMZw8PYtX3PBKXHvddew2KPmiei9d8/OfPIQ1WQv21LOQ1DiSdhXNjotCoQuyWceRk5OIp9Lo7uvFXMeBkRtEf+8o8oU85ioVdmmZfBYP/+whDA+PoFDq4ThFrqmnr4AzZ87gL/78i+wyt+/Yic07dmPnhduxZrCMwydNKH4LmzcUEJNVNFsmQ+1sSrgdmisVlLLZFJr1OipzFY4NTAIqukBHxJGpGtM1ClE11BRGiKmygFq1ykKi9U0m45EAsstdAEarAde1mCWkBWb8/5zW9CheRGVFSrREdwOZBwVm0ckWCSCVK0JThQDoO88cehYnz8ziuldejxtffRMnJLqWgON6zCs9/eR+lI3T6Jw7iERC414d21eQy5Vw5NA+BLKOcqGIiUqFKYdNF78Ueu9mdkFEcHGPZzqJx37+CNZv3IT+oUFkMinEKKFyfTz00IP44X3/yQIg6uCq627ES65+MeJJBc22j8mJRey5sJ8Vqd4weVGTeowFS0KgecbjKqbGJ5ZzAu7zCQUgFj8Rar/Yb0C1hMX5BbSaDRS7yiwAukdoAdSBJrSPEiOSMLcCBmQqKmJMwZ6/P4CEEAlA4GRhESD3xF3L9ACdix1UsSI4y20qQYCDB4/i+KlpvOrVN+H6G29g7em0qZADqLqG48ePY7Tow9j/H7ACmWsAMS0By7Txkyf2ont4AzZv2ojjx47jqacew449V6F/02WcjZIwacEmZ6dx4sRJ3HLrLUil03AclykVRU/gYx/+IFzb4byC6srX3vQavOxlV/PeNV3x0TQCZNI6krqM2dlFDI4OMOyNGrYSSQVT41MwDJvdEJUoKemLyRrHsWQqBT1ByacoofLfEENjqQon8JBJZwXdrv8Xy/Cx9308yBdyjGroRckXJVeEUenLRCzRhkmmX8P2QAq6gayINkPqcYkpXECha2jyZAEUxOMJwv4BUtmy4PZDQosEcHpsHq+78w5cdsXl4t7U8lG3ud5ABRkl5uKJf/1zuIuTWNffHVqTivGpRRQLebTaTVQaLRgxBcWeEWQHL+T7ONQCoql46qkncfFFl6GrXEQyLbSRmFvL9fCB33835yrk38mdvvmd70Y2W8SxY0fxyuuugqSqsDuhxByHAAAX6ElEQVQWZB04emQCF+3ZwMUnUh5VkzloL84vIZlJMwQld9vpmLzgHIRTaagybfOy+SeVSjFntlCpiKqiTmRmnEurzysAUg3aNEHZNlPuhPG5dCvqnNSUG8hyyACKOEGBJaK1yWdSnyQFMYKdmUwX5wFRq/qBQ0dwdmwB73jn72Hztq3svkzbQ7PewfRUA/mijrUjZfzsvu/AP/0IsrKDwCVtU+BJOlSdOsxiWOpYqNku9NIo+kd3wibsHfhsRQuVRWzctAHZXJqTRm6ZDzycPHkKf/839zJMpPEQ9P31N/8uDh44jPUb1mHHzi3oX9OHaq0FyTfwrX//AV5762sx0JvnXIhgJFmrRpRGjFBjE51WC4ZpswAIeCgauU1R3E+nUyGX5KNCjcSJJLSEzjGh1WxCuue9H+cgvGIBdS6cU2HG57ZBMh5KIcItSFTZ5X510lqiPQT2Fz09rONwXRG4aIsmaXYmXeTWbBZA4GPf/sM4e7aC93/4IxgY7OdKmuMCbhDgp/c/js1bRrBr10bse+JpTDz+LWwqBFhcqqHRbPHA246HxUYL89UGEqUBXHL16xFPpHjnJT1D13Qu+5VKXdi2fSOmpihQSlD1GAdfihOia0Hsa7vmupswV1nAjTfeiFJPEYVCGo26iZ5yHHMzNaiJOHIpndEMaTS5ZdMwmJZu1GpoNRpc/yakQ5ZOgIN+CI6SphOxSOtErojiFCucYfLn0j3vJRRE0hUuqNOpM1lFkiVKQvBA1AG2slEvatsTu1iFAKJKGF1nWk0mpFL5LlEbJgGQBUg+TMvAgQOHMD7RxIc+9kn09XUz8WaZHpqGg/17n2K3VCimYLY6+PcvfQgvHikwu0qlPCLGxqZnMT67AJtw98hObNt6JfvdpVYDST3OsDmRzaCrq4R0JsG+mZDWmbNn8A/3/t15ZUNyRXf95m9jaN06ZDJZdHcXuNeU+iJzWRVTEzPQU2n0dRfCgowQXKNa400atB9gaWGRvQNZAK2Xpsc5CNNiU9MC1Tvo+WKdqGZOOYLBwgwFkFsOsp22sABRGfO4l1+RxSY1enG7ebhtk4oTtDJkEdxCzjIkBGQw/53Od3OHRTZT4tzBMRrQnFmcPjuJs1MW3vaBT6NvoI+fXau24fjA2TNjuGDnZnSMJmYrp3D66YewTqqhkE1zIxNNpN2xcN9j+9G0PPTvuBibNl7KGm7WFtCbkpFIZ9C9eQ+ypTwrBhGIxMp+7jOfRWV6ln1/EDYTU4b7iS/8GfL5PON8mh9to6KSaDqjYHamglQyhf6ektioQmVb0+ZaADVDkFucn56Dy31L1LBAuF9HOptmSiRSVtt2YLQNjhfJdBrtZpMtQrrnfX8c0MOjili7VWM83m7Wmf5NJilJE/idkVBYwCbgT3QDMY2U9zM9G/aU0q4XKXCRKfbCMtvIU/FcldGNBVy5S0djYQlTszX4o69B/9YrOJacmzoNx7HQaVOHGu0bM1DKZ+BaHTz9z1/CVRdsFsmequL+nz/FwenMdAXXvunt6Onq5l3po/UFmLYNQ4+jK19C9+4rEEvkOBn7/ne+i/+8775lRYoaVft6B/DBj38C5IaZQnF82C5VA12kUiJ5ItdSLopklRIoWgdCW4uVCm9XWlysgRaYcyYKxKkU0x8J2txHs/HAhXvXo7iYYnqCXBdD2j9+70cDSmBE7ZeCSp2aWtBuNTix0rQEtxiSqXJgIQEQy+UJARAnHnWucQNvDIygELhIF3q4LyifKyEGF92xGWxbW+bOsLZhwSxeguELr8a52TFhjhKhL5uzxUatit6+Phw6tBdLk+O4eLgIvVPlahPBv+Nj55Ab2Y7sph3c/pLNFVFbJLdE7GVmuf5AxXDy41/78tfYeqKX2NIqoVAs4eOf+xyy2bTogJAkNJomlpZaaDTaSCcllLuLKGSSSGWI2xHKRoKYmZ7hEi1lyqZlCoSjacjl88jlskyHcDu+QQGatr+KXaK2HbAAWKE/+p6PBPl8VmwwoN512uMUC9ChniAQrKStPRSsqE9UdLexL6NtlhSaKVkj9s8lWpraOyRYZocFQF1grm0incrAaVfQlfSRSye4HYMSvPTQbuRGtsCwacOGy76Xu+lMC/NzM7CMJk6ePI1ktojh4UFkjQrKrXMc8GdaPuqZAZyrVPg7a0ZGsWHDRqRSadDeA6KgZ2dmMDQ8xJDyP775fUyOnRPbZMOONxLwm9/xdgytHWEFpPqvrMUwM12H7XqYna3CNVvYvHkIxXwmnHsAo0NJF+VMTbRb9OPAdiyOARR484UCoyFSWmplJFKQYqyoJwCm6aLZEPVktgDSGIOL4w5i7OsD3qtFFxCvIvwYoR893CYUJmGB2GxMAiA3wts7YxJMU1TVUvkyPJsSLBOeWUW5kGH0QG0b6WQa6cGN6Nuye3k7J9kqoYl22+QeG99swyZuPUbow0KxWIB/8glItTkcsZN48sARXPGSa7B5w3pkSt08ftLMZrOJlO9Cqs+ipMlwfaDlu/jG9x7HzFKHkdJ1r7geO3bvxo4LdjEaIYhJLoESKXIps/MNULdzdyGO/v4ya7frUTClZ9C1Fpo1Yg3IAkyOAUy6ZbNMNRDoIKVKJQmOCs2PasnEMlDMY4V922+/I+jpKnBLHz0g8P4rMNBuFcNAqTyAeq3C7CZR0bR7hJKuKLDQ1hve/imJh1G9gPZY0f4pn/xdrovLlMl0FjIJyXdx7PA+7H/6AZR6tmDPr12DHZdfLpqO6E50fA1tXXVsjI+NYcOmrZgdP4VizwDm5mYAwvNOgFplDBPTk1i/5SIMrelHYJtI5rs4e1djKuK1Sa4RKzEHZ09PYXRwHeqVacxbJtr59SjuuB6FfIDeAo3V4d5T8v0kKMejsqONdrOD9ev6kU0ToiEITV3xhGREQkYBdPz0GHSinMMtqXQmRiKV4oBOFpghl8Xt9yvd1iRki1pnbA/xRBLSG+9+U1DMp9FX7ueLDZMaszyuj65ZuwtjZw5DI3RAi6tSgZ5Qj9iYIAQgtm56LpUhqWVDC7NoYgwzzKdkc13LO0lOnjqKH3z/u9iwcSduu/nVyIyu5ySJg1W4hd+iWu7UOIbXbcK5MyfRP7SO+f3pydPQ9DwQs5mBpMJMQpVZg5OZPIyWAQ0mcjMnmRlNSRkUhkaxVJvGof378OyJ41i/eRu08npYvVehr0vBQEGG5YhaMtMDMWBwqMyBlOISJVJMY4SNxrTwmQzR0BPcoR7teI/e9UQKxUIBuWycgzo3pUX1c9oZRCjO6LClWKZDAnhjUMgRzh1gLe90mkwrN5pNpAtDsDrzkDlrFJkdZ8Kren84mJEAwn1QMUWDaVISRygixYE6G1IRNImjxw7goQd+htdc+ypsv+5qKKksxwMyU0r3CCfThMlVjY1PIJdO8hZP2zZgmQbMjoFsPsfNA0SkOUYbhu0gkcrCaNaxNqEjmJnA5MxZ9JR6EFN1VGqzGBkaYhrCdCWMj53B4ppbmTy7cH2ce1Bdq4V413ps30ylRlHhI2hNGsvFFj7lhVrTaYdNjWslglwk3kscBEILTYCG+ktpLSkzJ0o6omD4KJt2B8lUku/HwOO37votFkBvuZ+jNOF/EgCV3haqVfSVy9wSGISpNQkh2srJXBAJIJQwb3xTVA5OFIRXBNAdbv8P8ORTj+CRRx7C0OAOvO2Df8iUBnflEbyJtkiR+5CA6sIcxsbPYHTjBewWGGE5DvKZHBe2E3EdreoC8yQJz4JqNdBLDAFSqCzMINdThhKT8PhPH8Wey6+CnCT4V2G34Wm93EqfijvIUO+PrGDeTkPddC029lOTssd1XVpUqnuT6VPy1KjTqVfUGCBIRwIEUkxBXI8zBVLI55ig41jPrf1irzWjIctaFiblEjyn33zDbwYU4btLvSwA02rzOQtUTaIHUGQXOUJkAdScG7qg8LyfGFPQIVUhEzoQPaXPFQBds//Ak/jRj+/DyNo9+I3ffSNyXQVO6QmFUO8poQmasE5FoMDGIw//FOu3voiTP/LxCtUVOnUknDbivoHAqKEgU3oQh5ZIodFykCr0ctZdnZ9Gu9GCrmcxunkjmvVFLC5OswuJjo6hrg2iFshVmkEMnbW3Y7hXQSlDJVfR20nNCeSSabMFueLqUguFInVuUCFJZ+6faue08Y5a9qlVJjy+hIVFLp1iW+SK6J6U6HH3yG/c+etBqZhFudDPZmQ5TW6poDyANF3sHRBsqBAEUf60qZsK7+KEFWrvFtu8RLcwbeGhRDOZTItiRkFYAGnUY0/8HE888RSuvOpm3PDaV8FViJEkfj3OhF7QWUTSbECzWizUyYkpFLrKcKn9z24j4ZlI+ZQgUruMwhqlpQtwXIm3jrq2Dtu30Lt+HazqAmzbRF9fHxbmZ9FqV+HY0Z7LAIZhQk4k0OE9YgHadgBl9Dr0r92OTUOirYXgohQTZ2CQ2zt3+iTmmyp27diI3j7KnlXIqjhlgC2Z+6fIS6ycurV6OxZZQRQveE/e3XfcHdCO9HJxQER3qw3Pt2A0GlC1uPBtVPEhc2IoKkPRY1DCPnnK7ohuiDAuCYYgqQjOlDOIXILLmrIOWypiw64r0FXOojI3iYBKkarMMM6uL2B44TB3lZFV0eEdMdptQ6aukLZRfxGVC12eMAvVI77dwEOHTmLGcnDbFS9Hs7WIp57cBzmZxPBIP9x2HZ1mA6ZPmbYJhxqnaCus52FmqcobNY5MWbjggs3oG70YxVwWu7aPotTVw/tkyRJOHTuK48cO83baZKYEQyrjol1rsXaom1svKS+INmrw3CVAUylrpm1NIpYQyHA4doT0PiWxd7/+rqCrmEO5SCiI9sHS2QwWWvU6H7rBewJCAXBiJktcHaItlxw8w+2sUYCONEEc8kFmLNKenpEteGZsCfuPHsXZo/tRKmWwdddl2H7hFvb/9blzqD3xQ+zeuBb5XIZLnildhawRmpDJ6/LzKDunSVH1rNls4fjpMRyZa6C07SLeiLEweRa7RtZh/fAQqnPTmF+Y4+z+xPgEHjs+hqmFGnqKJVzcGxdJmUybTRKoSSlkyt0YHhzifqZUroCXvPSlaNQbePLhn3HCxXCTtz8H8BIbOFe6+ort2LR5NDyWbeVoM7ERnARBvJLDa0vJGO24ITRJxR8qMEl3vf4utoCuQr9gQw3iYly0qYJPbYnUAUFYNsTqJNl8UoWm6cu8SMQjrX6PpEzvlD/QIsZ7R+HKeTQXJ/DDH32bk5qegT4kExq++X+/jLe+8hqU00lk/qs/f3BggIsbdE9KauhFELBjWZhbrOPk5DROVZbgqDqSxS5xvAHRxET5JhLY2N2L8RMnMV6t4MkDzyCVzWJdqQu+qjDPtXttWRyPwwdqAMl8N2qJAobWrEEinuaAT0eOTU9NscVRnSHaeks6pWRGUG8aWGzUcdOrb8f2DRlmUKN5szJbFlzbRTy+svGP3A+1ttMJYQzrSQBdBXJBQgB0eBIkD0aD6AJ9OXBEsYC0tUA9llT/pA0UHBvofeW8iShRExYgEjga2uD2S5DsGkW7OovvfP97eOzR+yFJPvr6yjhz6hS6sznsLGexob8bpVwOTshYkgB44KaFicUqqrYHP1OAns4xCiGWlDqNafHpOiqaUIui0erg6PHjXHlav3Y93vnW38Xhg4+g2agDZgNdtG0UEgzLRssDtL51GOzvR1xPiXNCyVWFVTw6nITdLHvXGJREDoabxPTcOPL9l+LGqzZhZKhrOVaSy6FxEJMc10WDr9joAWZmCYIyELj79juDciGHIglAEhZA3W3t2hInVWJx2bGIm5MFJMgC4iwA4eeFAM6vGxO0FFAtsgwi53o37oHRrKBhKrjn4++FKptYt34UhmGgWW8irWnY1pUDHNHiSBsk+Ew5z0XHBTqSgvLwOubaiTagIEwv+j5temCir93myR08eBBnz45xMf/yS6/Au9/zATz4na8z4qpXZyFRVmoa1PAKR9MRz5ZRLvcwIBDHzaxsGo8CJz8sEopawmK9jUDvgpLsxS2v2IW1a4p8BgZ1xtEPlUfpxbkCAxaJW39ofExH33XrHUG5lEOpNCBcUKcBL3DQrlUZXomCe7idn3kfH/lEAvFE1LK4ci5otNCrBcHWEAiqgYLrwK7rsLQ0i7bt48DBx3Di5DFcedU1aDUqmJubRzFX4JbHpXNjMObHuQ6tlYeQKZXY7SWSOuJ6klvXuVpHu1UsF0uL85ienuLTqygzJuEcOHAAU1PT2L5tN/K5Ij70kT/Gw9/9Om+4EEojXIZFm1LSKdhugK5cFxKa6LRmij3cD0z/Xik6CSH4ahwL1QCIUzdGFcW11+KaHQEu2LE5BB8q35PGR+dXEE/FDQjNFkN0Xte7bnt9UC7mhQWELsjzbXTqNbaACC9HgyUbJAugbI4LGFQDiA6+C48ziASw7IqkUIiyjHhuGKnuYdz75b/D1l1bsWHTWtY0Yl95DwBBPmr8ZZaJkJMoezJFyMc9RuciiDNZaDwx3uzncPY8MXGG91/V6w1MTEzimWcOswAG+kdw991vxcGHvsGcVQQZyewtow05X+JO7mK2gPiyAKLd8CvHDUfaLxrVJDQdBa7ahcVqnbc5jQwO4PWvfQV6uzMhxyWj1TY4gNPI6SQX6sggC2YBvOG21wXlQh7FQh9PsmPUucOZ2ugouREuRpwoJXZ++8glFNHzQkd3hYfYCTph5agvEfUFx0NZoxhwDEqyG3rXKD73p1/AHXffhoHB3pBnoUPuaKclUcl07pzA1FxroOIPb44TnIygAESbCbsJJhEtGB0Ds1PjvCmCCiTf+ta32RouueQaXLT7QuzZcy0OPfp1BhUrLjMG22wj3jMIs20gn8pxQ5XA7mQBoqU+qgiufuffFQ1tdQ0Way3meXbv3I7u7j6MDOSxdqjEXBB1lVA3Nm1NovGKZmex30J6w623B10sABEDWu1FLrI0mjVulooSMHFeEPlFlwVAJi40Njz4mg/2OP/c5WVUFFoACUPLDUAvjuCPPvYBdJXyuPqlV2Prjp0cjGlCxLVEFhV9n7C+8MGCMIu0MCLIiLzzbIePN2ssTDHdTQHvK1/5Go9/x65Lcf3LXo71my7BoUe+AT45PDzll5umbBNuukiZJXqK3Zzdim63lfMguOcpPHCEu8DDHzrC2E1vxVKjyfujr77yct61Q9YwOlzC2sEyAt647vBnkWKSEBYqc5DuvOXWoCtfRLHYJwTQWULguGg269D1JMeACM3wOR2+yzCUzr4Rbe3CFCMLiBaNNT88cyc6BIkekCwNIVYYwPve+we84526415yzTVIxkXHAQXT6EWLw60oIVMpyqJRN4PA3AT16DtGqy2YxtoCH/xEFvIv//Jv/LfB4VHcfsedWD+yBwcf/md4NjVKiYoYjZFo+EXHR4YP3utm+oWVLeyciBY7GleU2XJNnPKT0lY0TInPkHvFNVeJfIrYBMPE5rVlDHbTiVoiptAc6f612gK++c2vQ7rr9tuDYiaLQoEEQLs3yAXZaDWr0LVUGIRF2ZHdSOCjkKS9whFHJD5nV0UdbKtPHFx19po4p1NBds0G/HjfDBy9iI3rRhFXJcS1AHaLemY8tIjdNDsMI3OpNLdyE6qhVxS4aDK0sPQ5uRhCG6TxVHdt1qtwaGuVJMFWStASJe51HerKYXTtehz82b+g3V7kntYIoVGtwkxmkE0mmEGNmshCU1vWdg7EoqoiyrHUZJvIQ+neiVrT4Mz6yssuYaWgjYvT0zNcnXvxnk1YOzzAu+djigRFUvEnn/4Qb+KT7rz51nuK+ZUg3OkQ1Wqj0aK9remwqUiYotBoH0UWQHz5/yMgFp9aBsJ9Buz3RS8745+w85pOosqu2Yx7H5rH+nWbMdydRTZJJ5bTlv4lTE2eQT7jI6Ep3GZIBW6hMWJ/FsWB2dl5PhSVHk4n5NJnp0+eRsfs8ElXZmMBipJE/0W3cJ03FaND/2zUaw1oMRPm6Z/ANmmO4n70PbNjohNPoyubRW93b2gB0f8yQByluXyeJMcG+t8s+HBjPpL5Qdip9Xz+RSmfx+jIGoaXrUaLE66W6/N21rtvvJx7T+k4hvt+8D38+Mff5eevOmpp2fJf+OV/cQVeEMD/4mI/36NeEMALAvgVr8Cv+PEvWMCvWAD/H8WQXASDRnuMAAAAAElFTkSuQmCC" alt="Patient" className="w-80 h-48 object-cover rounded-md border-4 border-white shadow-lg -ml-8" />
      </div>
      <div className="text-container ml-4 w-1/3">
      <p className="text-blue-400 font-bold mb-2">HELPING PATIENTS FROM AROUND THE GLOBE!!</p>
        <h2 className="text-4xl font-extrabold mb-2 tracking-wide">Patient <span className="text-blue-400">Caring</span></h2>
        <p className="text-gray-500 mb-2 text-base">Our goal is to deliver quality of care in a courteous, respectful, and compassionate manner. We hope you will allow us to care for you and strive to be the first and best choice for healthcare.</p>
        <ul className="list-disc flex flex-col gap-y-4 text-blue-950 font-semibold text-lg">
          <div><FontAwesomeIcon icon={faCheckCircle} className="text-blue-400 text-lg" /> Stay Updated About Your Health</div>
          <div><FontAwesomeIcon icon={faCheckCircle} className="text-blue-400 text-lg"  /> Check Your Results Online</div>
          <div><FontAwesomeIcon icon={faCheckCircle} className="text-blue-400 text-lg"  /> Manage Your Appointments</div>
        </ul>
      </div>
    </div>

    <div className="flex items-center justify-center gap-5 pt-4 pb-4 w-full">
      <div className="max-w-screen-lg p-4 bg-white">
      <div className="flex justify-center items-center p-5">
      </div>
      <div className="flex items-center justify-center flex-col">
      <h2 className="text-base font-bold mb-4 mt-4 text-blue-400">Blog & News</h2>
      <h2 className="text-3xl font-bold mb-4 text-blue-900">Read Our Latest News</h2>
      </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
     {displayedDoctors.map((skill) => (
      // eslint-disable-next-line react/jsx-key
      <div className="flex flex-col justify-center items-center">
        <div key={skill.id} className="border h-60 w-80 border-gray-300 p-4 rounded-sm bg-blue-200 flex flex-col justify-center items-center ">
          <img src={skill.image} alt='/' className='h-1/2 w-1/2' />
        </div>
        <h1 className="text-gray-600">Hiuohpbini</h1>
        <h2 className="text-gray-400">yfugiviy</h2>
        </div>
      ))}
      </div>
      <div className="flex items-center justify-center gap-5 pb-4">
      <FontAwesomeIcon icon={faArrowLeft} onClick={() => handlArrowClick2("left")} className="text-gray-600 p-3 text-lg hover:text-black rounded-full bg-white" />
      <FontAwesomeIcon icon={faArrowRight} onClick={() => handlArrowClick2("right")} className="text-gray-600 p-3 text-lg hover:text-black rounded-full bg-white" />
      </div>
      </div>
      </div>

      <div className="our-family-page flex flex-wrap items-center justify-center bg-blue-50">
      {/* Left side - Family page description */}
      <div className="left-side w-full md:w-1/3 p-8 flex justify-center flex-col pl-7">
      <h2 className="text-sm font-semibold mb-4 text-blue-400">CARING FOR THE HEALTH OF YOU AND YOUR FAMILY.</h2>
        <h2 className="text-4xl font-extrabold mb-4 text-blue-950">Our Families</h2>
        <p className="text-gray-400">
        We will work with you to develop individualised care plans, including management of chronic diseases. If we cannot assist, we can provide referrals or advice about the type of practitioner you require. We treat all enquiries sensitively and in the strictest confidence..
        </p>
      </div>

      {/* Right side - Family members photos */}
      <div className="right-side w-full md:w-1/3 p-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white flex items-center justify-center flex-col h-40 shadow-xl">
          <FontAwesomeIcon icon={faHandHoldingHeart} className="text-4xl text-blue-400" />
            <p className="text-center font-bold text-2xl p-2">5000+</p>
            <p className="text-center font-semibold">Happy Patients</p>
          </div>
          <div className="bg-white flex items-center justify-center flex-col h-40 shadow-xl">
          <FontAwesomeIcon icon={faHospital} className="text-4xl text-orange-600" />
            <p className="text-center font-bold text-2xl p-2">5000+</p>
            <p className="text-center font-semibold">Hospitals</p>
          </div>
          <div className="bg-white flex items-center justify-center flex-col h-40 shadow-xl">
          <FontAwesomeIcon icon={faVialVirus} className="text-4xl text-yellow-500" />
            <p className="text-center font-bold text-2xl p-2">5000+</p>
            <p className="text-center font-semibold">Laboratories</p>
          </div>
          <div className="bg-white flex items-center justify-center flex-col h-40 shadow-xl">
            <FontAwesomeIcon icon={faUserDoctor} className="text-4xl text-green-400" />
            <p className="text-center font-bold text-2xl p-2">5000+</p>
            <p className="text-center font-semibold">Expert Doctor</p>
          </div>
        </div>
      </div>
    </div>

    <FAQ />

    <Footer />
    </>
  );
}

