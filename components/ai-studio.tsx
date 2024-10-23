'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsDown, ArrowLeft, History, Clock, Check, X } from 'lucide-react';
import type { Dimension, Feedback } from '@/types';

const AIStudio = () => {
  const [view, setView] = useState<'list' | 'feedbackList' | 'detail'>('list');
  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

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
