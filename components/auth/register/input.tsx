import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  register: UseFormRegister<{
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  }>;
  id: "email" | "password" | "name" | "confirmPassword";
  type: "email" | "password" | "text";
  placeholder: string;
}

export function Input({ register, id, type, placeholder }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center border rounded-md overflow-hidden focus-within:border-black">
      <input
        {...register(id)}
        id={id}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        className="w-full py-2 px-4 outline-none"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="p-2"
        >
          {showPassword ? <EyeClosed /> : <Eye />}
        </button>
      )}
    </div>
  );
}
