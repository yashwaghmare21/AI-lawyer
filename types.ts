
export type Role = 'user' | 'model';

export interface Message {
  role: Role;
  parts: string;
  timestamp: Date;
  isError?: boolean;
  fileInfo?: {
    name: string;
    type: string;
  }
}
