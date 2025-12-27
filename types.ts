
export enum LayerType {
  BUSINESS = 'Business Layer',
  LOGIC = 'Test Logic Layer',
  PAGE = 'Page Object Layer',
  UTILITY = 'Core Utilities Layer',
  EXECUTION = 'Execution & Reporting Layer'
}

export interface Phase {
  id: number;
  title: string;
  description: string;
  details: string[];
  tools: string[];
}

export interface Layer {
  id: LayerType;
  description: string;
  purpose: string;
  designRule: string;
  content: string[];
  example: string;
}

export interface FrameworkState {
  currentPhase: number;
  selectedLayer: LayerType | null;
  projectName: string;
}
