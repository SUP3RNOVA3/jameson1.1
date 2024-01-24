import classNames from "classnames";

interface InputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  labelClassName?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  pClassName?: string;
  error?: any;
  options: { value: string; name: string }[];
  [key: string]: any;
}

const Select = ({
  label,
  labelClassName,
  name,
  isRequired = false,
  placeholder = "",
  onChange,
  className,
  pClassName = "input-container",
  error,
  options,
  ...rest
}: InputProps) => (
  <div className={pClassName}>
    {label && (
      <label
        className={
          labelClassName && classNames({ [labelClassName]: labelClassName })
        }
        htmlFor={name}
      >
        {label} {isRequired && <sup>*</sup>}
      </label>
    )}
    <select
      aria-label={label}
      id={name}
      name={name}
      // placeholder={placeholder || undefined}
      onChange={onChange}
      className={classNames({ "input-error": error })}
      {...rest}
    >
      {[
        placeholder && (
          <option key="disabled" value="" disabled hidden>
            {placeholder}
          </option>
        ),
        ...options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name || option.value}
          </option>
        )),
      ]}
    </select>

    {error && <div className="error-text">{error.message}</div>}
  </div>
);
export default Select;
