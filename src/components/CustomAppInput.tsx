import React from 'react';
import { FieldError } from 'react-hook-form';
import { Input } from './ui/input';

interface CustomAppInputProps {
  label: string;
  name: string;
  register: any;
  errors?: FieldError;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}

const CustomAppInput: React.FC<CustomAppInputProps> = ({
  label,
  name,
  register,
  errors,
  placeholder = '',
  disabled = false,
  type = 'text',
}) => {
  return (
    <div>
      <div className='font-semibold text-blue-600 font-xl '>
        {label}
        </div>
      <Input
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        className='border border-gray-300 rounded-md  p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent max-w-96'
      />
      {errors && <span>{errors.message}</span>}
    </div>
  );
};

export default CustomAppInput;
