import { IVideo } from "@/models/Video";

export type VideoFormData = Omit<IVideo, "_id">;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

class Apiclient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };
    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  }

  async getVideos() {
    return this.fetch<IVideo[]>("/videos");
  }

  async getAVideo(id: string) {
    return this.fetch<IVideo>(`/videos/${id}`);
  }

  async createVideo(video: VideoFormData) {
    return this.fetch<IVideo>("/videos", { method: "POST", body: video });
  }
}

export const apiClient = new Apiclient();

export default apiClient;