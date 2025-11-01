import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
export const InputPassword = () => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        value={password}
        className="h-12 rounded-2xl border border-gray-300"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="text-gray-500 hover:text-gray-700 p-1 absolute right-2 top-3"
      >
        {visible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </button>
    </div>
  );
};
