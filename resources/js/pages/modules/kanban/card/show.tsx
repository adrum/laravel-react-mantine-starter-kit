import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Image, Text, Box } from '@mantine/core';
import { IconVolume } from '@tabler/icons-react';

interface MediaPreviewProps {
    mediaUrl: string;
    mediaType: 'image' | 'video' | 'audio';
    alt?: string;
}

function MediaPreview({ mediaUrl, mediaType, alt }: MediaPreviewProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    switch (mediaType) {
        case 'image':
            return (
                <div className="w-full max-w-4xl mx-auto">
                    <Image
                        src={mediaUrl}
                        alt={alt || 'Card media'}
                        className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-lg"
                        fit="contain"
                    />
                </div>
            );

        case 'video':
            return (
                <div className="w-full max-w-4xl mx-auto relative">
                    <video
                        src={mediaUrl}
                        className="w-full h-auto max-h-[80vh] rounded-lg shadow-lg"
                        controls
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onVolumeChange={(e) => setIsMuted((e.target as HTMLVideoElement).muted)}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            );

        case 'audio':
            return (
                <div className="w-full max-w-2xl mx-auto">
                    <Box className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 shadow-lg">
                        <div className="flex flex-col items-center space-y-6">
                            {/* Audio Visualization */}
                            <div className="flex items-center justify-center w-32 h-32 bg-white/20 rounded-full backdrop-blur-sm">
                                <IconVolume size={48} className="text-white" />
                            </div>

                            {/* Audio Controls */}
                            <audio
                                src={mediaUrl}
                                className="w-full"
                                controls
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onVolumeChange={(e) => setIsMuted((e.target as HTMLAudioElement).muted)}
                            >
                                Your browser does not support the audio tag.
                            </audio>

                            <Text className="text-white text-center font-medium">
                                Audio File
                            </Text>
                        </div>
                    </Box>
                </div>
            );

        default:
            return (
                <div className="w-full max-w-2xl mx-auto">
                    <Box className="bg-gray-100 rounded-lg p-8 text-center">
                        <Text color="dimmed">Unsupported media type: {mediaType}</Text>
                    </Box>
                </div>
            );
    }
}

export default function CardShow({
    card,
}: {
    card: Module.Kanban.DTOs.CardData;
}) {

        const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Board',
            href: '/boards',
        },
        {
            title: 'Column',
            href: `/boards/show/${card.column.board.id}`,
        },
        {
            title: card.content ?? 'Card',
            href: `/cards/show?card_id=${card.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kanban Card" />

            <div className="container mx-auto px-4 py-8">
                {/* Card Header */}
                <div className="mb-6">
                    <Text size="xl" weight={600} className="mb-2">
                        Card Preview
                    </Text>
                </div>

                {/* Media Preview */}
                <div className="mb-6">
                    <MediaPreview
                        mediaUrl={card.media_card}
                        mediaType={card.media_type as 'image' | 'video' | 'audio'}
                        alt="Card media content"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
