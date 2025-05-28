import { MenuItem, MensaApiResponse } from "../types";

const API_BASE_URL = "http://localhost:5000/api";

export class ApiService {
  private static async request<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  static async getMensaData(): Promise<MenuItem[]> {
    try {
      const data: MensaApiResponse = await this.request("/mensa");

      if (data.error) {
        throw new Error(data.error);
      }

      return data.items || [];
    } catch (error) {
      throw new Error("Fehler beim Laden der Mensa-Daten");
    }
  }

  static async getHealthStatus(): Promise<{ status: string; service: string }> {
    return this.request("/health");
  }
}
