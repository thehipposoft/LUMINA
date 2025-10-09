import React from "react";

type HeroBannerProps = {
    title?: React.ReactNode;
    imageUrl?: string;
};

const HeroBanner = ({
    title,
    imageUrl
}: HeroBannerProps) => {
    return (
        <section className="min-h-[80vh] bg-green-300 relative">
            <div className="absolute left-20 top-1/2 -translate-y-1/2">
                {
                    title && (
                        <div>
                            {title}
                        </div>
                    )
                }
            </div>
      </section>
    );
};

export default HeroBanner;
