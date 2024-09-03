import React from "react";
import { Input } from "@/components/ui/input";

interface LabeledInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Input placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default LabeledInput;
