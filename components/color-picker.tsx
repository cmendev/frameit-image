import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker(props: ColorPickerProps) {
  const { label, color, onChange } = props;

  return (
    <div className="flex flex-col gap-2 p-2 rounded-lg">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <div className="flex items-center gap-3">
        <Input
          value={color}
          type="color"
          className="w-12 h-12 border border-gray-300 rounded-lg shadow-sm cursor-pointer"
          onChange={(e) => onChange(e.target.value)}
        />
        <Input
          value={color}
          type="text"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
