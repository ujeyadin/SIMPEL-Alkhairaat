import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Paper,
  Button,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import MailIcon from '@mui/icons-material/Mail';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [financeData, setFinanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/reports/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboardData(response.data.data);

      const financeRes = await axios.get('/api/reports/finance/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFinanceData(financeRes.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card sx={{ height: '100%', boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color }}>
              {value}
            </Typography>
          </Box>
          <Icon sx={{ fontSize: 50, color, opacity: 0.3 }} />
        </Box>
      </CardContent>
    </Card>
  );

  const chartData = [
    { name: 'Sekolah', value: dashboardData?.total_schools || 0 },
    { name: 'Pengguna', value: dashboardData?.total_users || 0 },
    { name: 'Aset', value: dashboardData?.total_assets || 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          📊 Dashboard Utama
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Ringkasan data dan statistik sistem SIMPEL-Alkhairaat
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={SchoolIcon}
            title="Total Sekolah"
            value={dashboardData?.total_schools || 0}
            color="#1976D2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={PeopleIcon}
            title="Total Pengguna"
            value={dashboardData?.total_users || 0}
            color="#388E3C"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={AttachMoneyIcon}
            title="Total Pemasukan"
            value={`Rp${(financeData?.total_income || 0).toLocaleString('id-ID')}`}
            color="#D32F2F"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={InventoryIcon}
            title="Total Aset"
            value={dashboardData?.total_assets || 0}
            color="#F57C00"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={PeopleIcon}
            title="Total Pengunjung"
            value={dashboardData?.total_visitors || 0}
            color="#7B1FA2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={MailIcon}
            title="Total Surat"
            value={dashboardData?.total_letters || 0}
            color="#00838F"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              📈 Distribusi Data
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              💰 Ringkasan Keuangan
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ p: 2, backgroundColor: '#E3F2FD', borderRadius: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  Total Pemasukan
                </Typography>
                <Typography variant="h6" sx={{ color: '#1976D2', fontWeight: 'bold' }}>
                  Rp {(financeData?.total_income || 0).toLocaleString('id-ID')}
                </Typography>
              </Box>
              <Box sx={{ p: 2, backgroundColor: '#FFEBEE', borderRadius: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  Total Pengeluaran
                </Typography>
                <Typography variant="h6" sx={{ color: '#D32F2F', fontWeight: 'bold' }}>
                  Rp {(financeData?.total_expense || 0).toLocaleString('id-ID')}
                </Typography>
              </Box>
              <Box sx={{ p: 2, backgroundColor: '#F3E5F5', borderRadius: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  Saldo
                </Typography>
                <Typography variant="h6" sx={{ color: '#7B1FA2', fontWeight: 'bold' }}>
                  Rp {(financeData?.balance || 0).toLocaleString('id-ID')}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
