/**
 * Centralized type definitions for Foru.ms API responses
 * Keeps API contracts clear and avoids "any" usage
 */

export interface ForumUser {
  id: string;
  username: string;
}

export interface ForumPost {
  id: string;
  content: string;
  createdAt: string;
  author: ForumUser;
}

export interface ForumThread {
  id: string;
  title: string;
  createdAt: string;
  author: ForumUser;
}
