import path from "path";
import type { CollectionConfig } from "payload";

const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    // ✅ Vercel Blob token present => local disk write disable
    disableLocalStorage: hasBlobToken,

    // ✅ Local uploads folder (Next.js: public/media => served at /media automatically)
    staticDir: path.resolve(process.cwd(), "public/media"),
  },
};
