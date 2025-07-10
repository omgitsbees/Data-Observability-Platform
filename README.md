# Data Observability Platform

A comprehensive real-time monitoring and alerting dashboard for data pipeline health, providing visibility into data freshness, volume, schema changes, and quality metrics.

![Data Observability Platform](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Features

### Core Monitoring
- **Real-time Data Freshness Tracking** - Monitor how up-to-date your data pipelines are
- **Volume Monitoring** - Track data throughput and identify anomalies
- **Quality Scoring** - Multi-dimensional data quality assessment
- **Pipeline Latency Metrics** - Performance monitoring across all data flows

### Advanced Observability
- **Pipeline Health Dashboard** - Visual status indicators for all data pipelines
- **Schema Change Detection** - Track field additions, modifications, and removals
- **Intelligent Alerting** - Severity-based notifications for pipeline failures
- **Historical Trend Analysis** - 24-hour rolling metrics and patterns

### User Experience
- **Auto-refresh Capability** - Real-time updates every 30 seconds
- **Interactive Alerts Panel** - Expandable notifications with severity levels
- **Responsive Design** - Works seamlessly across desktop and mobile
- **Intuitive Visualizations** - Charts and graphs for quick insights

## Dashboard Overview

### Key Metrics Cards
- **Data Freshness** - Percentage of data that meets freshness SLAs
- **Data Volume** - Current throughput vs. historical averages
- **Data Quality** - Composite score across multiple dimensions
- **Average Latency** - Pipeline processing time metrics

### Visualization Components
- **Trend Charts** - Line graphs showing freshness and volume over time
- **Quality Breakdown** - Pie chart of quality dimensions (completeness, accuracy, consistency, timeliness)
- **Pipeline Status** - Real-time health indicators for each data pipeline
- **Schema Changes** - Bar chart tracking structural changes across pipelines

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- React 18.0+

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/data-observability-platform.git

# Navigate to project directory
cd data-observability-platform

# Install dependencies
npm install

# Start the development server
npm start
```

### Dependencies
```json
{
  "react": "^18.0.0",
  "recharts": "^2.8.0",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.3.0"
}
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_ENDPOINT=your-api-endpoint
REACT_APP_REFRESH_INTERVAL=30000
REACT_APP_ALERT_THRESHOLD=95
```

### Data Integration
The platform currently uses mock data for demonstration. To integrate with your actual data sources:

1. **Replace Mock Data Generator**
   ```javascript
   // Replace generateMockData() function with your data source
   const fetchRealTimeMetrics = async () => {
     const response = await fetch('/api/metrics');
     return response.json();
   };
   ```

2. **Configure Pipeline Sources**
   ```javascript
   // Update pipelines array with your actual pipeline configurations
   const pipelines = [
     { id: 'your_pipeline_id', name: 'Your Pipeline Name', status: 'healthy' }
   ];
   ```

3. **Set Up Alert Rules**
   ```javascript
   // Customize alert thresholds in your configuration
   const alertConfig = {
     freshness: { warning: 85, error: 70 },
     volume: { warning: 0.8, error: 0.5 },
     quality: { warning: 90, error: 80 }
   };
   ```

## Usage

### Running the Application
```bash
# Development mode
npm start

# Production build
npm run build

# Run tests
npm test
```

### Customizing Dashboards
The platform is designed to be highly customizable:

1. **Modify Metrics**: Update the `metricsData` structure to include your specific KPIs
2. **Add Visualizations**: Extend the Recharts components with additional chart types
3. **Custom Alerts**: Implement your alerting logic in the alert generation functions
4. **Styling**: Customize the Tailwind CSS classes to match your brand

### API Integration
To connect with your existing data infrastructure:

```javascript
// Example API service
class DataObservabilityService {
  async getMetrics() {
    return fetch('/api/v1/metrics').then(res => res.json());
  }
  
  async getPipelineStatus() {
    return fetch('/api/v1/pipelines/status').then(res => res.json());
  }
  
  async getAlerts() {
    return fetch('/api/v1/alerts').then(res => res.json());
  }
}
```

## Architecture

### Component Structure
```
src/
├── components/
│   ├── DataObservabilityPlatform.jsx
│   ├── MetricsCard.jsx
│   ├── AlertPanel.jsx
│   └── PipelineStatus.jsx
├── hooks/
│   ├── useMetrics.js
│   └── useAlerts.js
├── services/
│   ├── api.js
│   └── mockData.js
└── utils/
    ├── constants.js
    └── helpers.js
```

### Key Technologies
- **React 18** - Modern React with hooks and concurrent features
- **Recharts** - Composable charting library built on D3
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Clean, customizable icon library

## Monitoring Metrics

### Data Freshness
Measures how recently data was last updated:
- **Excellent**: >95% - Data is current and meets SLA
- **Good**: 85-95% - Minor delays, within acceptable range
- **Poor**: <85% - Data staleness issues requiring attention

### Data Volume
Tracks throughput and identifies anomalies:
- Compares current volume to historical averages
- Detects unusual spikes or drops
- Helps identify upstream issues

### Data Quality
Multi-dimensional scoring system:
- **Completeness**: Percentage of required fields populated
- **Accuracy**: Correctness of data values
- **Consistency**: Data conformity across sources
- **Timeliness**: Data arrival within expected timeframes

### Pipeline Latency
End-to-end processing time monitoring:
- Tracks performance degradation
- Identifies bottlenecks
- Supports SLA compliance

## Alerting System

### Alert Severity Levels
- **High**: Critical pipeline failures requiring immediate attention
- **Medium**: Performance degradation or data quality issues
- **Low**: Informational alerts and minor schema changes

### Alert Types
- **Error**: Pipeline failures, data corruption
- **Warning**: Performance issues, volume anomalies
- **Info**: Schema changes, scheduled maintenance

## Contributing

### Development Setup
```bash
# Fork the repository
git clone https://github.com/yourusername/data-observability-platform.git

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git commit -m "Add your feature description"

# Push to your fork and submit a pull request
git push origin feature/your-feature-name
```

### Code Style
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Include tests for new features

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Test Structure
```
tests/
├── components/
│   ├── DataObservabilityPlatform.test.jsx
│   └── MetricsCard.test.jsx
├── hooks/
│   └── useMetrics.test.js
└── utils/
    └── helpers.test.js
```

## Deployment

### Production Build
```bash
# Create optimized production build
npm run build

# Serve static files
npm install -g serve
serve -s build
```

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment-Specific Configuration
```bash
# Production
REACT_APP_API_ENDPOINT=https://api.yourcompany.com
REACT_APP_REFRESH_INTERVAL=60000

# Staging
REACT_APP_API_ENDPOINT=https://staging-api.yourcompany.com
REACT_APP_REFRESH_INTERVAL=30000
```

## Performance Optimization

### Best Practices
- Components use React.memo for preventing unnecessary re-renders
- Efficient data fetching with proper dependency arrays
- Lazy loading for large datasets
- Optimized chart rendering with Recharts

### Monitoring Performance
- Use React DevTools Profiler
- Monitor bundle size with webpack-bundle-analyzer
- Track Core Web Vitals in production

## Security Considerations

### Data Protection
- All API calls should be authenticated
- Sensitive data should be encrypted in transit
- Implement proper CORS policies
- Use environment variables for sensitive configuration

### Access Control
- Implement role-based access control
- Audit logging for sensitive operations
- Rate limiting for API endpoints

## Troubleshooting

### Common Issues
1. **Charts not rendering**: Ensure Recharts is properly installed
2. **Data not updating**: Check API endpoints and network connectivity
3. **Styling issues**: Verify Tailwind CSS is configured correctly
4. **Performance problems**: Review component re-rendering and data fetching

### Debug Mode
```javascript
// Enable debug logging
localStorage.setItem('debug', 'data-observability:*');
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

### Upcoming Features
- Real-time alerting integrations (Slack, PagerDuty, email)
- Custom dashboard builder
- Advanced anomaly detection with machine learning
- Multi-tenant support
- Integration with popular data tools (Airflow, dbt, Spark)
- Mobile app for on-the-go monitoring

### Version History
- **v1.0.0** - Initial release with core monitoring features
- **v1.1.0** - Added schema change detection
- **v1.2.0** - Enhanced alerting system
- **v2.0.0** - Real-time updates and improved UI
