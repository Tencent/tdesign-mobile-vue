export enum ProgressType {
  Info = 'info',
  Error = 'error',
}

export interface ProgressProps {
  percentage?: number;
  showText?: boolean;
  color?: string;
  bgColor?: string;
  textColor?: string;
  type?: ProgressType;
}
