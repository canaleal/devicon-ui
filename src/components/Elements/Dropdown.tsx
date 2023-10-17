
interface DropdownProps {
    selectedOption : string;
    options: string[];
    onChange: (value: string) => void;
    classes?: string;
}

const Dropdown = ({ selectedOption, options, onChange, classes }: DropdownProps) => {
    return (
        <select value={selectedOption} onChange={(e) => { onChange(e.target.value) }} className={`bg-white dark:bg-zinc-900 dark:text-white border dark:border-zinc-600 rounded-lg px-4 py-3 ${classes}`}>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    )
}

export default Dropdown