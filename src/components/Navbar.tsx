"use client"

import Link from 'next/link'
import { Button } from './ui/button'
import  React, { useCallback, useEffect, useState } from 'react'
import { auth } from '@/auth'
import { useToast } from './ui/use-toast'
import { set } from 'mongoose'
import axios, { AxiosError } from 'axios'
import { NextResponse } from 'next/server'
import { useSession } from 'next-auth/react'
import { Department } from '@/models/utils/Department'

function Navbar() {

    const{ data: session } = useSession()

    console.log("session: ", session)
  
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [departments, setDepartments] = useState<Department[]>([])
    const [doctors, setDoctors] = useState([])
    const [diseases, setDiseases] = useState([])
    const [hospitals, setHospitals] = useState([])
    const [filterLoading, setFilterLoading] = useState(false)
  
    const { toast } = useToast()
  
  
    const fetchAllDepartments = useCallback(async (refresh: boolean = false) => {
      setLoading(true)
      setFilterLoading(true)
      try {
          const response = await axios.get('/api/get-all-departments')
          if(response.data){
            console.log("response.data: ", response.data)
              setDepartments(response.data || [])
          }
          if(refresh){
              toast({
                  title: 'Refreshed',
                  description: 'Departments refreshed successfully',
                  variant: 'success'
              })
          }
      } catch (error) {
        const axiosError = error as AxiosError<NextResponse>
        console.log("axiosError: ", axiosError)
  
        if (axiosError.response) {
          
        }
      } finally {
        setLoading(false)
        setFilterLoading(false)
      }
    }, [toast, setDepartments])
  
    useEffect(() => {
      if(!session){
          return
      }
  
      fetchAllDepartments()
    }, [fetchAllDepartments, session, toast, setDepartments])
  
  return (
    <div>
        
        <nav>
            
        </nav>
    </div>
  )
}

export default Navbar