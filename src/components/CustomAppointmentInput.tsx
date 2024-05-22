import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath } from 'react-hook-form';
import * as z from "zod";
import { appointmentFormSchema } from '@/lib/utils';

const formSchema = appointmentFormSchema // Use the appropriate type

interface CustomAppointmentInput {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string,
  description: string,
  disabled?: boolean,
  type: "email" | "password" | "text" | "number" | "tel" | "file" | "date",
  value?: string | number | readonly string[] | undefined | null,
  readonly?: boolean,
}

function CustomAppointmentInput({ control, name, label, placeholder, description, disabled, type, value, readonly }: CustomAppointmentInput) {
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
                {...field}
                type={type}
                value={
                  value ? value : field.value
                }
                readOnly={readonly}
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

export default CustomAppointmentInput;
