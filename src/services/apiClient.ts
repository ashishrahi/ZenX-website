import axios, { AxiosInstance, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    // Auth token interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          } as AxiosRequestHeaders;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Global response error handler
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Professional apps me logging / toast / auto logout handle hota hai
        return Promise.reject(error);
      }
    );
  }

  // Async/await based methods
  async get<T>(url: string, params?: object): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: object): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: object): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }
}

// Export a single instance
export const apiClient = new ApiClient(
  "http://localhost:5000/api/v1"
);

// export const apiClient = new ApiClient(
//  " https://zenxapi-5.onrender.com/api/v1"

// );