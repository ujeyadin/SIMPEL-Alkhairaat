import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Chip,
  IconButton,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const FinanceManagement = () => {
  const [finances, setFinances] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, balance: 0 });
  const [formData, setFormData] = useState({
    school_id: '',
    transaction_date: new Date().toISOString().split('T')[0],
    type: 'income',
    category: '',
    description: '',
    amount: '',
    reference_number: '',
    notes: '',
  });

  useEffect(() => {
    fetchFinances();
    fetchSummary();
  }, []);

  const fetchFinances = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/finance', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFinances(response.data.data || []);
    } catch (error) {
      console.error('Error fetching finances:', error);
    }
  };

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/finance/report/summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(response.data.data || {});
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleOpenDialog = (finance = null) => {
    if (finance) {
      setEditingId(finance.id);
      setFormData(finance);
    } else {
      setEditingId(null);
      setFormData({
        school_id: '',
        transaction_date: new Date().toISOString().split('T')[0],
        type: 'income',
        category: '',
        description: '',
        amount: '',
        reference_number: '',
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`/api/finance/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/finance', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchFinances();
      fetchSummary();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving finance:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus transaksi ini?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/finance/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchFinances();
        fetchSummary();
      } catch (error) {
        console.error('Error deleting finance:', error);
      }
    }
  };

  const SummaryCard = ({ label, value, color }) => (
    <Paper sx={{ p: 2, backgroundColor: color, borderRadius: 2, textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', mt: 1 }}>
        Rp {value.toLocaleString('id-ID')}
      </Typography>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        💰 Manajemen Keuangan
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard label="Total Pemasukan" value={summary.total_income} color="#E8F5E9" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard label="Total Pengeluaran" value={summary.total_expense} color="#FFEBEE" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard label="Saldo" value={summary.balance} color="#F3E5F5" />
        </Grid>
      </Grid>

      {/* Add Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Tambah Transaksi
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976D2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tanggal</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tipe</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Kategori</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Deskripsi</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'right' }}>Jumlah</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finances.map((finance) => (
              <TableRow key={finance.id} hover>
                <TableCell>{new Date(finance.transaction_date).toLocaleDateString('id-ID')}</TableCell>
                <TableCell>
                  <Chip
                    label={finance.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                    color={finance.type === 'income' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{finance.category}</TableCell>
                <TableCell>{finance.description}</TableCell>
                <TableCell sx={{ textAlign: 'right', fontWeight: 'bold', color: finance.type === 'income' ? '#4CAF50' : '#F44336' }}>
                  {finance.type === 'income' ? '+' : '-'} Rp {parseFloat(finance.amount).toLocaleString('id-ID')}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(finance)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(finance.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Tanggal Transaksi"
            type="date"
            value={formData.transaction_date}
            onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth>
            <InputLabel>Tipe Transaksi</InputLabel>
            <Select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              label="Tipe Transaksi"
            >
              <MenuItem value="income">Pemasukan</MenuItem>
              <MenuItem value="expense">Pengeluaran</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Kategori"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            fullWidth
          />
          <TextField
            label="Deskripsi"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Jumlah"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            fullWidth
          />
          <TextField
            label="Nomor Referensi"
            value={formData.reference_number}
            onChange={(e) => setFormData({ ...formData, reference_number: e.target.value })}
            fullWidth
          />
          <TextField
            label="Catatan"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            fullWidth
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleSave} variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FinanceManagement;
