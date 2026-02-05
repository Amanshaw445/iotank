
export interface TankData {
  id: string;
  name: string;
  level: number;
  battery: number;
  temperature: number;
  isPumpOn: boolean;
  isOnline: boolean;
  lastSync: string;
}

export interface SmartInsight {
  title: string;
  description: string;
  type: 'alert' | 'info' | 'prediction';
  priority: 'low' | 'medium' | 'high';
}

export enum AppSection {
  DASHBOARD = 'DASHBOARD'
}
