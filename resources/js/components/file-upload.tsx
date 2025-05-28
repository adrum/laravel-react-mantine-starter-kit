import { UploadConfig, useFileUpload, UseFileUploadOptions } from '@/hooks/use-fileupload';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ActionIcon, Alert, Badge, Button, Group, Image, Paper, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconAlertCircle, IconMusic, IconPhoto, IconUpload, IconVideo, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';

interface SortableItemProps {
    file: FileWithPath;
    index: number;
    onRemove: (index: number) => void;
    getFilePreview: (file: File) => string;
    revokeFilePreview: (url: string) => void;
}

function SortableItem({ file, index, onRemove, getFilePreview, revokeFilePreview }: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: file.path });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none',
    };

    const fileUrl = getFilePreview(file);

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation(); // This is crucial
        onRemove(index);
        revokeFilePreview(fileUrl);
    };

    return (
        <Paper
            ref={setNodeRef}
            style={{
                ...style,
                position: 'relative',
                height: 200,
                overflow: 'hidden',
            }}
            p="md"
            shadow="sm"
            {...attributes}
            {...listeners}
        >
            <ActionIcon variant="filled" color="red" onClick={handleRemove} style={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}>
                <IconX size={16} />
            </ActionIcon>

            {/* File size badge */}
            <Badge size="xs" style={{ position: 'absolute', top: 5, left: 5, zIndex: 1 }}>
                {(file.size / 1024 / 1024).toFixed(1)}MB
            </Badge>

            {file.type.startsWith('image/') ? (
                <Image src={fileUrl} onLoad={() => revokeFilePreview(fileUrl)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : file.type.startsWith('audio/') ? (
                <Group justify="center" align="center" h="100%">
                    <IconMusic size={48} />
                    <Text size="sm" ta="center">
                        {file.name}
                    </Text>
                    <audio controls src={fileUrl} style={{ width: '100%' }} />
                </Group>
            ) : file.type.startsWith('video/') ? (
                <video controls src={fileUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : null}
        </Paper>
    );
}

interface FileUploadProps {
    onUpload?: (config: UploadConfig) => void;
    uploadConfig?: Partial<UploadConfig>;
    hookOptions?: UseFileUploadOptions;
    showStats?: boolean;
    enablePasteUpload?: boolean;
}

export default function FileUpload({ onUpload, uploadConfig = {}, hookOptions = {}, showStats = true, enablePasteUpload = true }: FileUploadProps) {
    const {
        files,
        isUploading,
        errors,
        stats,
        addFiles,
        removeFile,
        clearFiles,
        reorderFiles,
        uploadFiles,
        getFilePreview,
        revokeFilePreview,
        canUpload,
    } = useFileUpload({
        maxFiles: 10,
        maxFileSize: 10 * 1024 * 1024, // 10MB
        acceptedTypes: ['image/*', 'audio/*', 'video/*'],
        ...hookOptions,
    });

    const ACCEPTED_MIME_TYPES = {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
        'audio/*': ['.mp3', '.wav', '.ogg'],
        'video/*': ['.mp4', '.webm', '.mov', '.avi'],
    };

    // Paste functionality
    useEffect(() => {
        if (!enablePasteUpload) return;

        const handlePaste = (event: ClipboardEvent) => {
            const clipboardData = event.clipboardData;
            if (!clipboardData || clipboardData.files.length === 0) return;

            const newFiles: FileWithPath[] = [];

            for (let i = 0; i < clipboardData.files.length; i++) {
                const file = clipboardData.files[i];
                if (file.type.startsWith('image/') || file.type.startsWith('audio/') || file.type.startsWith('video/')) {
                    const fileWithPath = Object.assign(file, {
                        path: `pasted-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}-${file.name || 'unnamed'}`,
                    });
                    newFiles.push(fileWithPath);
                }
            }

            if (newFiles.length > 0) {
                addFiles(newFiles);
                event.preventDefault();
            }
        };

        document.addEventListener('paste', handlePaste);
        return () => document.removeEventListener('paste', handlePaste);
    }, [addFiles, enablePasteUpload]);

    const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5, // Require a 5px movement before dragging starts
        },
    })
);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = files.findIndex((f) => f.path === active.id);
            const newIndex = files.findIndex((f) => f.path === over?.id);
            reorderFiles(oldIndex, newIndex);
        }
    };

    const handleUpload = () => {
        if (onUpload) {
            onUpload(uploadConfig as UploadConfig);
        } else if (uploadConfig.endpoint) {
            uploadFiles(uploadConfig as UploadConfig);
        }
    };

    return (
        <div style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
            {/* Upload Zone */}
            <div style={{ padding: 16, flexShrink: 0 }}>
                <Dropzone accept={ACCEPTED_MIME_TYPES} onDrop={addFiles} loading={isUploading} disabled={isUploading}>
                    <Group justify="center" gap="xl">
                        <IconPhoto size={40} />
                        <IconMusic size={40} />
                        <IconVideo size={40} />
                    </Group>
                    <Text ta="center" mt="sm">
                        Drop files here, click to browse{enablePasteUpload ? ', or paste from clipboard' : ''}
                    </Text>
                    {hookOptions.maxFiles && (
                        <Text ta="center" size="sm" c="dimmed">
                            Maximum {hookOptions.maxFiles} files, {((hookOptions.maxFileSize || 10485760) / 1024 / 1024).toFixed(1)}MB each
                        </Text>
                    )}
                </Dropzone>

                {/* Error Messages */}
                {errors.length > 0 && (
                    <Alert icon={<IconAlertCircle size={16} />} color="red" mt="md">
                        {errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </Alert>
                )}



                {/* Controls */}
                {files.length > 0 && (
                    <Group mt="md">
                        <Button leftSection={<IconUpload size={16} />} onClick={handleUpload} loading={isUploading} disabled={!canUpload}>
                            Upload {files.length} file{files.length !== 1 ? 's' : ''}
                        </Button>
                        <Button variant="outline" color="red" onClick={clearFiles} disabled={isUploading}>
                            Clear All
                        </Button>
                    </Group>
                )}
            </div>

            {/* File Grid */}
            {files.length > 0 && (
                <ScrollArea style={{ flex: 1, padding: 16 }}>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={files.map((f) => f.path)} strategy={verticalListSortingStrategy}>
                            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                                {files.map((file, index) => (
                                    <SortableItem
                                        key={file.path}
                                        file={file}
                                        index={index}
                                        onRemove={removeFile}
                                        getFilePreview={getFilePreview}
                                        revokeFilePreview={revokeFilePreview}
                                    />
                                ))}
                            </SimpleGrid>
                        </SortableContext>
                    </DndContext>
                </ScrollArea>
            )}
        </div>
    );
}
