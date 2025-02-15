"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FeatureImage } from "@/components/ui/image";

export default function ImageConverter() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(300);
  const [originalHeight, setOriginalHeight] = useState<number>(300);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);
  const [quality, setQuality] = useState<number>(80);
  const [format, setFormat] = useState<string>("jpeg");
  const [isWidthChanged, setIsWidthChanged] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreview(url);

      const img = new Image();
      img.src = url;
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
      };
    }
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    setHeight(Math.round((newWidth * originalHeight) / originalWidth));
    setIsWidthChanged(true);
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (!isWidthChanged) {
      setWidth(Math.round((newHeight * originalWidth) / originalHeight));
    }
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image first");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("width", width.toString());
    formData.append("height", height.toString());
    formData.append("quality", quality.toString());
    formData.append("format", format);

    const response = await fetch("/api/convert", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `converted.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Error processing the image");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 p-6 bg-white shadow-lg rounded-r-2xl">
        <h2 className="text-lg font-semibold mb-4">Conversion Options</h2>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Width (px)</span>
            <input
              type="number"
              value={width}
              onChange={(e) => handleWidthChange(Number(e.target.value))}
              className="mt-1 w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Height (px)</span>
            <input
              type="number"
              value={height}
              onChange={(e) => handleHeightChange(Number(e.target.value))}
              className="mt-1 w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Quality (%)</span>
            <input
              type="number"
              value={quality}
              min="1"
              max="100"
              onChange={(e) => setQuality(Number(e.target.value))}
              className="mt-1 w-full p-2 border rounded"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Format</span>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WEBP</option>
              <option value="gif">GIF</option>
            </select>
          </label>
        </div>

        <Button className="mt-6 w-full" onClick={handleSubmit}>
          <Download className="h-4 w-4 mr-2" />
          Convert Image
        </Button>
      </div>

      {/* Preview Section */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Image Converter</h1>

        <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg flex flex-col items-center">
        {!preview && (
            <label className="w-full cursor-pointer flex flex-col items-center border-dashed border-2 border-gray-300 py-6 rounded-lg">
                <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                />
                <span className="text-gray-500">Click or drag an image here</span>
            </label>
            )}

          {preview && (
            <div className="mt-4 flex justify-center">
                <FeatureImage preview={preview} widthpx={width} heightpx={height} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
