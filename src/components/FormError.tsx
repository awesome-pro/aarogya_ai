import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


interface FormErrorProps {
    message?: string;
};

export const FormError = ({
    message
}: FormErrorProps) => {
    if(!message) return null

    return (
        <div className="bg-red-200 p-3 rounded-md flex items-center justify-center gap-x-2 text-sm text-red-600">
            <ExclamationTriangleIcon className="h-10 w-10"/>
            <p className="">{message}</p>
        </div>
    )
}