'use client'

import React, { useState } from 'react';
import { ThumbsDown, ArrowLeft, History, Clock, Check, X } from 'lucide-react';

// Types
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

type ViewType = 'list' | 'feedbackList' | 'detail' | 'history';

interface SubComponentProps {
  dimensions: Dimension[];
  selectedDimension: Dimension | null;
  selectedFeedback: Feedback | null;
  setView: (view: ViewType) => void;
  setSelectedDimension: (dimension: Dimension | null) => void;
  setSelectedFeedback: (feedback: Feedback | null) => void;
  handleFeedbackAction: (dimensionId: number, feedbackId: number, action: string) => void;
}

const DimensionsList: React.FC<SubComponentProps> = ({ dimensions, setView, setSelectedDimension }) => (
  <div className="bg-white rounded-lg border shadow-sm">
    <div className="p-6 space-y-1.5">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">AI Evaluation Dimensions</h3>
        <button 
          onClick={() => setView('history')}
          className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50"
        >
          <History className="mr-2 h-4 w-4" />
          History
        </button>
      </div>
      <p className="text-sm text-gray-500">Review and manage feedback for each dimension</p>
    </div>
    <div className="p-6">
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
                  <button 
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50"
                    onClick={() => {
                      setSelectedDimension(dimension);
                      setView('feedbackList');
                    }}
                  >
                    List
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const FeedbackList: React.FC<SubComponentProps> = ({ 
  selectedDimension, 
  setView, 
  setSelectedDimension,
  setSelectedFeedback 
}) => (
  <div className="bg-white rounded-lg border shadow-sm">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <button 
          className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
          onClick={() => {
            setView('list');
            setSelectedDimension(null);
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to dimensions
        </button>
      </div>
      <h3 className="text-2xl font-semibold">{selectedDimension?.name} - Feedback Items</h3>
    </div>
    <div className="p-6">
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
                  <button 
                    className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50"
                    onClick={() => {
                      setSelectedFeedback(feedback);
                      setView('detail');
                    }}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const DetailView: React.FC<SubComponentProps> = ({ 
  selectedDimension, 
  selectedFeedback, 
  setView, 
  setSelectedFeedback,
  handleFeedbackAction 
}) => (
  <div className="bg-white rounded-lg border shadow-sm">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <button 
          className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
          onClick={() => {
            setView('feedbackList');
            setSelectedFeedback(null);
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to feedback list
        </button>
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">{selectedDimension?.name}</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-semibold mb-2">Dimension Definition</h4>
          <div className="text-base">{selectedDimension?.definition}</div>
        </div>
      </div>
    </div>
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 border rounded-lg space-y-6">
        {/* Call Information */}
        <div>
          <h3 className="text-base font-semibold mb-3">Call Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Call ID:</span>
              <span className="ml-2 font-mono">{selectedFeedback?.callId}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Agent:</span>
              <span className="ml-2">{selectedFeedback?.agent}</span>
            </div>
          </div>
        </div>

        {/* Call Transcript */}
        <div>
          <h3 className="text-base font-semibold mb-3">Call Transcript</h3>
          <div className="bg-gray-50 p-4 rounded-md whitespace-pre-line font-mono text-sm">
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
          <button 
            className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => selectedDimension && selectedFeedback && handleFeedbackAction(selectedDimension.id, selectedFeedback.id, 'accepted')}
          >
            <Check className="mr-2 h-4 w-4" />
            Accept
          </button>
          <button
            className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border border-red-600 text-red-600 hover:bg-red-50"
            onClick={() => selectedDimension && selectedFeedback && handleFeedbackAction(selectedDimension.id, selectedFeedback.id, 'rejected')}
          >
            <X className="mr-2 h-4 w-4" />
            Reject
          </button>
        </div>
      </div>
    </div>
  </div>
);

const HistoryView: React.FC<SubComponentProps> = ({ setView }) => (
  <div className="bg-white rounded-lg border shadow-sm">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <button 
          className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
          onClick={() => setView('list')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to list
        </button>
      </div>
      <h3 className="text-2xl font-semibold">Feedback History</h3>
      <p className="text-sm text-gray-500">Past feedback decisions</p>
    </div>
    <div className="p-6">
      <div className="w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium">Date</th>
              <th className="text-left p-4 font-medium">Dimension</th>
              <th className="text-left p-4 font-medium">Feedback</th>
              <th className="text-left p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-slate-50">
              <td className="p-4">2024-10-22</td>
              <td className="p-4">Empathy</td>
              <td className="p-4">Agent spoke in monotone voice</td>
              <td className="p-4">
                <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  Accepted
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const AIStudio = () => {
  const [view, setView] = useState<ViewType>('list');
  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  // ... rest of the data and handlers remain the same ...

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
      {view === 'history' && <HistoryView {...componentProps} />}
    </div>
  );
};

export default AIStudio;
