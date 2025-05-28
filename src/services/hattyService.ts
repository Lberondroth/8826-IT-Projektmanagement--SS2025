import type {
  HattyChatRequest,
  HattyChatResponse,
  HattyStatusResponse,
} from "../types";

const API_BASE_URL = "http://localhost:5000/api";

export class HattyService {
  private static instance: HattyService;

  public static getInstance(): HattyService {
    if (!HattyService.instance) {
      HattyService.instance = new HattyService();
    }
    return HattyService.instance;
  }

  /**
   * Send a message to Hatty chatbot
   */
  async sendMessage(message: string): Promise<HattyChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/hatty/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message } as HattyChatRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: HattyChatResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending message to Hatty:", error);
      throw new Error("Failed to send message to Hatty chatbot");
    }
  }

  /**
   * Check if Hatty chatbot is available
   */
  async getStatus(): Promise<HattyStatusResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/hatty/status`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: HattyStatusResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error checking Hatty status:", error);
      return {
        available: false,
        status: "unavailable",
      };
    }
  }

  /**
   * Check if the backend is running
   */
  async checkBackendHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error("Backend health check failed:", error);
      return false;
    }
  }
}

export const hattyService = HattyService.getInstance();
