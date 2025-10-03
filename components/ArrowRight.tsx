"use client";

interface ArrowRightProps {
  size?: number;
  className?: string;
  gradientId?: string;
}

export default function ArrowRight({
  size = 24,
  className = "",
  gradientId = "arrowGradient"
}: ArrowRightProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-5 0 25 25"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
        <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#35E3ED" />
            <stop offset="50%" stopColor="#007BFF" />
            <stop offset="100%" stopColor="#A044FF" />
            </linearGradient>
        </defs>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M436.453517,38.569249 L447.302459,48.9938158 L447.39261,49.0748802 C447.75534,49.423454 447.968159,49.8870461 448,50.4382227 L447.998135,50.6228229 C447.968159,51.1129539 447.75534,51.576546 447.333675,51.9774469 L447.339095,51.9689832 L436.453517,62.430751 C435.663694,63.1897497 434.399001,63.1897497 433.609178,62.430751 C432.796941,61.650213 432.796941,60.3675924 433.609432,59.5868106 L443.012324,50.5572471 L433.609178,41.4129456 C432.796941,40.6324076 432.796941,39.349787 433.609178,38.569249 C434.399001,37.8102503 435.663694,37.8102503 436.453517,38.569249 Z"
                id="right"
            />
        </g>
    </svg>
  );
}
