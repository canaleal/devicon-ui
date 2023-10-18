
import React, { useState } from 'react';

const sizes = {
    sm: 'w-16',
    md: 'w-32',
    lg: 'w-48',
    xl: 'w-96',
    full: 'w-full'
};

export interface SearchBarProps {
    placeholder?: string;
    size?: keyof typeof sizes;
    onSearch: (query: string) => void;
}

const SearchBar = ({ placeholder = "Search", size, onSearch }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={`px-4 ${size} border rounded-lg bg-white dark:bg-zinc-800 dark:border-zinc-600`}
            />
    );
}

export default SearchBar;
