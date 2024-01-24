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

  validationObject?: any;
  [key: string]: any;
}

const Checkbox = ({
  label,
  labelClassName,
  name,
  isRequired = false,
  placeholder = "",
  onChange,
  className = "",
  pClassName = "checkbox-container",
  error,

  validationObject,
  ...rest
}: InputProps) => (
  <div className={pClassName}>
    {/* <input name={name} type="checkbox" {...register(name)} /> */}
    <input
      aria-label={label}
      id={name}
      name={name}
      type="checkbox"
      onChange={onChange}
      className={classNames({ "input-error": error, [className]: className })}
      {...rest}
    />
    {label && (
      <label className={labelClassName && classNames({ [labelClassName]: labelClassName })} htmlFor={name}>
        {label} {isRequired && <sup>*</sup>}
      </label>
    )}

    {error && <div className="error-text">{error.message}</div>}
  </div>
);
export default Checkbox;
