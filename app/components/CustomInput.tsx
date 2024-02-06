import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface CustomInputProps {
    type: 'text' | 'textarea' | 'image' | 'password' | 'number' | 'email'; // Define the type prop to only accept 'text' or 'textarea'
    name: string;
    defaultValue?: string;
    rules?: Record<string, unknown>;
    placeholder?: string;
    inputHeight?: string;
    control: any;
    disabled?: boolean;
    pattern?: any;
    customStyles?: string;
}

interface PasswordProps { 
    value: string; 
    onChange: (value: string) => void, 
    customStyles?: string; 
    invalid?: boolean;
    placeholder?: string;
}


const PasswordInput: React.FC<PasswordProps> = ({
    value,
    onChange,
    customStyles,
    invalid,
    placeholder
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
    <div className="relative">
        <input
            type={showPassword ? 'text' : 'password'}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full p-[6.7px] ${customStyles} px-5 text-slate-500 border rounded outline-none ${
                invalid ? 'border-1 border-red-500 bg-[#FEF2F2]' : 'border-1 border-slate-200'
            }`}
        />
        <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute transform -translate-y-1/2 top-1/2 right-3 focus:outline-none"
        >
            {showPassword ? <FaEyeSlash /> : <FaEye /> }
        </button>
    </div>
    );
};

const CustomInput: React.FC<CustomInputProps> = ({
    type,
    name,
    control,
    defaultValue,
    rules,
    placeholder,
    disabled = false,
    inputHeight = '45px',
    pattern,
    customStyles

}) => {


    return (
        <div className="flex flex-col w-full gap-2">
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onBlur, onChange }, fieldState: { error, invalid } }) => (
            <>
            {type === 'text' || type === 'number' || type === 'email' ? (
                <input
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    type={type}
                    id={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    className={`w-full p-[6.7px] ${customStyles} px-5 text-slate-500 border rounded outline-none ${
                    invalid ? 'border-1 border-red-500 bg-[#FEF2F2]' : 'border-1 border-slate-200'
                    }`}
                />
            ) : type === 'password' ? (
                <PasswordInput
                    value={value} 
                    onChange={onChange} 
                    customStyles={customStyles}
                    invalid={invalid}
                    placeholder={placeholder}
                />
            ) : type === 'textarea' ? (
                <textarea
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    id={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    className={`p-2 w-full px-5 text-slate-500 border md:h-32 rounded outline-none ${
                    invalid ? 'border-1 border-red-500 bg-[#FEF2F2]' : 'border-1 border-slate-200'
                    }`}
                />
            ) : type === 'image' ? (
                <input
                    type="file"
                    id={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    className={`p-2 w-full px-5 text-slate-500 border rounded outline-none ${
                    invalid ? 'border-1 border-red-500 bg-[#FEF2F2]' : 'border-1 border-slate-200'
                    }`}
                />
            ) : null}
                {invalid && (
                <div className="text-right font-medium text-[#FF7979] text-[12px] italic" style={{ color: 'red' }}>
                    {error?.message || 'Error'}
                </div>
                )}
            </>
            )}
        />
        </div>
    );
};

export default CustomInput;
