export default function PlaceholderImage({
  width,
  height,
  text = "Image",
  className = ""
}: {
  width: number;
  height: number;
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {text}
    </div>
  );
}