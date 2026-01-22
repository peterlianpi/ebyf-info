import React from 'react';
import PeriodDisplay from './components/periodShow';

// Test component to verify the period display logic
const TestPeriodDisplay = () => {
  // Test case 1: Role started in 2025, no end date (should auto-calculate to Dec 2025)
  const testCase1 = {
    startedAt: '2025-01-15',
    endedAt: undefined
  };

  // Test case 2: Role started in 2025 with specific end date (should use the provided end date)
  const testCase2 = {
    startedAt: '2025-06-20',
    endedAt: '2025-12-31'
  };

  // Test case 3: Role started in 2024, no end date (should show as 2024-Present)
  const testCase3 = {
    startedAt: '2024-03-10',
    endedAt: undefined
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Period Display Test Cases</h1>

      <div style={{ marginBottom: '20px' }}>
        <h3>Test Case 1: Started 2025-01-15, No End Date</h3>
        <p>Expected: Should auto-calculate end date to December 2025</p>
        <PeriodDisplay startedAt={testCase1.startedAt} endedAt={testCase1.endedAt} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Test Case 2: Started 2025-06-20, End Date 2025-12-31</h3>
        <p>Expected: Should use the provided end date</p>
        <PeriodDisplay startedAt={testCase2.startedAt} endedAt={testCase2.endedAt} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Test Case 3: Started 2024-03-10, No End Date</h3>
        <p>Expected: Should show as 2024-Present (no auto-calculation)</p>
        <PeriodDisplay startedAt={testCase3.startedAt} endedAt={testCase3.endedAt} />
      </div>
    </div>
  );
};

export default TestPeriodDisplay;
