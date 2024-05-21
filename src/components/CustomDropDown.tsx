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
import { set } from "mongoose"
import { Input } from "./ui/input"
import DoctorCard from "./DoctorCard"
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function DropdownMenuRadioGroupDemo() {
  
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

      const response = await fetch(`/api/get-doctors?query=${setQuery}?department=${selectedDepartment}&location=${selectedLocation}&disease=${selectedDisease}`)
        const data = await response.json();
        setDoctorData(data.doctors);

      if(data.doctors.length === 0 || data.doctors === undefined){
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
      {loading && <p>Loading...</p>}
      {errorMessage && <p className="w-full bg-red-200 text-red-600 p-4 ">{errorMessage}</p>}
      {successMessage && <p className="bg-teal-200 text-teal-600 p-3 w-full">{successMessage}</p>}

      <div className=" flex  gap-8 items-center justify-center bg-white px-8 py-6 ">
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
     
        {selectedDisease && <p>Selected Department: {selectedDisease}</p>}
        {selectedDepartment && <p>Selected Disease: {selectedDepartment}</p>}
        { selectedLocation && <p>Selected Location: {selectedLocation}</p>}


        <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Doctors"
            className="w-56"
        />
        <Button 
        onClick={fetchDoctors}
        >
            Search Doctors
        </Button>


        <div  className="mt-10">
        <h1>Doctors</h1>

        {doctorData &&  doctorData.map((doctor) => (
            // <div key={doctor.name} className="bg-sky-300 p-10 gap-4 ">
            // <p>{doctor.name}</p>
            // <p>{doctor.location}</p>
            // <p>{doctor.specialty}</p>
            // <p>{doctor.experience}</p>
            // <p>{doctor.availability}</p>
            // <p>{doctor.consultationFee}</p>
            // <p>{doctor.hospital}</p>
            // <p>{doctor.bio}</p>
            // <img src={doctor.image} alt="doctor" />
            // </div>

            <div key={doctor.name} className="flex flex-col gap-4 items-center justify-center w-full">
                <DoctorCard
                    name={doctor.name}
                    location={doctor.location}
                    specialty={doctor.specialty || []}
                    experience={doctor.experience || "0"}
                    availability={doctor.availability || "Not Available"}
                    consultationFee={doctor.consultationFee || 0}
                    hospital={doctor.hospital || "Data not available"}
                    bio={doctor.bio || "Data not available"}
                    image={doctor.image || "/icons/doctor-placeholder.png"}
                />
            </div>
        ))}
        </div>
    </div>
  )
}
