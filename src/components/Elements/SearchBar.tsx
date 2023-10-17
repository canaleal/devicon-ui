
import React, { useState } from 'react';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
}

const SearchBar = ({ placeholder = "Search", onSearch }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="flex space-x-4 w-2/6">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="flex-grow px-4 border rounded-lg bg-white dark:bg-zinc-800 dark:border-zinc-600"
            />
        </div>
    );
}

export default SearchBar;
