
export const Input = ({ type, name, className, placeholder, value, onChange }) => {
    return (
        <input
          type={type}
          name={name}
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
    )
}