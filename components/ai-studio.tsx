'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsDown, ArrowLeft, History, Clock, Check, X } from 'lucide-react';

// Define types at the top of the file
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

  // ... rest of the component stays exactly the same ...

  return (
    <div className="p-6">
      {view === 'list' && <DimensionsList />}
      {view === 'feedbackList' && selectedDimension && <FeedbackList />}
      {view === 'detail' && selectedDimension && selectedFeedback && <DetailView />}
    </div>
  );
};

export default AIStudio;
