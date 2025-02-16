import Image from "next/image";

function FeatureImage({ preview, widthpx, heightpx }: { preview: string; widthpx: number, heightpx: number }) {
  return (
    <Image
      src={preview}
      alt="Preview"
      width={widthpx / 2}
      height={heightpx / 2}
      className="rounded-lg shadow"
      style={{ width: `${widthpx / 2}px`, height: `${heightpx / 2}px` }}
    />
  );
}

export { FeatureImage };