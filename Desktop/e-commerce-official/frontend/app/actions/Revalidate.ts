"use server";
// app/lib/revalidate.ts
/**
 * Revalidate specific cache tags.
 * @param tags - Array of tags to revalidate.
 */

import { revalidateTag, revalidatePath } from "next/cache";
export const revalidateTags = async (tags: string[]) => {
  tags.forEach((tag) => revalidateTag(tag));
  console.log(`Revalidated tags: ${tags.join(", ")}`);
};

/**
 * Revalidate specific paths.
 * @param paths - Array of paths to revalidate.
 */
export const revalidatePaths = async (paths: string[]) => {
  paths.forEach((path) => revalidatePath(path));
  console.log(`Revalidated paths: ${paths.join(", ")}`);
};
