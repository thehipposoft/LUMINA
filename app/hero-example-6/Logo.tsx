import { useRef, useEffect, useState } from "react";

const size = 300;

const HeroLogo = () => {
    const logoRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseDown = (e: MouseEvent) => {
            setIsDragging(true);
            setLastMouse({ x: e.clientX, y: e.clientY });
            container.style.cursor = 'grabbing';
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) {
                // Subtle hover effect when not dragging
                const rect = container.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const hoverX = (e.clientX - centerX) / rect.width * 10; // Max 10 degrees
                const hoverY = (e.clientY - centerY) / rect.height * -10; // Inverted Y

                setRotation(prev => ({
                    x: prev.x * 0.95 + hoverY * 0.05, // Smooth interpolation
                    y: prev.y * 0.95 + hoverX * 0.05
                }));
                return;
            }

            // Dragging behavior
            const deltaX = e.clientX - lastMouse.x;
            const deltaY = e.clientY - lastMouse.y;

            setRotation(prev => ({
                x: Math.max(-45, Math.min(45, prev.x + deltaY * 0.5)), // Clamp X rotation
                y: prev.y + deltaX * 0.5 // Free Y rotation
            }));

            setLastMouse({ x: e.clientX, y: e.clientY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            container.style.cursor = 'grab';
        };

        const handleMouseLeave = () => {
            setIsDragging(false);
            container.style.cursor = 'grab';
            // Return to center when mouse leaves
            setRotation(prev => ({
                x: prev.x * 0.95,
                y: prev.y * 0.95
            }));
        };

        // Add event listeners
        container.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isDragging, lastMouse]);

    return (
       <div
            ref={containerRef}
            className="inline-block cursor-grab select-none"
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
            }}
        >
            <svg
                ref={logoRef}
                width={size}
                height={size * (295.9 / 259)} // Maintain aspect ratio
                viewBox="0 0 259 295.9"
                className="transition-transform duration-75 ease-out"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d',
                    filter: 'drop-shadow(0 10px 20px rgba(0, 123, 255, 0.3))'
                }}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <defs>
                    <linearGradient id="luminaGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#35E3ED" />
                    <stop offset="50%" stopColor="#007BFF" />
                    <stop offset="100%" stopColor="#A044FF" />
                    </linearGradient>
                    <linearGradient id="luminaGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#007BFF" />
                    <stop offset="100%" stopColor="#A044FF" />
                    </linearGradient>
                    <linearGradient id="luminaGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#35E3ED" />
                    <stop offset="100%" stopColor="#007BFF" />
                    </linearGradient>
                </defs>      {/* Layer 1 - Bottom/Base layer */}
                <g className="logo-layer-1">
                    <path
                    fill="url(#luminaGradient1)"
                    fillRule="evenodd"
                    d="M12.19,193l104.6-62a18.25,18.25,0,0,1,18.81.07l104.14,62.84-104.6,62a18.23,18.23,0,0,1-18.81-.08L12.19,193ZM259,175.68v-.85a19.5,19.5,0,0,0-9.63-16.91L139.58,93.67a19.33,19.33,0,0,0-19.4-.07L9.91,157A19.51,19.51,0,0,0,.14,173.84l0,7.11L0,212.09A19.5,19.5,0,0,0,9.63,229l109.79,64.25a19.33,19.33,0,0,0,19.4.07l110.27-63.4a19.51,19.51,0,0,0,9.77-16.84l.14-37.41Z"
                    />
                </g>

                {/* Layer 2 - Middle layer */}
                <g className="logo-layer-2">
                    <path
                    fill="url(#luminaGradient2)"
                    fillRule="evenodd"
                    opacity="0.94"
                    d="M258.78,127.5a16.18,16.18,0,0,0-8.61-14.43l-112-62.55a17.32,17.32,0,0,0-17.23,0L9,113.07a16.41,16.41,0,0,0,0,28.87l112,62.55a17.32,17.32,0,0,0,17.23,0l112-62.55A16.19,16.19,0,0,0,258.78,127.5Z"
                    />
                </g>

                {/* Layer 3 - Top layer */}
                <g className="logo-layer-3">
                    <path
                    fill="url(#luminaGradient3)"
                    fillRule="evenodd"
                    opacity="0.94"
                    d="M258.78,79.28a16.19,16.19,0,0,0-8.61-14.44l-112-62.55a17.37,17.37,0,0,0-17.23,0L9,64.84A16.41,16.41,0,0,0,9,93.71l112,62.55a17.32,17.32,0,0,0,17.23,0l112-62.55A16.18,16.18,0,0,0,258.78,79.28Z"
                    />
                </g>
            </svg>
       </div>
    )
}

export default HeroLogo;
