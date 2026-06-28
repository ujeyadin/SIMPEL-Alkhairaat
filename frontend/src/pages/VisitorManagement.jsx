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
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

const VisitorManagement = () => {
  const [visitors, setVisitors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    school_id: '',
    name: '',
    phone: '',
    email: '',
    organization: '',
    purpose: '',
    visitor_category: 'external',
    check_in_time: new Date().toISOString(),
    check_out_time: null,
    visited_department: '',
    host_name: '',
    notes: '',
  });

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/visitors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVisitors(response.data.data || []);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const handleOpenDialog = (visitor = null) => {
    if (visitor) {
      setEditingId(visitor.id);
      setFormData(visitor);
    } else {
      setEditingId(null);
      setFormData({
        school_id: '',
        name: '',
        phone: '',
        email: '',
        organization: '',
        purpose: '',
        visitor_category: 'external',
        check_in_time: new Date().toISOString(),
        check_out_time: null,
        visited_department: '',
        host_name: '',
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
        await axios.put(`/api/visitors/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/visitors', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchVisitors();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving visitor:', error);
    }
  };

  const handleCheckout = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/visitors/${id}/checkout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVisitors();
    } catch (error) {
      console.error('Error checkout visitor:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data pengunjung ini?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/visitors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchVisitors();
      } catch (error) {
        console.error('Error deleting visitor:', error);
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      internal: 'primary',
      external: 'default',
      government: 'info',
      vendor: 'warning',
      parent: 'success',
      other: 'secondary',
    };
    return colors[category] || 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          📖 Buku Tamu - Manajemen Pengunjung
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Tambah Pengunjung
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976D2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nama</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Kategori</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Organisasi</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Check In</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Check Out</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visitors.map((visitor) => (
              <TableRow key={visitor.id} hover>
                <TableCell sx={{ fontWeight: '500' }}>{visitor.name}</TableCell>
                <TableCell>
                  <Chip
                    label={visitor.visitor_category}
                    size="small"
                    color={getCategoryColor(visitor.visitor_category)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{visitor.organization}</TableCell>
                <TableCell>{new Date(visitor.check_in_time).toLocaleString('id-ID')}</TableCell>
                <TableCell>
                  {visitor.check_out_time
                    ? new Date(visitor.check_out_time).toLocaleString('id-ID')
                    : '-'}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {!visitor.check_out_time && (
                    <IconButton
                      size="small"
                      onClick={() => handleCheckout(visitor.id)}
                      color="success"
                      title="Checkout"
                    >
                      <CheckIcon />
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(visitor)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(visitor.id)}
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
        <DialogTitle>{editingId ? 'Edit Pengunjung' : 'Tambah Pengunjung Baru'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Nama Lengkap"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Nomor Telepon"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
          />
          <TextField
            label="Organisasi/Instansi"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Kategori Pengunjung</InputLabel>
            <Select
              value={formData.visitor_category}
              onChange={(e) => setFormData({ ...formData, visitor_category: e.target.value })}
              label="Kategori Pengunjung"
            >
              <MenuItem value="internal">Internal</MenuItem>
              <MenuItem value="external">External</MenuItem>
              <MenuItem value="government">Pemerintah</MenuItem>
              <MenuItem value="vendor">Vendor</MenuItem>
              <MenuItem value="parent">Orang Tua Siswa</MenuItem>
              <MenuItem value="other">Lainnya</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Keperluan"
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Departemen yang Dikunjungi"
            value={formData.visited_department}
            onChange={(e) => setFormData({ ...formData, visited_department: e.target.value })}
            fullWidth
          />
          <TextField
            label="Nama Host/Penanggungjawab"
            value={formData.host_name}
            onChange={(e) => setFormData({ ...formData, host_name: e.target.value })}
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

export default VisitorManagement;
