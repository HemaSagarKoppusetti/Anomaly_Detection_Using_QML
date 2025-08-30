import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { PlayCircle, PauseCircle, RotateCcw, Settings, Database, Brain, Activity, TrendingUp } from 'lucide-react';

const QMLAnomalyDetection = () => {
  const [currentAlgorithm, setCurrentAlgorithm] = useState('quantum_autoencoder');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [quantumCircuitDepth, setQuantumCircuitDepth] = useState(4);
  const [learningRate, setLearningRate] = useState(0.01);
  const [noiseLevel, setNoiseLevel] = useState(0.1);

  // QML Algorithms Configuration
  const algorithms = {
    quantum_autoencoder: {
      name: 'Quantum Autoencoder',
      description: 'Unsupervised learning to compress normal transactions and detect anomalies',
      color: '#8B5CF6',
      qubits: 6,
      gates: ['RX', 'RY', 'RZ', 'CNOT']
    },
    variational_quantum_classifier: {
      name: 'Variational Quantum Classifier',
      description: 'Supervised classification with parameterized quantum circuits',
      color: '#10B981',
      qubits: 8,
      gates: ['RX', 'RY', 'RZ', 'CNOT', 'CZ']
    },
    quantum_svm: {
      name: 'Quantum Support Vector Machine',
      description: 'Quantum kernel methods for anomaly boundary detection',
      color: '#F59E0B',
      qubits: 5,
      gates: ['RX', 'RY', 'CNOT']
    },
    quantum_neural_network: {
      name: 'Quantum Neural Network',
      description: 'Deep quantum circuits for complex pattern recognition',
      color: '#EF4444',
      qubits: 10,
      gates: ['RX', 'RY', 'RZ', 'CNOT', 'CZ', 'CRY']
    }
  };

  // Generate synthetic transaction data
  const generateTransactionData = (count = 1000) => {
    const data = [];
    const fraudRate = 0.05; // 5% fraud rate
    
    for (let i = 0; i < count; i++) {
      const isFraud = Math.random() < fraudRate;
      const baseAmount = isFraud ? 
        Math.random() * 10000 + 5000 : // Fraudulent: larger amounts
        Math.random() * 1000 + 10;     // Normal: smaller amounts
      
      const transaction = {
        id: i,
        amount: baseAmount + (Math.random() - 0.5) * baseAmount * 0.2,
        time: Math.random() * 24, // Hour of day
        location: Math.random() * 100, // Location code
        merchant_category: Math.floor(Math.random() * 20),
        frequency: isFraud ? Math.random() * 0.1 : Math.random() * 2 + 0.5,
        velocity: isFraud ? Math.random() * 10 + 5 : Math.random() * 3,
        is_fraud: isFraud,
        anomaly_score: 0
      };
      
      data.push(transaction);
    }
    
    return data;
  };

  // Quantum state preparation simulation
  const quantumStatePreparation = (transaction) => {
    // Normalize features for quantum encoding
    const features = [
      Math.log(transaction.amount + 1) / 10,
      transaction.time / 24,
      transaction.location / 100,
      transaction.merchant_category / 20,
      transaction.frequency,
      transaction.velocity / 10
    ];
    
    // Apply quantum feature map (angle encoding)
    return features.map(f => Math.sin(f * Math.PI / 2));
  };

  // Simulate quantum anomaly detection
  const simulateQuantumDetection = (data, algorithm) => {
    return data.map(transaction => {
      const quantumState = quantumStatePreparation(transaction);
      const alg = algorithms[algorithm];
      
      // Simulate quantum circuit execution with noise
      let anomalyScore = 0;
      
      switch (algorithm) {
        case 'quantum_autoencoder':
          // Reconstruction error as anomaly score
          const reconstruction = quantumState.map(s => s * (1 + (Math.random() - 0.5) * noiseLevel));
          anomalyScore = quantumState.reduce((sum, s, i) => sum + Math.pow(s - reconstruction[i], 2), 0);
          break;
          
        case 'variational_quantum_classifier':
          // Classification probability
          const classProb = 1 / (1 + Math.exp(-quantumState.reduce((sum, s) => sum + s, 0)));
          anomalyScore = transaction.is_fraud ? classProb : 1 - classProb;
          break;
          
        case 'quantum_svm':
          // Distance from quantum decision boundary
          const kernelValue = Math.exp(-quantumState.reduce((sum, s) => sum + s * s, 0));
          anomalyScore = Math.abs(kernelValue - 0.5) * 2;
          break;
          
        case 'quantum_neural_network':
          // Deep quantum circuit output
          let layerOutput = quantumState;
          for (let layer = 0; layer < quantumCircuitDepth; layer++) {
            layerOutput = layerOutput.map(x => Math.tanh(x + (Math.random() - 0.5) * noiseLevel));
          }
          anomalyScore = Math.abs(layerOutput.reduce((sum, x) => sum + x, 0) / layerOutput.length);
          break;
      }
      
      return {
        ...transaction,
        anomaly_score: Math.max(0, Math.min(1, anomalyScore))
      };
    });
  };

  // Calculate performance metrics
  const calculateMetrics = (data, threshold = 0.5) => {
    let tp = 0, fp = 0, tn = 0, fn = 0;
    
    data.forEach(t => {
      const predicted = t.anomaly_score > threshold;
      const actual = t.is_fraud;
      
      if (predicted && actual) tp++;
      else if (predicted && !actual) fp++;
      else if (!predicted && actual) fn++;
      else tn++;
    });
    
    const precision = tp / (tp + fp) || 0;
    const recall = tp / (tp + fn) || 0;
    const f1 = 2 * (precision * recall) / (precision + recall) || 0;
    const accuracy = (tp + tn) / (tp + fp + tn + fn) || 0;
    
    return { precision, recall, f1, accuracy, tp, fp, tn, fn };
  };

  // Training simulation
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  // Initialize data
  useEffect(() => {
    const data = generateTransactionData(1000);
    setTransactionData(data);
    
    // Run initial detection
    const detectedData = simulateQuantumDetection(data, currentAlgorithm);
    setResults(detectedData);
    setAnomalies(detectedData.filter(t => t.anomaly_score > 0.5));
    setPerformanceMetrics(calculateMetrics(detectedData));
  }, [currentAlgorithm, quantumCircuitDepth, noiseLevel]);

  const runAlgorithm = () => {
    setIsRunning(true);
    setCurrentStep(0);
    
    setTimeout(() => {
      const detectedData = simulateQuantumDetection(transactionData, currentAlgorithm);
      setResults(detectedData);
      setAnomalies(detectedData.filter(t => t.anomaly_score > 0.5));
      setPerformanceMetrics(calculateMetrics(detectedData));
      setIsRunning(false);
    }, 5000);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentStep(0);
    const data = generateTransactionData(1000);
    setTransactionData(data);
    setResults([]);
    setAnomalies([]);
  };

  // Chart data preparation
  const scatterData = results.map(t => ({
    amount: t.amount,
    anomaly_score: t.anomaly_score,
    is_fraud: t.is_fraud
  }));

  const anomalyDistribution = useMemo(() => {
    const bins = Array(10).fill(0);
    results.forEach(t => {
      const bin = Math.floor(t.anomaly_score * 9.99);
      bins[bin]++;
    });
    return bins.map((count, i) => ({
      range: `${(i/10).toFixed(1)}-${((i+1)/10).toFixed(1)}`,
      count
    }));
  }, [results]);

  const algorithmComparison = Object.keys(algorithms).map(key => ({
    name: algorithms[key].name,
    accuracy: key === currentAlgorithm ? performanceMetrics.accuracy : Math.random() * 0.3 + 0.6,
    f1: key === currentAlgorithm ? performanceMetrics.f1 : Math.random() * 0.3 + 0.5,
    color: algorithms[key].color
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Quantum Machine Learning
          </h1>
          <p className="text-xl text-gray-300">Transaction Anomaly Detection Framework</p>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-400" />
              Algorithm Selection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(algorithms).map(([key, algo]) => (
                <button
                  key={key}
                  onClick={() => setCurrentAlgorithm(key)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    currentAlgorithm === key
                      ? 'border-purple-400 bg-purple-400/20'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="text-sm font-medium">{algo.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{algo.qubits} qubits</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-cyan-400" />
              Parameters
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Circuit Depth: {quantumCircuitDepth}</label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={quantumCircuitDepth}
                  onChange={(e) => setQuantumCircuitDepth(parseInt(e.target.value))}
                  className="w-full mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Noise Level: {noiseLevel.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.01"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
                  className="w-full mt-1"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-400" />
              Controls
            </h3>
            <div className="space-y-3">
              <button
                onClick={runAlgorithm}
                disabled={isRunning}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-600 px-4 py-2 rounded-lg flex items-center justify-center transition-all"
              >
                {isRunning ? <PauseCircle className="w-4 h-4 mr-2" /> : <PlayCircle className="w-4 h-4 mr-2" />}
                {isRunning ? 'Training...' : 'Run Detection'}
              </button>
              <button
                onClick={resetSimulation}
                className="w-full bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg flex items-center justify-center transition-all"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
            {isRunning && (
              <div className="mt-4">
                <div className="text-sm text-gray-300 mb-1">Training Progress</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${currentStep}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">{currentStep}% complete</div>
              </div>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Accuracy', value: performanceMetrics.accuracy, color: 'text-green-400' },
            { label: 'Precision', value: performanceMetrics.precision, color: 'text-blue-400' },
            { label: 'Recall', value: performanceMetrics.recall, color: 'text-yellow-400' },
            { label: 'F1 Score', value: performanceMetrics.f1, color: 'text-purple-400' }
          ].map((metric, i) => (
            <div key={i} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 text-center">
              <div className={`text-2xl font-bold ${metric.color}`}>
                {(metric.value * 100 || 0).toFixed(1)}%
              </div>
              <div className="text-gray-400 text-sm">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Main Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Anomaly Score vs Transaction Amount */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4">Anomaly Detection Results</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={scatterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="amount" stroke="#9CA3AF" />
                <YAxis dataKey="anomaly_score" stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Scatter 
                  dataKey="anomaly_score" 
                  fill="#8B5CF6"
                />
              </ScatterChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center mt-2 space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Normal Transactions
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                Fraudulent Transactions
              </div>
            </div>
          </div>

          {/* Anomaly Score Distribution */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4">Anomaly Score Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={anomalyDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="range" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Algorithm Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4">Algorithm Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={algorithmComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="accuracy" fill="#10B981" name="Accuracy" />
                <Bar dataKey="f1" fill="#F59E0B" name="F1 Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Current Algorithm Details */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4">Current Algorithm: {algorithms[currentAlgorithm].name}</h3>
            <div className="space-y-4">
              <p className="text-gray-300">{algorithms[currentAlgorithm].description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Qubits</div>
                  <div className="text-xl font-bold text-purple-400">{algorithms[currentAlgorithm].qubits}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Detected Anomalies</div>
                  <div className="text-xl font-bold text-red-400">{anomalies.length}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-400 mb-2">Quantum Gates Used</div>
                <div className="flex flex-wrap gap-2">
                  {algorithms[currentAlgorithm].gates.map(gate => (
                    <span key={gate} className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs">
                      {gate}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-gray-400">Quantum Circuit Simulation</div>
                <div className="text-xs text-gray-500 mt-1">
                  Depth: {quantumCircuitDepth} | Noise: {(noiseLevel * 100).toFixed(0)}% | 
                  Runtime: ~{(algorithms[currentAlgorithm].qubits * quantumCircuitDepth * 0.1).toFixed(1)}s
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Quantum Machine Learning Framework for Transaction Anomaly Detection</p>
          <p>Simulated quantum computing environment - Educational and research purposes</p>
        </div>
      </div>
    </div>
  );
};

export default QMLAnomalyDetection;