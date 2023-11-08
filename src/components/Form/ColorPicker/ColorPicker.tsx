
interface ColorPickerProps {
    color : string;
    onColorChange: (color: string) => void;
}

const ColorPicker = ({color, onColorChange}: ColorPickerProps) => {
    return (
        <input className="rounded-lg" type='color' value={color} onChange={(e) => { onColorChange(e.target.value) }} />
    )
}
export default ColorPicker;