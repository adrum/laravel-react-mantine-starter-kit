import { router } from '@inertiajs/react';
import { FileWithPath } from '@mantine/dropzone';
import { useCallback, useState } from 'react';

export interface UseFileUploadOptions {
    maxFiles?: number;
    maxFileSize?: number; // in bytes
    acceptedTypes?: string[];
    autoUpload?: boolean;
}

export interface UploadConfig {
    endpoint: string;
    method?: 'post' | 'put' | 'patch';
    additionalData?: Record<string, any>;
    onSuccess?: (response?: any) => void;
    onError?: (error: any) => void;
    preserveScroll?: boolean;
    forceFormData?: boolean;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
    const {
        maxFiles = 10,
        maxFileSize = 10 * 50024 * 50024, // 10MB default
        acceptedTypes = ['image/*', 'audio/*', 'video/*'],
        autoUpload = false,
    } = options;

    console.log(maxFileSize)

    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
    const [errors, setErrors] = useState<string[]>([]);

    // Add files with validation
    const addFiles = useCallback(
        (newFiles: FileWithPath[]) => {
            const validatedFiles: FileWithPath[] = [];
            const newErrors: string[] = [];

            newFiles.forEach((file) => {
                // Check file count limit
                if (files.length + validatedFiles.length >= maxFiles) {
                    newErrors.push(`Maximum ${maxFiles} files allowed`);
                    return;
                }

                // Check file size
                if (file.size > maxFileSize) {
                    newErrors.push(`${file.name} is too large (max ${(maxFileSize / 1024 / 1024).toFixed(1)}MB)`);
                    return;
                }

                // Check file type
                const isAccepted = acceptedTypes.some((type) => {
                    if (type.endsWith('/*')) {
                        return file.type.startsWith(type.replace('/*', '/'));
                    }
                    return file.type === type;
                });

                if (!isAccepted) {
                    newErrors.push(`${file.name} is not an accepted file type`);
                    return;
                }

                // Check for duplicates
                const isDuplicate = [...files, ...validatedFiles].some(
                    (existingFile) => existingFile.name === file.name && existingFile.size === file.size,
                );

                if (isDuplicate) {
                    newErrors.push(`${file.name} is already added`);
                    return;
                }

                validatedFiles.push(file);
            });

            if (newErrors.length > 0) {
                setErrors((prev) => [...prev, ...newErrors]);
                // Clear errors after 5 seconds
                setTimeout(() => {
                    setErrors((prev) => prev.filter((err) => !newErrors.includes(err)));
                }, 5000);
            }

            if (validatedFiles.length > 0) {
                setFiles((prev) => [...prev, ...validatedFiles]);
            }

            return validatedFiles;
        },
        [files, maxFiles, maxFileSize, acceptedTypes],
    );

    // Remove file by index
    //
    // Remove file by index
    // Remove file by index
    const removeFile = useCallback((index: number) => {
        console.log('Attempting to remove file at index:', index); // Debug log
        console.log('Current files before removal:', files); // Debug log

        setFiles((prevFiles) => {
            console.log('Previous files in setFiles:', prevFiles); // Debug log
            if (index < 0 || index >= prevFiles.length) {
                console.error('Invalid index:', index);
                return prevFiles;
            }

            const removedFile = prevFiles[index];
            console.log('File being removed:', removedFile); // Debug log

            setUploadProgress((prevProgress) => {
                const newProgress = { ...prevProgress };
                if (removedFile?.path) {
                    console.log('Removing progress for path:', removedFile.path); // Debug log
                    delete newProgress[removedFile.path];
                } else {
                    console.log('No path found on removed file'); // Debug log
                }
                return newProgress;
            });

            return prevFiles.filter((_, i) => i !== index);
        });
    }, []); // No dependencies needed

