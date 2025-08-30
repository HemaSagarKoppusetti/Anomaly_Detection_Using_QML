import React from 'react';

const TestComponent = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #1e293b, #7c3aed, #1e293b)',
      color: 'white',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            background: 'linear-gradient(to right, #a855f7, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🔬 Quantum Machine Learning - TEST
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#d1d5db' }}>Basic Test Working! ✅</p>
        </div>
        
        <div style={{
          backgroundColor: 'rgba(30, 41, 59, 0.7)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          backdropFilter: 'blur(4px)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            ✅ SUCCESS: React setup is working!
          </h3>
          <p style={{ color: '#d1d5db' }}>
            Now we can debug the main Quantum ML component step by step.
          </p>
          <p style={{ marginTop: '1rem', color: '#a855f7' }}>
            Server running on port 3001 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
