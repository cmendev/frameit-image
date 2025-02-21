'use client'

import { Download } from "lucide-react";
import { Button } from "./ui/button";
import ColorPicker from "./color-picker";
import { useCallback, useRef, useState } from "react";
import SettingSlider from "./settings-slider";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas";
import { saveAs } from 'file-saver';
import Image from "next/image";

export default function ImageUpload() {
  const [startColor, setStartColor] = useState('#2500db');
  const [endColor, setEndColor] = useState('#ff4000');
  const [zoom, setZoom] = useState(100);
  const [transparency, setTransparency] = useState(100);
  const [borderRadius, setBorderRadius] = useState(0);
  const [shadow, setShadow] = useState(0);
  const [image, setImage] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        setImage(event.target.result.toString());
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  });

  const handleDownload = () => {
    if (resultRef.current) {
      html2canvas(resultRef.current).then((canvas) => {
        canvas.toBlob(blob => {
          if (blob) {
            saveAs(blob, 'image-with-background.png');
          }
        });
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar - Se ubica arriba en móviles y a la izquierda en pantallas grandes */}
      <div className="w-full md:w-72 p-6 bg-white shadow-lg overflow-y-auto rounded-b-2xl md:rounded-r-2xl">
        <h2 className="text-lg font-semibold mb-4">Background</h2>
        <ColorPicker label="Start Color" color={startColor} onChange={setStartColor} />
        <ColorPicker label="End Color" color={endColor} onChange={setEndColor} />
        
        <h2 className="text-lg font-semibold mt-6 mb-4">Adjustments</h2>
        <div className="space-y-4">
          <SettingSlider label="Zoom" min={50} max={120} step={1} value={zoom} onChange={setZoom} />
          <SettingSlider label="Transparency" min={0} max={100} step={1} value={transparency} onChange={setTransparency} unit="%" />
          <SettingSlider label="Border Radius" min={0} max={50} step={1} value={borderRadius} onChange={setBorderRadius} unit="px" />
          <SettingSlider label="Shadow" min={0} max={59} step={1} value={shadow} onChange={setShadow} unit="px" />
        </div>
      </div>

      {/* Image Preview */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <div
          ref={resultRef}
          className="relative w-full max-w-3xl h-96 flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-200 rounded-lg"
          style={{ backgroundImage: `linear-gradient(to top right, ${startColor}, ${endColor})` }}
        >
          <div {...getRootProps()} className="w-full h-full flex items-center justify-center cursor-pointer">
            <input {...getInputProps()} />
            {image ? (
              <Image
                src={image}
                alt="uploaded"
                className="max-w-full max-h-full"
                width={`${zoom *3}`}
                height={`${zoom*3}`}
                style={{
                  transform: `scale(${zoom / 100})`,
                  opacity: transparency / 100,
                  borderRadius: `${borderRadius}px`,
                  boxShadow: `0 0 ${shadow}px rgba(0, 0, 0, 0.5)`
                }}
              />
            ) : (
              <p className="text-gray-500">Drag & drop an image or click to upload</p>
            )}
          </div>
        </div>

        <Button onClick={handleDownload} className="mt-6 px-6 py-2 text-lg">
          <Download className="h-5 w-5 mr-2" /> Download
        </Button>
      </div>
    </div>
  );
}