export interface Feedback {
  id: number;
  text: string;
  aiAnalysis: string;
  status: string;
  timestamp: string;
  callId: string;
  agent: string;
  transcript: string;
}

export interface Dimension {
  id: number;
  name: string;
  definition: string;
  feedbackCount: number;
  feedbacks: Feedback[];
}
