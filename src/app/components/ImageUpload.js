'use client';

import { useState, useRef } from 'react';
import { useUpload } from '@/hooks/useUpload';
import Image from 'next/image';

export default function ImageUpload({ 
  onImageUploaded, 
  currentImage, 
  onImageRemoved,
  multiple = false,
  maxFiles = 5 
}) {
  const [previewImages, setPreviewImages] = useState(currentImage ? [currentImage] : []);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const { uploadImage, deleteImage, uploading, progress } = useUpload();

  const handleFiles = async (files) => {
    const fileArray = Array.from(files);
    
    if (!multiple && fileArray.length > 1) {
      alert('Only one file is allowed');
      return;
    }

    if (multiple && fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    for (const file of fileArray) {
      // Preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPreview = {
          url: e.target.result,
          name: file.name,
          isLocal: true
        };
        
        if (multiple) {
          setPreviewImages(prev => [...prev, newPreview]);
        } else {
          setPreviewImages([newPreview]);
        }
      };
      reader.readAsDataURL(file);

      // Upload
      const result = await uploadImage(file);
      if (result) {
        const uploadedImage = {
          url: result.url,
          publicId: result.publicId,
          width: result.width,
          height: result.height,
          name: file.name
        };

        if (multiple) {
          setPreviewImages(prev => 
            prev.map(img => 
              img.isLocal && img.name === file.name ? uploadedImage : img
            )
          );
        } else {
          setPreviewImages([uploadedImage]);
        }

        onImageUploaded?.(uploadedImage);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = async (index, publicId) => {
    if (publicId) {
      await deleteImage(publicId);
    }
    
    const newImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newImages);
    onImageRemoved?.(index);
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-colors duration-200
          ${dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-sm text-gray-600">Uploading... {progress}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-sm text-gray-600">
              <p className="font-medium">Click to upload or drag and drop</p>
              <p>PNG, JPG, WebP up to 5MB</p>
              {multiple && <p>Maximum {maxFiles} files</p>}
            </div>
          </div>
        )}
      </div>

      {/* Preview Images */}
      {previewImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={image.url}
                  alt={`Preview ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index, image.publicId);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Loading Overlay */}
              {image.isLocal && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}