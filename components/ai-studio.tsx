'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsDown, ArrowLeft, History, Clock, Check, X } from 'lucide-react';

// Define types
interface Feedback {
  id: number;
  text: string;
  aiAnalysis: string;
  status: string;
  timestamp: string;
  callId: string;
  agent: string;
  transcript: string;
}

interface Dimension {
  id: number;
  name: string;
  definition: string;
  feedbackCount: number;
  feedbacks: Feedback[];
}

// Define props interfaces for sub-components
interface SubComponentProps {
  dimensions: Dimension[];
  selectedDimension: Dimension | null;
  selectedFeedback: Feedback | null;
  setView: (view: 'list' | 'feedbackList' | 'detail') => void;
  setSelectedDimension: (dimension: Dimension | null) => void;
  setSelectedFeedback: (feedback: Feedback | null) => void;
  handleFeedbackAction: (dimensionId: number, feedbackId: number, action: string) => void;
}

const DimensionsList: React.FC<SubComponentProps> = ({ 
  dimensions, 
  setView, 
  setSelectedDimension 
}) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>AI Evaluation Dimensions</span>
        <Button variant="outline" onClick={() => setView('history')}>
          <History className="mr-2 h-4 w-4" />
          History
        </Button>
      </CardTitle>
      <CardDescription>Review and manage feedback for each dimension</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium">Dimension</th>
              <th className="text-left p-4 font-medium">Feedback Count</th>
              <th className="text-left p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map(dimension => (
              <tr key={dimension.id} className="border-b hover:bg-slate-50">
                <td className="p-4 font-medium">{dimension.name}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <ThumbsDown className="h-4 w-4 mr-2 text-red-500" />
                    {dimension.feedbackCount}
                  </div>
                </td>
                <td className="p-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedDimension(dimension);
                      setView('feedbackList');
                    }}
                  >
                    List
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const FeedbackList: React.FC<SubComponentProps> = ({ 
  selectedDimension, 
  setView, 
  setSelectedDimension,
  setSelectedFeedback 
}) => (
  <Card className="w-full">
    <CardHeader>
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          className="w-fit"
          onClick={() => {
            setView('list');
            setSelectedDimension(null);
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to dimensions
        </Button>
      </div>
      <CardTitle>{selectedDimension?.name} - Feedback Items</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium">Time</th>
              <th className="text-left p-4 font-medium">Call ID</th>
              <th className="text-left p-4 font-medium">Agent</th>
              <th className="text-left p-4 font-medium">Feedback</th>
              <th className="text-left p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedDimension?.feedbacks.map(feedback => (
              <tr key={feedback.id} className="border-b hover:bg-slate-50">
                <td className="p-4">
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {feedback.timestamp}
                  </div>
                </td>
                <td className="p-4 font-mono text-sm">{feedback.callId}</td>
                <td className="p-4">{feedback.agent}</td>
                <td className="p-4 max-w-xs">
                  <div className="flex items-start space-x-2">
                    <ThumbsDown className="h-4 w-4 mt-1 text-red-500 flex-shrink-0" />
                    <span>{feedback.text}</span>
                  </div>
                </td>
                <td className="p-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedFeedback(feedback);
                      setView('detail');
                    }}
                    className="w-full"
                  >
                    Review
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const DetailView: React.FC<SubComponentProps> = ({ 
  selectedDimension, 
  selectedFeedback, 
  setView, 
  setSelectedFeedback,
  handleFeedbackAction 
}) => (
  <Card className="w-full">
    <CardHeader>
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          className="w-fit"
          onClick={() => {
            setView('feedbackList');
            setSelectedFeedback(null);
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to feedback list
        </Button>
      </div>
      <div className="space-y-4">
        <CardTitle>{selectedDimension?.name}</CardTitle>
        <div className="bg-slate-50 p-4 rounded-md">
          <h3 className="font-semibold mb-2">Dimension Definition</h3>
          <div className="text-base">{selectedDimension?.definition}</div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="bg-white p-6 border rounded-lg space-y-6">
        {/* Call Information */}
        <div>
          <h3 className="text-base font-semibold mb-3">Call Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-slate-500">Call ID:</span>
              <span className="ml-2 font-mono">{selectedFeedback?.callId}</span>
            </div>
            <div>
              <span className="text-sm text-slate-500">Agent:</span>
              <span className="ml-2">{selectedFeedback?.agent}</span>
            </div>
          </div>
        </div>

        {/* Call Transcript */}
        <div>
          <h3 className="text-base font-semibold mb-3">Call Transcript</h3>
          <div className="bg-slate-50 p-4 rounded-md whitespace-pre-line font-mono text-sm">
            {selectedFeedback?.transcript}
          </div>
        </div>

        {/* Original Feedback */}
        <div>
          <h3 className="text-base font-semibold mb-3">Original Feedback</h3>
          <div className="flex items-start space-x-2">
            <ThumbsDown className="h-4 w-4 mt-1 text-red-500 flex-shrink-0" />
            <span>{selectedFeedback?.text}</span>
          </div>
        </div>

        {/* AI Analysis */}
        <div>
          <h3 className="text-base font-semibold mb-3">AI Analysis</h3>
          <p>{selectedFeedback?.aiAnalysis}</p>
        </div>

        {/* Actions */}
        <div className="pt-4 flex justify-between">
          <Button 
            variant="outline"
            onClick={() => selectedDimension && selectedFeedback && handleFeedbackAction(selectedDimension.id, selectedFeedback.id, 'accepted')}
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            <Check className="mr-2 h-4 w-4" />
            Accept
          </Button>
          <Button
            variant="outline"
            onClick={() => selectedDimension && selectedFeedback && handleFeedbackAction(selectedDimension.id, selectedFeedback.id, 'rejected')}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <X className="mr-2 h-4 w-4" />
            Reject
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const AIStudio = () => {
  const [view, setView] = useState<'list' | 'feedbackList' | 'detail'>('list');
  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  const [dimensions, setDimensions] = useState<Dimension[]>([
    {
      id: 1,
      name: 'Empathy',
      definition: `Empathy in customer service is the ability to understand, acknowledge, and effectively respond to a customer's emotional state and perspective. This fundamental skill requires agents to go beyond mere problem-solving to create genuine emotional connections with customers.

Effective empathy involves several key components that must be consistently demonstrated throughout customer interactions. First, agents must actively recognize and acknowledge customer emotions through careful attention to tone, word choice, and expression. This includes picking up on both explicit statements of emotion and subtle cues that indicate the customer's state of mind.

Second, agents must demonstrate their understanding through explicit verbal acknowledgment that validates the customer's experience. This goes beyond simple phrases like "I understand" to include specific reflection of the customer's situation and emotions.

Third, agents should appropriately mirror the emotional intensity of the situation in their responses. This means matching serious situations with a more formal, concerned tone while maintaining a lighter, friendly tone for routine interactions. However, agents must always maintain professional composure even when dealing with highly emotional situations.

The practical application of empathy should include techniques such as repeating key points back to customers, sharing relevant experiences when appropriate, and using supportive language that shows genuine concern. Agents should avoid dismissive language, minimizing customer concerns, or rushing through emotional moments to get to solutions.`,
      feedbackCount: 12,
      feedbacks: [
        {
          id: 1,
          text: "Agent didn't acknowledge customer's frustration",
          aiAnalysis: "After reviewing the call and feedback, the agent did use phrases like 'I understand' but didn't reflect back the specific frustration points. This feedback appears valid per our definition of empathy.",
          status: 'pending',
          timestamp: '2024-10-23 14:30',
          callId: 'CALL-001',
          agent: 'John Doe',
          transcript: `Customer: Hi, I've been trying to resolve an issue with my account for the past week, and I'm really frustrated. Nobody seems to be able to help me.

Agent: I see you're calling about your account. What's the issue?

Customer: I've been charged twice for my subscription, and it's caused my account to go into overdraft. I've already spoken to three different people about this.

Agent: I understand. Let me look up your account details.

Customer: This is exactly what everyone else said, and nothing got fixed. I'm getting charged overdraft fees now because of this mistake.

Agent: I'll check what happened with the duplicate charge. Can you hold for a moment?

Customer: Fine, but please actually help me this time.

Agent: Thanks for holding. I can see the duplicate charge now. I'll process a refund for you.

Customer: What about the overdraft fees? This is causing me real problems.

Agent: The refund should appear in 3-5 business days. Is there anything else I can help you with?

Customer: So I just have to deal with the overdraft fees caused by your mistake?

Agent: You can try contacting your bank about the overdraft fees. Was there anything else you needed help with today?`
        },
        {
          id: 2,
          text: "Tone was too casual for a serious complaint",
          aiAnalysis: "The customer was reporting a significant financial issue, but the agent maintained a light tone throughout. This misalignment of emotional intensity does not meet our empathy standards.",
          status: 'pending',
          timestamp: '2024-10-23 15:45',
          callId: 'CALL-002',
          agent: 'Jane Smith',
          transcript: 'Sample transcript...'
        }
      ]
    },
    {
      id: 2,
      name: 'Question Quality',
      definition: 'Agent asks relevant and probing questions to understand the issue',
      feedbackCount: 8,
      feedbacks: []
    }
  ]);

  const handleFeedbackAction = (dimensionId: number, feedbackId: number, action: string) => {
    setDimensions(dimensions.map(dim => {
      if (dim.id === dimensionId) {
        return {
          ...dim,
          feedbacks: dim.feedbacks.map(fb => 
            fb.id === feedbackId ? { ...fb, status: action } : fb
          ).filter(fb => fb.status === 'pending')
        };
      }
      return dim;
    }));
    setView('feedbackList');
    setSelectedFeedback(null);
  };

  const componentProps: SubComponentProps = {
    dimensions,
    selectedDimension,
    selectedFeedback,
    setView,
    setSelectedDimension,
    setSelectedFeedback,
    handleFeedbackAction
  };

  return (
    <div className="p-6">
      {view === 'list' && <DimensionsList {...componentProps} />}
      {view === 'feedbackList' && selectedDimension && <FeedbackList {...componentProps} />}
      {view === 'detail' && selectedDimension && selectedFeedback && <DetailView {...componentProps} />}
    </div>
  );
};

export default AIStudio;
