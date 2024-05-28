import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath } from 'react-hook-form';
import * as z from "zod";
import {  doctorFormSchema } from '@/lib/utils';

const formSchema = doctorFormSchema// Use the appropriate type

export interface CustomDoctorInput {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string,
  description: string,
  disabled?: boolean,
  type: "email" | "password" | "text" | "number" | "tel" | "file" | "date",
}

function CustomDoctorInput({ control, name, label, placeholder, description, disabled, type }: CustomDoctorInput) {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <div className='form-item'>
          <FormLabel className='form-label font-semibold'>
            {label}
          </FormLabel>
          <div className='w-full flex flex-col'>
            <FormControl>
              <Input
                placeholder={placeholder}
                className='input-class'
                type={type}
                {...field}
              />
            </FormControl>
            <FormDescription className='mt-2'>
              {description}
            </FormDescription>
            <FormMessage className='form-message mt-1' />
          </div>
        </div>
      )}
    />
  );
}

export default CustomDoctorInput;
