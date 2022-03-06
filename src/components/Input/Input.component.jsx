const Input = ({ label, name, register, required, type }) => {
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
