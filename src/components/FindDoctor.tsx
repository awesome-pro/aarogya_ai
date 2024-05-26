"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Department } from "@/models/utils/Department"
import { Disease } from "@/models/Disease"
import { Doctor } from "@/models/Doctor"
import { Input } from "./ui/input"
import DoctorCard from "./DoctorCard"
import DoctorSkeleton from "./DocorSkeleton"
import { FormError } from "./FormError"
import { FormSuccess } from "./FormSuccess"
import Link from "next/link"
import Image from "next/image"
import { div } from "@tensorflow/tfjs"
import { CircleArrowUp } from "lucide-react"
import Swiper from "./Swiper"

export default function FindDoctor() {
  
    const [selectedDepartment, setSelectedDepartment] = React.useState<string>("cardiology")
    const [departmentData, setDepartmentData] = React.useState<Department[]>([])
    const [loading, setLoading] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [successMessage, setSuccessMessage] = React.useState("")
    const [diseaseData, setDiseaseData] = React.useState<Disease[]>([])
    const [selectedDisease, setSelectedDisease] = React.useState<string>("Fever")
    const [locationData, setLocationData] = React.useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = React.useState<string>("New Delhi");
    const [doctorData, setDoctorData] = React.useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = React.useState<string>("Dr. Shantanu Jambhekar");
    const [query, setQuery] = React.useState<string>("")

  const fetchDepartments = React.useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/get-all-departments")
      const data = await response.json()
      setDepartmentData(data.data)

      if (data.data.length === 0) {
        setErrorMessage("No departments found")
      }

      setSuccessMessage("Departments fetched successfully")
    } catch (error: any) {
      setErrorMessage("Error fetching departments: " + error.toString())
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [setDepartmentData])

  const fetchDiseases = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-all-disease")
      const data = await response.json();
      setDiseaseData(data.data);
      
      if(data.data.length === 0 || data.data === undefined){
        setErrorMessage("No diseases found");
      }

      setSuccessMessage("Diseases fetched successfully");

    } catch (error: any) {
      setErrorMessage("Error fetching diseases: " + error.toString());
      console.error(error);
    } finally{
      setLoading(false);
    }
  }
  , [setDiseaseData]);


  const fetchLocations = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-all-locations")
      const jsonData = await response.json();
      setLocationData(jsonData.data);

      if(jsonData.data.length === 0 || jsonData.data === undefined){
        setErrorMessage("No locations found");
      }

      setSuccessMessage("Locations fetched successfully");
      
    } catch (error: any) {
      setErrorMessage("Error fetching locations: " + error.toString());
      setErrorMessage("Error fetching locations");
      console.error(error);
    } finally{
      setLoading(false);
    }
  }, [setLocationData]);


  const fetchDoctors = React.useCallback(async () => {
    setLoading(true);

    try {

      const response = await fetch(`/api/get-doctor?department=${selectedDepartment}&location=${selectedLocation}&disease=${selectedDisease}`)
        const data = await response.json();
        setDoctorData(data.data);

      if(data.data.length === 0 || data.data === undefined){
        setErrorMessage("No doctors found");
      }


      setSuccessMessage(data.message);

      if(data.data.length === 0 || data.data === undefined){
        setErrorMessage("No doctors found");
      }
      setSuccessMessage("Doctors fetched successfully");
    } catch (error: any) {

      setErrorMessage("Error fetching doctors: " + error.toString());

      console.error(error);
    } finally{
      setLoading(false);
    }
  }, [setDoctorData, selectedDepartment, selectedLocation, selectedDisease]);



  React.useEffect(() => {
    fetchDepartments()
    fetchDiseases()
    fetchLocations()
    //fetchDoctors()
  }, [fetchDepartments, fetchDiseases, fetchLocations])

  return (
    <div className="">
      {
      loading && <div className="flex flex-col items-center justify-center gap-4">
        <DoctorSkeleton />
        <DoctorSkeleton />
        <CircleArrowUp size={48} className="animate-spin" />
      </div>
      }
      {errorMessage && <FormError message={errorMessage}/>}
      { successMessage && <FormSuccess message={successMessage}/>}

      <div className=" flex  gap-12 items-center justify-center px-8 py-6 bg-whitesmoke ">

           <div className="flex gap-2 items-center">
              <h1>Department</h1>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-xl w-32">{selectedDepartment}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Departments</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                      value={selectedDepartment}
                      onValueChange={setSelectedDepartment}
                  >
                      {departmentData.map((department) => (
                      <DropdownMenuRadioItem
                          key={department?.name}
                          value={department.name}
                      >
                          {department.name || "Select"}
                      </DropdownMenuRadioItem>
                      ))}
                  </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-2 items-center">
              <h1>Disease</h1>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Button variant="outline">{selectedDisease}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Disesase</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                      value={selectedDepartment}
                      onValueChange={setSelectedDisease}
                  >
                      {diseaseData.map((disease) => (
                      <DropdownMenuRadioItem
                          key={disease?.name}
                          value={disease.name}
                      >
                          {disease.name || "Select"}
                      </DropdownMenuRadioItem>
                      ))}
                  </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-2 items-center">
              <h1>Location</h1>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Button variant="outline">{selectedLocation}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Location</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                  >
                      {locationData.map((location) => (
                      <DropdownMenuRadioItem
                          key={location}
                          value={location}
                      >
                          {location || "Select"}
                      </DropdownMenuRadioItem>
                      ))}
                  </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
            variant={"default"}
            onClick={fetchDoctors}
            className="w-36 bg-sky-500 text-white rounded-3xl hover:bg-sky-700"
            >
            Search Doctors
            </Button>

      </div>
     
      <div className="flex items-center gap-3 justify-end w-full bg-blue-100 py-4 px-4">
              <p>Could'nt find?</p>
             <Link href="/consult-ai">
              <Button 
              variant={"default"}
              className="w-36  text-white rounded-3xl bg-gradient-to-r from-sky-500 to-blue-700 animate-pulse"
              >
                Consult AI
              </Button>
              </Link>
      </div>
       

        <div  className="mt-10">

         

          {
            doctorData.length === 0 ? (
              <div className="flex flex-col gap-2 items-center justify-center">
                 <CircleArrowUp size={44} className="animate-bounce" color="blue"/>
                <h1 className="text-2xl  font-bold text-blue-600">
                  Use Filters to Find Doctors 
                </h1>

                <Image
                  src="/images/doctor-search.jpeg"
                  alt="Doctor Placeholder"
                  width={400}
                  height={400}
                  className="rounded-xl mb-6"
                />
              </div>
            ) : (
              <h1 className="text-2xl  font-bold text-blue-600">
                  Doctor's List
              </h1>
            )
          }
    
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-2">
            {/* Content to show when loading is true */}
            <p>Loading...</p>
            <DoctorSkeleton />
            <DoctorSkeleton />
          </div>
        ) : (
          <div className="bg-whitesmoke">
              {doctorData &&  doctorData.map((doctor) => (
                  <div key={doctor.name} className="flex flex-col gap-4 items-center justify-center w-full">
                      <DoctorCard
                          name={doctor.name}
                          location={doctor.clinicAddress || "Data not available"}
                          specialty={['data not available']}
                          experience={doctor.experience || "0"}
                          availability={doctor.availability || "Not Available"}
                          consultationFee={doctor.consultationFee || 0}
                          hospital={doctor.hospital || "Data not available"}
                          bio={doctor.bio || "Data not available"}
                          image={doctor.image || "/icons/doctor-placeholder.png"}
                          _id={doctor?._id?.toString() || ""}
                      />
                  </div>
              ))}
          </div>
      )}
       
        </div>
    </div>
  )
}
