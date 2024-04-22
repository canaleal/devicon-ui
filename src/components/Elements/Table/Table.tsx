import React from 'react';

const sizes = {
    sm: 'w-16',
    md: 'w-32',
    lg: 'w-48',
    full: 'w-full'
};

export interface TableProps<T> {
    title?: string;
    data: T[];
    headers: string[];
    keyExtractor: (item: T, index: number) => string;
    rowRenderer: (item: T) => React.ReactNode[];
    onRowClick?: (item: T) => void;
    size: keyof typeof sizes;
}

export function Table<T>({ title, data, headers, keyExtractor, rowRenderer, onRowClick, size }: TableProps<T>) {
    if (!data.length) return null;

    return (
        <div className={`flex flex-col gap-2 ${sizes[size]}`}>
            {title && <p className="font-bold text-sm dark:text-white">{title}</p>}
            <div className="flex rounded-lg border-2 overflow-hidden w-full dark:text-white dark:border-zinc-600  bg-white dark:bg-dark-900 ">
                <table className="table-auto w-full">
                    <thead className="border-b-2 dark:border-zinc-600 bg-dark-600 text-white">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="text-left px-4 py-3">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={keyExtractor(item, index)} className={` hover:bg-dark-50 dark:hover:bg-dark-600 cursor-pointer `}
                                onClick={() => onRowClick && onRowClick(item)} >
                                {rowRenderer(item).map((cell, cellIndex) => (
                                    <td key={cellIndex} className="text-left px-4 py-2">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
