import React from 'react';

export interface TableProps<T> {
    data: T[];
    headers: string[];
    keyExtractor: (item: T, index: number) => string;
    rowRenderer: (item: T) => React.ReactNode[];
    onRowClick?: (item: T) => void;
}

export function Table<T>({ data, headers, keyExtractor, rowRenderer, onRowClick }: TableProps<T>) {
    if (!data.length) return null;

    return (
        <div className="px-4 py-2 flex rounded-lg border-2 overflow-hidden w-full dark:text-white dark:border-zinc-600">
            <table className="table-auto w-full">
                <thead className="border-b-2 dark:border-zinc-600">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="text-left px-4 py-2">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={keyExtractor(item, index)} className={`${onRowClick ? 'hover:bg-green-500 hover:text-white dark:hover:bg-zinc-700 cursor-pointer' : ''}`}
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
    );
}

export default Table;
