import classNames from "classnames";


interface InputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  labelClassName?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  pClassName?: string;
  error?: any;
  register?: any;
  validationObject?: any;
  [key: string]: any;
}

const Input = ({
  label,
  labelClassName,
  name,
  isRequired = false,
  type = "text",
  placeholder = "",
  onChange,
  className = "",
  pClassName = "input-container",
  error,
  validationObject,
  ...rest
}: InputProps) => (
  <div className={pClassName}>
    {label && (
      <label className={labelClassName && classNames({ [labelClassName]: labelClassName })} htmlFor={name}>
        {label} {isRequired && <sup>*</sup>}
      </label>
    )}

    <input
      aria-label={label}
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      className={classNames({ "input-error": error, [className]: className })}
      onChange={onChange}
      {...rest}
    />

    {error && <div className="error-text">{error.message}</div>}
  </div>
);
export default Input;
