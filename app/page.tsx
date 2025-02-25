import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/card";
import { ImageIcon, PaintBucket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h2 className="text-4xl font-extrabold mb-4">Professional Image Tools</h2>
        <p className="text-lg text-gray-600 max-w-2xl">
          Enhance your images with our powerful tools. Convert images to different formats or create stunning gradient backgrounds easily.
        </p>
        <div className="mt-6 flex space-x-4">
          <Link href="/convert">
            <Button className="flex items-center">
              <ImageIcon className="mr-2" /> Convert Images
            </Button>
          </Link>
          <Link href="/gradient">
            <Button variant="outline" className="flex items-center">
              <PaintBucket className="mr-2" /> Background Gradient
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 text-center">
        <h3 className="text-2xl font-semibold mb-6">Why Choose Us?</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard title="Fast Conversion" description="Convert images in seconds with high quality." />
          <FeatureCard title="Custom Gradients" description="Create stunning backgrounds with ease." />
          <FeatureCard title="User-Friendly" description="Simple and intuitive interface for everyone." />
        </div>
      </section>
    </div>
  );
}

