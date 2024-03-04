const sizes = {
    sm: 'w-16',
    md: 'w-32',
    lg: 'w-48',
    full: 'w-full'
};


interface ColorPickerProps {
    color: string;
    defaultColor?: string;
    onColorChange: (color: string) => void;
    size: keyof typeof sizes
}

export const ColorPicker = ({ defaultColor = "#000", color, onColorChange, size }: ColorPickerProps) => {
    return (
        <div className={`flex flex-col gap-2 ${sizes[size]} `}>
            <input className={`rounded-lg overflow-hidden w-full`} type='color' value={color} onChange={(e) => { onColorChange(e.target.value) }} />
            <button className={`ml-auto text-sm font-bold ${defaultColor != color ? 'text-green-600 hover:text-green-800' : 'hidden'} `} onClick={() => { onColorChange(defaultColor) }}>
                Reset Color
            </button>
        </div>

    )
}
export default ColorPicker;