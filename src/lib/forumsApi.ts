/**
 * Secure Foru.ms API client
 * IMPORTANT:
 * - This file must only be used on the server
 * - API key is NEVER exposed to the browser
 */

import { ForumThread, ForumPost } from "@/src/types/forums";

const BASE_URL = process.env.FORUMS_API_BASE_URL;
const API_KEY = process.env.FORUMS_API_KEY;

/**
 * Generic fetch wrapper with error handling
 */
async function forumsFetch<T>(endpoint: string): Promise<T> {
  if (!BASE_URL || !API_KEY) {
    throw new Error("Foru.ms API environment variables are missing");
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    cache: "no-store", // Always fetch fresh data
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Foru.ms API Error (${response.status}): ${errorText}`
    );
  }

  return response.json();
}

/**
 * Fetch all threads
 */
export async function getThreads(): Promise<ForumThread[]> {
  return forumsFetch<ForumThread[]>("/threads");
}

/**
 * Fetch posts for a specific thread
 */
export async function getPostsByThread(
  threadId: string
): Promise<ForumPost[]> {
  return forumsFetch<ForumPost[]>(`/threads/${threadId}/posts`);
}

