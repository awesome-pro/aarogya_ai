
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
        <div className="py-24 bg-white">
       <div className="upper">
        <div className="flex">
        <input className="location" placeholder="Set your location"></input>
        <input className="docterhospital" placeholder="Ex.Docter,Hospital"></input>
      <button className="searchbtn">Search</button>
        </div>
       </div>
       <br></br>

        <div className="container">
            <h3 className="font-semibold mb-1 text black-100 text-xl">{'Doctors available in Andheri west'}</h3>
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
       <FAQ />
       <Footer />
       </>
    )
}
