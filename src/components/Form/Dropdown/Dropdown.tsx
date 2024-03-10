const sizes = {
    sm: 'w-16',
    md: 'w-32',
    lg: 'w-48',
    full: 'w-full'
};

export interface DropdownProps {
    title?: string;
    selectedOption: string;
    options: string[];
    onChange: (value: string) => void;
    size: keyof typeof sizes
}

export const Dropdown = ({ title, selectedOption, options, onChange, size }: DropdownProps) => {
    return (
        <div className={`flex flex-col gap-2 ${sizes[size]}`}>
            {title && <p className="font-bold text-sm dark:text-white">{title}</p>}
            <select value={selectedOption} onChange={(e) => { onChange(e.target.value) }} className={`bg-white dark:bg-zinc-1000 dark:text-white border dark:border-zinc-600 rounded-lg px-4 py-3 w-full`}>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown;