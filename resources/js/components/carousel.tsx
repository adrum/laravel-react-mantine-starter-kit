import React, { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface CarouselProps {
    items: React.ReactNode[];
    autoPlay?: boolean;
    interval?: number;
    showArrows?: boolean;
    showDots?: boolean;
}

function Carousel({ items, autoPlay = true, interval = 3000, showArrows = true, showDots = true }: CarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [springs, api] = useSpring(() => ({
        x: 0,
        config: { tension: 300, friction: 40, mass: 0.8 },
    }));

    const bind = useDrag(
        ({ down, movement: [mx], direction: [xDir], velocity: [vx], last }) => {
            // Update spring based on drag with velocity
            // api.start({
            //     x: down ? mx : 0,
            //     immediate: down,
            //     config: {
            //         tension: down ? 200 : 500,
            //         friction: down ? 30 : 40
            //     }
            // });

            // If we're releasing with sufficient movement or velocity
            if (last && (Math.abs(mx) > 50 || Math.abs(vx) > 0.5)) {
                // Determine direction and update index
                if (mx < 0) {
                    // Dragged left (next slide)
                    setActiveIndex(prev => Math.min(prev + 1, items.length - 1));
                } else {
                    // Dragged right (previous slide)
                    setActiveIndex(prev => Math.max(prev - 1, 0));
                }
            }
        },
        {
            // Configure drag options
            filterTaps: true,
            rubberband: true,
            bounds: { left: -250, right: 250, top: 0, bottom: 0 },
            axis: 'x'
        }
    );

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
            config: {
                tension: 500,
                friction: 40,
                mass: 0.8,
                velocity: 0
            }
        });
    }, [activeIndex, api]);

    return (
        <div className="h-full overflow-hidden">
            <div className="inset-0  overflow-hidden ">
                <div
                    className="relative h-full w-full cursor-grab active:cursor-grabbing"
                    {...bind()}
                    style={{
                        touchAction: 'none',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none'
                    }}
                    onDragStart={(e) => e.preventDefault()}
                >
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
                            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-white"
                            aria-label="Previous slide"
                        >
                            <IconChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-white"
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

export default Carousel;
