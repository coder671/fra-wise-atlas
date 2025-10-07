import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { TrendingUpIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon } from "lucide-react";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AIInsights = () => {
  const claimsStatusData = {
    labels: ["Approved", "Pending", "Rejected", "Under Review"],
    datasets: [
      {
        data: [45, 25, 15, 15],
        backgroundColor: [
          "rgba(0, 200, 83, 0.8)",
          "rgba(255, 193, 7, 0.8)",
          "rgba(244, 67, 54, 0.8)",
          "rgba(0, 188, 212, 0.8)",
        ],
        borderColor: [
          "rgba(0, 200, 83, 1)",
          "rgba(255, 193, 7, 1)",
          "rgba(244, 67, 54, 1)",
          "rgba(0, 188, 212, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const monthlyTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Claims Processed",
        data: [1200, 1900, 3000, 5000, 4500, 6000, 7200, 8100, 7800, 9200, 10500, 11800],
        backgroundColor: "rgba(0, 200, 83, 0.7)",
        borderColor: "rgba(0, 200, 83, 1)",
        borderWidth: 2,
      },
      {
        label: "AI Predictions",
        data: [1500, 2200, 3200, 5200, 4800, 6300, 7500, 8400, 8100, 9500, 10800, 12100],
        backgroundColor: "rgba(0, 188, 212, 0.7)",
        borderColor: "rgba(0, 188, 212, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: "Poppins",
          },
        },
      },
    },
  };

  const insights = [
    {
      icon: TrendingUpIcon,
      title: "Processing Efficiency",
      value: "+32%",
      description: "AI automation increased claim processing speed",
      color: "text-primary",
    },
    {
      icon: CheckCircleIcon,
      title: "Approval Rate",
      value: "87.5%",
      description: "Higher approval rate with AI verification",
      color: "text-green-500",
    },
    {
      icon: AlertCircleIcon,
      title: "Anomalies Detected",
      value: "124",
      description: "Potential fraudulent claims identified",
      color: "text-yellow-500",
    },
    {
      icon: ClockIcon,
      title: "Avg. Processing Time",
      value: "45 days",
      description: "Reduced from 180 days using AI",
      color: "text-secondary",
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          AI-Powered Insights
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Advanced analytics and machine learning predictions for FRA implementation monitoring
        </p>
      </motion.div>

      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Card className="glass-card p-6 hover:glow-effect smooth-transition">
              <insight.icon className={`w-10 h-10 mb-4 ${insight.color}`} />
              <div className="text-3xl font-bold mb-2 text-card-foreground">{insight.value}</div>
              <h3 className="text-sm font-semibold mb-1 text-card-foreground">{insight.title}</h3>
              <p className="text-xs text-muted-foreground">{insight.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claims Status Doughnut */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 text-card-foreground">Claims Status Distribution</h3>
            <div className="h-80">
              <Doughnut data={claimsStatusData} options={chartOptions} />
            </div>
          </Card>
        </motion.div>

        {/* Monthly Trends Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 text-card-foreground">Monthly Processing Trends</h3>
            <div className="h-80">
              <Bar data={monthlyTrendsData} options={chartOptions} />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Satellite Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-card p-6">
          <h3 className="text-2xl font-bold mb-4 text-card-foreground">🛰️ Satellite-Based Forest Cover Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-transparent rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">2.4M Ha</div>
              <p className="text-sm text-muted-foreground">Forest Cover Monitored</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-transparent rounded-lg">
              <div className="text-3xl font-bold text-secondary mb-2">+12%</div>
              <p className="text-sm text-muted-foreground">Cover Increase (2020-2024)</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-transparent rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">98.5%</div>
              <p className="text-sm text-muted-foreground">AI Detection Accuracy</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AIInsights;
