const InputProfile = ({
  label,
  name,
  type,
  classnameinput = "",
  classnamelabel = "",
  placeholder = "",
  value = "",
}) => {
  return (
    <>
      <label htmlFor={name} className={classnamelabel}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={classnameinput}
        name={name}
        value={value}
        placeholder={placeholder}
      />
    </>
  );
};

export default InputProfile;
