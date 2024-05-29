import React from 'react'
import { Button } from './ui/button'

function MyButton(
    {
        label,
        onClick,
        disabled = false,
        type = 'button',
        className = '',
        variant = 'default',
    } : {
        label: string;
        onClick: () => void;
        disabled?: boolean;
        type?: 'button' | 'submit' | 'reset';
        className?: string;
        variant?: 'default' | 'secondary' | 'destructive' | 'link' | 'ghost' | 'outline'
    }
) {
    return (
        <Button
        className={className + ' ' + 'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent max-w-96'}
        onClick={onClick}
        disabled={disabled}
        type={type}
        variant={variant}
        >
                {label}
        </Button>
    )
}

export default MyButton