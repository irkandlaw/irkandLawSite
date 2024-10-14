export interface GitHubFileResponse {
    content: string;
    sha: string;
    [key: string]: any; // для дополнительных полей
  }
  
  export interface UpdateFilePayload {
    message: string;
    content: string;
    sha: string;
  }
  