import axios, { AxiosInstance } from 'axios';

export class ApiClient {
  private readonly baseURL = 'https://api.video-jungle.com';
  private readonly axiosInstance: AxiosInstance;
  public projects: Projects;

  constructor(private token: string) {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    this.projects = new Projects(this);
  }

  async makeRequest<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.request<T>({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  }
}

export class Projects {
  constructor(private client: ApiClient) {}

  async get(projectId: string): Promise<any> {
    return this.client.makeRequest('GET', `/projects/${projectId}`);
  }
}