
interface AliasNameBarProps {
    aliases: {
        base: string
        alias: string
    }[]
}

const AliasNameTable = ({ aliases }: AliasNameBarProps) => {
    if (!aliases.length) return <></>
    return (
        <div className="px-4 py-2 flex rounded-lg border-2 overflow-hidden w-full dark:text-white dark:border-zinc-600">
            <table className="table-auto w-full" >
                <thead className="border-b-2 dark:border-zinc-600">
                    <tr>
                        <th className="text-left px-4 py-2">Base</th>
                        <th className="text-left px-4 py-2">Alias</th>
                    </tr>
                </thead>
                <tbody>
                    {aliases.map((alias, index) => (
                        <tr key={index}>
                            <td className="text-left px-4 py-2">{alias.base}</td>
                            <td className="text-left px-4 py-2">{alias.alias}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AliasNameTable