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

  async list(): Promise<any> {
    return this.client.makeRequest('GET', '/projects');
  }

  async create(data: any): Promise<any> {
    return this.client.makeRequest('POST', '/projects', data);
  }

}

export class Videos {
  constructor(private client: ApiClient) {}

  async get(videoId: string): Promise<any> {
    return this.client.makeRequest('GET', `/video-file/${videoId}`);
  }

  async list(): Promise<any> {
    return this.client.makeRequest('GET', '/video-file');
  }

  async create(name: string, filename: string, upload_method: string): Promise<any> {
    return this.client.makeRequest('POST', '/video-file', { name, filename, upload_method });
  }

  async get_analysis(videoId: string): Promise<any> {
    return this.client.makeRequest('GET', `/video-file/${videoId}/analysis`);
  }

  async delete(videoId: string): Promise<any> {
    return this.client.makeRequest('DELETE', `/video-file/${videoId}`);
  }
  async upload_direct(videoId: string, file: any): Promise<any> {
    return this.client.makeRequest('POST', `/video-file/${videoId}/upload-video`, file);
  }

  async create_analysis(videoId: string): Promise<any> {
    return this.client.makeRequest('POST', `/video-file/${videoId}/analysis`);
  }
}

export class Scripts {
  constructor(private client: ApiClient) {}

  async list(projectId: string): Promise<any> {
    return this.client.makeRequest('GET', `/projects/${projectId}/scripts`);
  }

  async get(projectId: string, scriptId: string): Promise<any> {
    return this.client.makeRequest('GET', `/scripts/${projectId}/${scriptId}`);
  }

  async create(projectId: string, name: string, data: string, inputs: Array<string>): Promise<any> {
    return this.client.makeRequest('POST', `/scripts/${projectId}/scripts`, { name, data, inputs });
  }
}