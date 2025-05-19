import { animated, useSpring } from '@react-spring/web';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useDrag } from '@use-gesture/react';
import React, { useEffect, useState } from 'react';

interface CarouselProps {
    items: React.ReactNode[];
    autoPlay?: boolean;
    interval?: number;
    showArrows?: boolean;
    showDots?: boolean;
}

export default function Carousel({ items, autoPlay = true, interval = 3000, showArrows = true, showDots = true }: CarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [springs, api] = useSpring(() => ({
        x: 0,
        config: { tension: 280, friction: 60 },
    }));

    const bind = useDrag(({ down, movement: [mx], direction: [xDir], cancel }) => {
        // If we're dragging more than 50px in either direction
        if (down && Math.abs(mx) > 50) {
            // Determine direction and update index
            const newIndex = xDir > 0 ? Math.max(activeIndex - 1, 0) : Math.min(activeIndex + 1, items.length - 1);

            setActiveIndex(newIndex);
            cancel();
        }

        // Update spring based on drag
        api.start({
            x: down ? mx : 0,
            immediate: down,
        });
    });

    const goToSlide = (index: number) => {
        setActiveIndex(index);
    };

    const nextSlide = () => {
        setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
    };

    const prevSlide = () => {
        setActiveIndex((current) => (current === 0 ? items.length - 1 : current));
    };

    // Auto play functionality
    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            nextSlide();
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval, activeIndex]);

    // Update spring when active index changes
    useEffect(() => {
        api.start({
            x: 0,
            immediate: false,
        });
    }, [activeIndex, api]);

    return (
        <div className="h-[400px] sm:h-[700px]">
            <div className="absolute inset-0 h-[400px] overflow-hidden rounded-xl sm:h-[700px]">
                <div className="relative h-full w-full" {...bind()} style={{ touchAction: 'pan-y' }}>
                    <animated.div
                        className="flex transition-transform"
                        style={{
                            width: `${items.length * 100}%`,
                            transform: springs.x.to((x) => `translateX(calc(-${activeIndex * (100 / items.length)}% + ${x}px))`),
                        }}
                    >
                        {items.map((item, index) => (
                            <div key={index} className="relative flex-shrink-0" style={{ width: `${100 / items.length}%` }}>
                                {item}
                            </div>
                        ))}
                    </animated.div>
                </div>

                {/* Navigation Arrows */}
                {showArrows && items.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                            aria-label="Previous slide"
                        >
                            <IconChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                            aria-label="Next slide"
                        >
                            <IconChevronRight size={20} />
                        </button>
                    </>
                )}

                {/* Dots Indicator */}
                {showDots && items.length > 1 && (
                    <div className="absolute right-0 bottom-4 left-0 flex justify-center gap-2">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                                    index === activeIndex ? 'bg-white dark:bg-gray-200' : 'bg-white/50 dark:bg-gray-500/50'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
