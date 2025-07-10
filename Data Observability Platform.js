import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { AlertTriangle, CheckCircle, XCircle, Clock, Database, TrendingUp, TrendingDown, Bell, Settings, RefreshCw, Eye, Activity } from 'lucide-react';

const DataObservabilityPlatform = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPipeline, setSelectedPipeline] = useState('all');
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock data generation
  const generateMockData = useCallback(() => {
    const now = new Date();
    const hours = Array.from({ length: 24 }, (_, i) => {
      const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      return {
        time: time.toISOString().substr(11, 5),
        freshness: Math.random() > 0.1 ? 95 + Math.random() * 5 : 60 + Math.random() * 20,
        volume: 1000 + Math.random() * 500,
        quality: Math.random() > 0.05 ? 98 + Math.random() * 2 : 85 + Math.random() * 10,
        latency: 50 + Math.random() * 100
      };
    });
    return hours;
  }, []);

  const [metricsData, setMetricsData] = useState(generateMockData());

  const pipelines = [
    { id: 'user_events', name: 'User Events Pipeline', status: 'healthy', lastRun: '2 min ago' },
    { id: 'sales_data', name: 'Sales Data Pipeline', status: 'warning', lastRun: '15 min ago' },
    { id: 'analytics', name: 'Analytics Pipeline', status: 'healthy', lastRun: '5 min ago' },
    { id: 'warehouse_sync', name: 'Warehouse Sync', status: 'error', lastRun: '45 min ago' },
    { id: 'ml_features', name: 'ML Features Pipeline', status: 'healthy', lastRun: '1 min ago' }
  ];

  const alerts = [
    { id: 1, type: 'error', message: 'Warehouse Sync pipeline failed', time: '10 min ago', severity: 'high' },
    { id: 2, type: 'warning', message: 'Sales Data volume 20% below average', time: '15 min ago', severity: 'medium' },
    { id: 3, type: 'info', message: 'Schema change detected in User Events', time: '1 hour ago', severity: 'low' },
    { id: 4, type: 'warning', message: 'Data freshness degraded for Analytics', time: '2 hours ago', severity: 'medium' }
  ];

  const schemaChanges = [
    { pipeline: 'User Events', changes: 2, type: 'added_fields' },
    { pipeline: 'Sales Data', changes: 1, type: 'modified_fields' },
    { pipeline: 'Analytics', changes: 0, type: 'no_changes' },
    { pipeline: 'Warehouse Sync', changes: 3, type: 'removed_fields' }
  ];

  const qualityMetrics = [
    { name: 'Completeness', value: 98.5, color: '#10B981' },
    { name: 'Accuracy', value: 96.2, color: '#3B82F6' },
    { name: 'Consistency', value: 94.8, color: '#8B5CF6' },
    { name: 'Timeliness', value: 92.1, color: '#F59E0B' }
  ];

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
        setMetricsData(generateMockData());
      }, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, generateMockData]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'error': return <XCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const currentMetrics = metricsData[metricsData.length - 1];
  const avgFreshness = metricsData.reduce((sum, item) => sum + item.freshness, 0) / metricsData.length;
  const avgVolume = metricsData.reduce((sum, item) => sum + item.volume, 0) / metricsData.length;
  const avgQuality = metricsData.reduce((sum, item) => sum + item.quality, 0) / metricsData.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Database className="w-8 h-8 text-blue-600" />
                Data Observability Platform
              </h1>
              <p className="text-gray-600 mt-1">
                Real-time monitoring and alerting for data pipeline health
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Last updated: {currentTime.toLocaleTimeString()}
              </div>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  autoRefresh ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                Auto Refresh
              </button>
              <button
                onClick={() => setAlertsOpen(!alertsOpen)}
                className="relative flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Bell className="w-4 h-4" />
                Alerts ({alerts.filter(a => a.severity === 'high').length})
              </button>
            </div>
          </div>
        </div>

        {/* Alerts Panel */}
        {alertsOpen && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Active Alerts
            </h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                    alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{alert.message}</p>
                      <p className="text-sm text-gray-600 mt-1">{alert.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data Freshness</p>
                <p className="text-2xl font-bold text-gray-900">{currentMetrics?.freshness.toFixed(1)}%</p>
                <p className="text-sm text-gray-500">Avg: {avgFreshness.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data Volume</p>
                <p className="text-2xl font-bold text-gray-900">{currentMetrics?.volume.toFixed(0)}</p>
                <p className="text-sm text-gray-500">Avg: {avgVolume.toFixed(0)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data Quality</p>
                <p className="text-2xl font-bold text-gray-900">{currentMetrics?.quality.toFixed(1)}%</p>
                <p className="text-sm text-gray-500">Avg: {avgQuality.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Latency</p>
                <p className="text-2xl font-bold text-gray-900">{currentMetrics?.latency.toFixed(0)}ms</p>
                <p className="text-sm text-gray-500">24h average</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Data Freshness & Volume Trends */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Data Freshness & Volume (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="freshness"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Freshness %"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="volume"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Volume"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Data Quality Metrics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Data Quality Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={qualityMetrics}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {qualityMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Status & Schema Changes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pipeline Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Pipeline Status</h3>
            <div className="space-y-4">
              {pipelines.map((pipeline) => (
                <div
                  key={pipeline.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={getStatusColor(pipeline.status)}>
                      {getStatusIcon(pipeline.status)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{pipeline.name}</p>
                      <p className="text-sm text-gray-500">Last run: {pipeline.lastRun}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    pipeline.status === 'healthy' ? 'bg-green-100 text-green-800' :
                    pipeline.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {pipeline.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Schema Changes */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Schema Changes (Last 24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={schemaChanges}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="pipeline" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="changes" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataObservabilityPlatform;