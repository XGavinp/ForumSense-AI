/**
 * Server Component
 * Used to verify Foru.ms API integration
 */

import { getThreads } from "@/src/lib/forumsApi";

export default async function HomePage() {
  let threads = [];

  try {
    threads = await getThreads();
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        ForumSense AI – Threads
      </h1>

      {threads.length === 0 && (
        <p className="text-red-500">
          No threads found or API error.
        </p>
      )}

      <ul className="space-y-4">
        {threads.map((thread) => (
          <li
            key={thread.id}
            className="border rounded-lg p-4"
          >
            <h2 className="text-xl font-semibold">
              {thread.title}
            </h2>
            <p className="text-sm text-gray-500">
              Created by {thread.author.username}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
