const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const getCloudinaryVideoUrl = (publicId: string, isMobile = false): string => {
  // Common optimizations for initial load
  const commonParams = [
    'f_auto',              // Automatic format selection
    'c_limit',             // Maintain aspect ratio
    'q_auto:low',          // Start with low quality
    'vc_auto',             // Automatic video codec selection
    'so_0',                // Start optimization
  ].join(',');

  // Always use portrait dimensions, but adjust size based on device
  const sizeParams = isMobile 
    ? 'w_480,h_854'       // Mobile size (smaller)
    : 'w_720,h_1280';     // Desktop size (larger but still portrait)

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${commonParams},${sizeParams}/${publicId}`;
};

export const getCloudinaryVideoThumbnail = (publicId: string, isMobile = false): string => {
  // Optimize thumbnail loading
  const commonParams = [
    'f_auto',              // Automatic format selection
    'c_limit',             // Maintain aspect ratio
    'q_auto:eco',          // Eco quality for thumbnails
    'e_blur:1000',         // Add slight blur for perceived faster loading
  ].join(',');

  // Always use portrait dimensions for thumbnails too
  const sizeParams = isMobile 
    ? 'w_480,h_854'       // Mobile size (smaller)
    : 'w_720,h_1280';     // Desktop size (larger but still portrait)

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${commonParams},${sizeParams},so_0/${publicId}.jpg`;
};

// Helper to extract publicId from full URL if needed
export const getCloudinaryPublicId = (url: string | undefined): string => {
  if (!url) return '';
  
  // If it's already a public ID (no URL), return as is
  if (!url.includes('cloudinary.com')) return url;
  
  // Extract the public ID from a Cloudinary URL
  const matches = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
  return matches ? matches[1] : '';
}; 