    // Remove file by path
    const removeFileByPath = useCallback((path: string) => {
        console.log('Attempting to remove file with path:', path); // Debug log
        console.log('Current files before removal:', files); // Debug log

        setFiles((prevFiles) => {
            const newFiles = prevFiles.filter((file) => {
                const matches = file.path !== path;
                if (!matches) {
                    console.log('Found file to remove:', file); // Debug log
                }
                return matches;
            });

            if (newFiles.length === prevFiles.length) {
                console.log('No file found with path:', path); // Debug log
            }

            return newFiles;
        });

        setUploadProgress((prevProgress) => {
            const newProgress = { ...prevProgress };
            if (path in newProgress) {
                console.log('Removing progress for path:', path); // Debug log
                delete newProgress[path];
            } else {
                console.log('No progress entry found for path:', path); // Debug log
            }
            return newProgress;
        });
    }, []); // No dependencies needed
    // Clear all files
    const clearFiles = useCallback(() => {
        setFiles([]);
        setUploadProgress({});
        setErrors([]);
    }, []);

    // Reorder files (for drag and drop sorting)
    const reorderFiles = useCallback((oldIndex: number, newIndex: number) => {
        setFiles((prev) => {
            const newFiles = [...prev];
            const [removed] = newFiles.splice(oldIndex, 1);
            newFiles.splice(newIndex, 0, removed);
            return newFiles;
        });
    }, []);

    // Upload files using Inertia
    const uploadFiles = useCallback(
        async (config: UploadConfig) => {
            if (files.length === 0) {
                setErrors(['No files to upload']);
                return;
            }

            const { endpoint, method = 'post', additionalData = {}, onSuccess, onError, preserveScroll = true, forceFormData = true } = config;

            setIsUploading(true);
            setErrors([]);

            try {
                // Prepare form data
                const formData = new FormData();

                // Add additional data
                Object.entries(additionalData).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
                    }
                });

                // Add files
                files.forEach((file, index) => {
                    formData.append(`files[${index}]`, file);
                    // Also add file metadata
                    formData.append(`file_names[${index}]`, file.name);
                    formData.append(`file_sizes[${index}]`, String(file.size));
                    formData.append(`file_types[${index}]`, file.type);
                });

                // Use Inertia router
                router[method](endpoint, formData, {
                    forceFormData,
                    preserveScroll,
                    onSuccess: (response) => {
                        clearFiles();
                        onSuccess?.(response);
                    },
                    onError: (errors) => {
                        const errorMessages = Object.values(errors).flat() as string[];
                        setErrors(errorMessages);
                        onError?.(errors);
                    },
                    onFinish: () => {
                        setIsUploading(false);
                    },
                });
            } catch (error) {
                setIsUploading(false);
                const errorMessage = error instanceof Error ? error.message : 'Upload failed';
                setErrors([errorMessage]);
                onError?.(error);
            }
        },
        [files, clearFiles],
    );

    // Upload single file (useful for immediate uploads)
    const uploadSingleFile = useCallback(
        async (file: FileWithPath, config: UploadConfig) => {
            const originalFiles = files;
            setFiles([file]);

            try {
                await uploadFiles(config);
            } finally {
                setFiles(originalFiles);
            }
        },
        [files, uploadFiles],
    );

    // Get file preview URL
    const getFilePreview = useCallback((file: File) => {
        return URL.createObjectURL(file);
    }, []);

    // Clean up object URLs
    const revokeFilePreview = useCallback((url: string) => {
        URL.revokeObjectURL(url);
    }, []);

    // Check if files are ready for upload
    const canUpload = files.length > 0 && !isUploading;

    // Get total file size
    const totalSize = files.reduce((total, file) => total + file.size, 0);

    // Get file statistics
    const stats = {
        totalFiles: files.length,
        totalSize,
        totalSizeFormatted: `${(totalSize / 1024 / 1024).toFixed(2)}MB`,
        fileTypes: [...new Set(files.map((f) => f.type))],
        canUpload,
        hasErrors: errors.length > 0,
    };

    return {
        // State
        files,
        isUploading,
        uploadProgress,
        errors,
        stats,

        // Actions
        addFiles,
        removeFile,
        removeFileByPath,
        clearFiles,
        reorderFiles,
        uploadFiles,
        uploadSingleFile,

        // Utilities
        getFilePreview,
        revokeFilePreview,

        // Computed
        canUpload,
    };
}
