import "../../styles/Auth.css";

type AuthInputProps = {
    id: string;
    label: string;
    type?: "text" | "password" | "email";
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

const AuthInput = ({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
}: AuthInputProps) => {
    return (
        <div className="auth-input-wrapper">
            <label className="auth-label">{label}</label>
            <input
                id={ id }
                type={type}
                className={`auth-input ${error ? "error" : ""}`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {error && <span className="auth-input-error">{error}</span>}
        </div>
    );
};

export default AuthInput;