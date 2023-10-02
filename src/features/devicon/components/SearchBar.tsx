// SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
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
                placeholder="Search Icons..."
                className="flex-grow px-3 py-2 border rounded-lg "
            />
        </div>
    );
}

export default SearchBar;
