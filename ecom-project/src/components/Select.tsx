import "./Select.css";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  value: string;
  options: SelectOption[];
  ariaLabel?: string;
  className?: string;
  onChange: (value: string) => void;
};

const Select = ({
  label,
  value,
  options,
  ariaLabel,
  className = "",
  onChange,
}: SelectProps) => {
  return (
    <label className={`select-field ${className}`.trim()}>
      {label && <span>{label}</span>}
      <select
        value={value}
        aria-label={ariaLabel}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
