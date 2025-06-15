import { useAppContext } from "../providers";

export default function DiseaseDetection() {
  const { language, theme } = useAppContext();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Disease Detection Page</h1>
      {/* TODO: Add disease detection page content */}
    </div>
  );
}
