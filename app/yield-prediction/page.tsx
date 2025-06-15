import { useAppContext } from "../providers";

export default function YieldPrediction() {
  const { language, theme } = useAppContext();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Yield Prediction Page</h1>
      {/* TODO: Add yield prediction page content */}
    </div>
  );
}