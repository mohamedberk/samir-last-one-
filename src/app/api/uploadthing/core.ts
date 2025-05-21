import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  mediaUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
    video: { maxFileSize: "512MB", maxFileCount: 5 }
  })
    .middleware(async () => {
      // This code runs on your server before upload
      return { timestamp: Date.now() }; // Return a valid middleware object
    })
    .onUploadComplete(async ({ file }) => {
      // This code runs on your server after upload
      console.log("File URL:", file.url);
      
      return { url: file.url };
    }),

  thumbnailUploader: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 }
  })
    .middleware(async () => {
      return { timestamp: Date.now() };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; 