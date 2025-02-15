function FeatureCard({ title, description }: { title: string; description: string }) {
    return (
      <div className="p-6 shadow-lg rounded-lg bg-gray-50">
        <h4 className="text-lg font-bold mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }

export { FeatureCard };