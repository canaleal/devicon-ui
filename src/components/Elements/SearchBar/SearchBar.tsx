
import React, { useState } from 'react';

const sizes = {
    sm: 'w-16',
    md: 'w-32',
    lg: 'w-48',
    xl: 'w-96',
    xxl: 'w-[24rem]',
    xxxl: 'w-[32rem]',
    full: 'w-full'
};

export interface SearchBarProps {
    placeholder?: string;
    size: keyof typeof sizes;
    onSearch: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Search", size, onSearch }: SearchBarProps) => {
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
                className={`px-4 ${sizes[size]} border rounded-lg bg-white dark:bg-zinc-900 dark:border-zinc-600`}
            />
    );
}

export default SearchBar;
