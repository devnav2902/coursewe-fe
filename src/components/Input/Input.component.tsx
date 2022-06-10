import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  required: boolean | string;
  type: string;
  register: UseFormRegister<any>;
}

const Input: FC<Props> = ({ label, name, register, required, type }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        {...register(name, { required })}
        id={name}
        className="form-input"
      />
    </>
  );
};

export default Input;
