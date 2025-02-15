import Image from "next/image";

function FeatureImage({ preview, widthpx, heightpx }: { preview: string; widthpx: number, heightpx: number }) {
    return (
        <Image
        src={preview}
        alt="Preview"
        width={widthpx}
        height={heightpx}
        className="rounded-lg shadow"
        style={{ width: `${widthpx}px`, height: `${heightpx}px` }}
      />
    );
  }

export { FeatureImage };