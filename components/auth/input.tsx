import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  id: Path<T>;
  type: "email" | "password" | "text";
  placeholder: string;
}

export function Input<T extends FieldValues>({
  register,
  id,
  type,
  placeholder,
}: InputProps<T>) {
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
