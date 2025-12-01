export type ViewState = 'dashboard' | 'compass' | 'timeline' | 'thermometer';

export interface CompassDataPoint {
  subject: string;
  current: number;
  ideal: number;
  fullMark: number;
}

export interface TimelineEvent {
  id: string;
  type: 'peak' | 'valley';
  date: string; // YYYY-MM
  title: string;
  action: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
}

export interface AiInsight {
  loading: boolean;
  content: string | null;
  error: string | null;
}
