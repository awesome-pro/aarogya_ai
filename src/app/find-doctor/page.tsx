import React from "react";
import Image from"next/image";
import download from "../download.jpg";
import Header from "@/components/Header";
import FAQ from "@/components/Faq";
import Footer from "@/components/Footer";
export default function Fleets(){

    return(
        <>
        <Header />
       <div className="bg-blue-100">
        <style>{`
        .upper {
          background-color: whitesmoke;
          height: 75px;
          max-width: 1200px;
          padding: 0 2rem;
          margin: 0 auto;
          border-radius: 20px;
        }

        .location {
          margin-top: 22px;
          background-color: white;
          height: 30px;
          width: 300px;
          margin-left: 20px;
          padding: 14px;
          border-radius: 5px;
        }

        .location:hover {
          box-shadow: 1px 3px 3px 2px rgb(180, 179, 179);
        }

        .docterhospital {
          margin-top: 22px;
          background-color: white;
          height: 30px;
          width: 600px;
          margin-left: 20px;
          padding: 14px;
          border-radius: 5px;
        }

        .docterhospital:hover {
          box-shadow: 1px 3px 3px 2px rgb(180, 179, 179);
        }

        .searchbtn {
          height: 35px;
          width: 130px;
          background-color: rgb(41, 179, 243);
          margin-left: 20px;
          color: white;
          margin-top: 22px;
          border-radius: 4px;
        }

        .searchbtn:hover {
          height: 36px;
          width: 134px;
        }

        .container {
          max-width: 900px;
          padding: 0 2rem;
          margin: 0 auto;
        }

        .cardbox {
          background-color: whitesmoke;
          display: flex;
          border-radius: 20px;
          margin-top: 25px;
          box-shadow: 10px rgb(155, 88, 88);
        }

        .cardbox:hover {
          box-shadow: 4px 4px 5px 5px rgb(177, 185, 191);
        }

        .fleet--clip {
          margin-top: 10px;
          margin-left: 10px;
          border-radius: 60%;
          height: 150px;
          width: 150px;
          border: 4px solid rgb(65, 185, 240);
        }

        .drname {
          font-size: 25px;
          color: rgb(65, 185, 240);
          margin-top: 12px;
        }

        .drname:hover {
          color: rgb(25, 154, 213);
        }

        .commanbox {
          margin-left: 24px;
        }

        .h1 {
          font-size: 20px;
          margin-top: 8px;
        }

        .btn {
          color: white;
          background-color: rgb(41, 179, 243);
          height: 30px;
          width: 240px;
          margin-left: -45px;
          border-radius: 5px;
          margin-top: 5px;
        }

        .bookingbox {
          margin-left: 170px;
        }
      `}</style>
      <div className="bg-blue-500 w-full h-16 relative"></div>
       <div className="upper absolute top-32 left-52">
        <div className="flex">
        <input className="location" placeholder="Set your location"></input>
        <input className="docterhospital" placeholder="Ex.Docter,Hospital"></input>
      <button className="searchbtn">Search</button>
        </div>
       </div>
       <br></br>

        <div className="container">
            <h3 className="font-semibold mb-1 text-black text-3xl mt-10">{'Doctors available in Andheri west'}</h3>
            <h2 className="text-gray-500">Book appointments with minimum wait-time & verified doctor details</h2>

            <div className="grid grid-row-4 mt-10">


                <div className="cardbox" >                 
                    <div className="relative">
                        <Image src={download} alt="background" className="fleet--clip"/>

                    </div>
                    <span className="commanbox">
                   <h1 className="drname">{"Dr. Shantanu Jambhekar"}</h1>
                   <p className="text-gray-400 text-small">{'Dentist'}<br></br>
                   {'16'} years experience overall</p>
                 <p>
                  <h1 className="h1">{'Parentheses,Mumbai'}</h1> 
                  <p className="text-gray-600">{'Smilessence Center for Advanced Dentistry +1 more'}</p>
                  </p>
              
                  <b className="text-green-500">Free</b>
                  
                 <div className="flex">
                 <p className="text-gray-500">Consultation fee at clinic</p>
                 <div className="bookingbox"><b className="text-green-500">Available Today</b>
                 <button className="btn">Book FREE Clinic Visit</button></div></div>
                 <br></br>
                 <hr></hr>
<br></br>

                   </span>
                    </div>
                    


                

               <div className="cardbox">                 
                    <div className="relative">
                        <Image src={download} alt="background" className="fleet--clip"/>

                    </div>
                    <span className="commanbox">
                   <h1 className="drname">{"Dr. Shantanu Jambhekar"}</h1>
                   <p className="text-gray-400 text-small">{'Dentist'}<br></br>
                   {'16'} years experience overall</p>
                 <p>
                  <h1 className="h1">{'Parentheses,Mumbai'}</h1> 
                  <p className="text-gray-600">{'Smilessence Center for Advanced Dentistry +1 more'}</p>
                  </p>
              
                  <b className="text-green-500">Free</b>
                  
                 <div className="flex">
                 <p className="text-gray-500">Consultation fee at clinic</p>
                 <div className="bookingbox"><b className="text-green-500">Available Today</b>
                 <button className="btn">Book FREE Clinic Visit</button></div></div>
                 <br></br>
                 <hr></hr>

                   </span>
                    </div>
                    
                    <div className="cardbox" >                 
                    <div className="relative">
                        <Image src={download} alt="background" className="fleet--clip"/>

                    </div>
                    <span className="commanbox">
                   <h1 className="drname">{"Dr. Shantanu Jambhekar"}</h1>
                   <p className="text-gray-400 text-small">{'Dentist'}<br></br>
                   {'16'} years experience overall</p>
                 <p>
                  <h1 className="h1">{'Parentheses,Mumbai'}</h1> 
                  <p className="text-gray-600">{'Smilessence Center for Advanced Dentistry +1 more'}</p>
                  </p>
              
                  <b className="text-green-500">Free</b>
                  
                 <div className="flex">
                 <p className="text-gray-500">Consultation fee at clinic</p>
                 <div className="bookingbox"><b className="text-green-500">Available Today</b>
                 <button className="btn">Book FREE Clinic Visit</button></div></div>
                 <br></br>
                 <hr></hr>
<br></br>
                   </span>
                    </div>
                    
                    <div className="cardbox" >                 
                    <div className="relative">
                        <Image src={download} alt="background" className="fleet--clip"/>

                    </div>
                    <span className="commanbox">
                   <h1 className="drname">{"Dr. Shantanu Jambhekar"}</h1>
                   <p className="text-gray-400 text-small">{'Dentist'}<br></br>
                   {'16'} years experience overall</p>
                 <p>
                  <h1 className="h1">{'Parentheses,Mumbai'}</h1> 
                  <p className="text-gray-600">{'Smilessence Center for Advanced Dentistry +1 more'}</p>
                  </p>
              
                  <b className="text-green-500">Free</b>
                  
                 <div className="flex">
                 <p className="text-gray-500">Consultation fee at clinic</p>
                 <div className="bookingbox"><b className="text-green-500">Available Today</b>
                 <button className="btn">Book FREE Clinic Visit</button></div></div>
                 <br></br>
                 <hr></hr>
<br></br>
                   </span>
                    </div>
                    <div className="cardbox" >                 
                    <div className="relative">
                        <Image src={download} alt="background" className="fleet--clip"/>

                    </div>
                    <span className="commanbox">
                   <h1 className="drname">{"Dr. Shantanu Jambhekar"}</h1>
                   <p className="text-gray-400 text-small">{'Dentist'}<br></br>
                   {'16'} years experience overall</p>
                 <p>
                  <h1 className="h1">{'Parentheses,Mumbai'}</h1> 
                  <p className="text-gray-600">{'Smilessence Center for Advanced Dentistry +1 more'}</p>
                  </p>
              
                  <b className="text-green-500">Free</b>
                  
                 <div className="flex">
                 <p className="text-gray-500">Consultation fee at clinic</p>
                 <div className="bookingbox"><b className="text-green-500">Available Today</b>
                 <button className="btn">Book FREE Clinic Visit</button></div></div>
                 <br></br>
                 <hr></hr>

<br></br>

                   </span>
                    </div>
                    
            </div>
            </div>

       </div>
       <div className="max-w-screen-2xl w-full">
       <FAQ />
       </div>
       <Footer />
       </>
    )
}