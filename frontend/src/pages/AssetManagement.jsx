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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const AssetManagement = () => {
  const [assets, setAssets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    school_id: '',
    name: '',
    category: '',
    description: '',
    quantity: '1',
    unit: '',
    purchase_date: new Date().toISOString().split('T')[0],
    purchase_price: '',
    current_value: '',
    location: '',
    condition: 'good',
    status: 'active',
    asset_code: '',
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/assets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssets(response.data.data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const handleOpenDialog = (asset = null) => {
    if (asset) {
      setEditingId(asset.id);
      setFormData(asset);
    } else {
      setEditingId(null);
      setFormData({
        school_id: '',
        name: '',
        category: '',
        description: '',
        quantity: '1',
        unit: '',
        purchase_date: new Date().toISOString().split('T')[0],
        purchase_price: '',
        current_value: '',
        location: '',
        condition: 'good',
        status: 'active',
        asset_code: '',
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
        await axios.put(`/api/assets/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/assets', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchAssets();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving asset:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus aset ini?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/assets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchAssets();
      } catch (error) {
        console.error('Error deleting asset:', error);
      }
    }
  };

  const getConditionColor = (condition) => {
    const colors = {
      excellent: '#4CAF50',
      good: '#2196F3',
      fair: '#FF9800',
      poor: '#F44336',
    };
    return colors[condition] || '#9E9E9E';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          📦 Manajemen Aset
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Tambah Aset
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976D2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nama Aset</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Kategori</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Qty</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Lokasi</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Kondisi</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id} hover>
                <TableCell sx={{ fontWeight: '500' }}>{asset.name}</TableCell>
                <TableCell>{asset.category}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{asset.quantity}</TableCell>
                <TableCell>{asset.location}</TableCell>
                <TableCell>
                  <Chip
                    label={asset.condition}
                    size="small"
                    sx={{ backgroundColor: getConditionColor(asset.condition), color: 'white' }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={asset.status}
                    size="small"
                    color={asset.status === 'active' ? 'success' : 'default'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(asset)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(asset.id)}
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
        <DialogTitle>{editingId ? 'Edit Aset' : 'Tambah Aset Baru'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Nama Aset"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
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
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            fullWidth
          />
          <TextField
            label="Satuan"
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            fullWidth
          />
          <TextField
            label="Tanggal Pembelian"
            type="date"
            value={formData.purchase_date}
            onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Harga Pembelian"
            type="number"
            value={formData.purchase_price}
            onChange={(e) => setFormData({ ...formData, purchase_price: e.target.value })}
            fullWidth
          />
          <TextField
            label="Nilai Saat Ini"
            type="number"
            value={formData.current_value}
            onChange={(e) => setFormData({ ...formData, current_value: e.target.value })}
            fullWidth
          />
          <TextField
            label="Lokasi"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Kondisi</InputLabel>
            <Select
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              label="Kondisi"
            >
              <MenuItem value="excellent">Sangat Baik</MenuItem>
              <MenuItem value="good">Baik</MenuItem>
              <MenuItem value="fair">Cukup</MenuItem>
              <MenuItem value="poor">Buruk</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              label="Status"
            >
              <MenuItem value="active">Aktif</MenuItem>
              <MenuItem value="inactive">Tidak Aktif</MenuItem>
              <MenuItem value="disposal">Disposal</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Kode Aset"
            value={formData.asset_code}
            onChange={(e) => setFormData({ ...formData, asset_code: e.target.value })}
            fullWidth
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

export default AssetManagement;
