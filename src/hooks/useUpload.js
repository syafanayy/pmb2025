'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (file) => {
    if (!file) {
      toast.error('Please select a file');
      return null;
    }

    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate progress (karena fetch tidak support real progress)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      toast.success('Image uploaded successfully!');
      return result;

    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Upload failed');
      return null;
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const deleteImage = async (publicId) => {
    try {
      const response = await fetch(`/api/upload?publicId=${encodeURIComponent(publicId)}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Delete failed');
      }

      toast.success('Image deleted successfully!');
      return result;

    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Delete failed');
      return null;
    }
  };

  return {
    uploadImage,
    deleteImage,
    uploading,
    progress,
  };
};