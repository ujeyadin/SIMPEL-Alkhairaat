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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const SchoolManagement = () => {
  const [schools, setSchools] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    level: '',
    province: '',
    district: '',
    sub_district: '',
    address: '',
    phone: '',
    email: '',
    principal_name: '',
  });

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/schools', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchools(response.data.data || []);
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const handleOpenDialog = (school = null) => {
    if (school) {
      setEditingId(school.id);
      setFormData(school);
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        code: '',
        level: '',
        province: '',
        district: '',
        sub_district: '',
        address: '',
        phone: '',
        email: '',
        principal_name: '',
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
        await axios.put(`/api/schools/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/schools', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchSchools();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving school:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus sekolah ini?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/schools/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchSchools();
      } catch (error) {
        console.error('Error deleting school:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          🏫 Manajemen Data Sekolah
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Tambah Sekolah
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976D2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nama Sekolah</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Kode</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Jenjang</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Kabupaten</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Kepala Sekolah</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Aksi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schools.map((school) => (
              <TableRow key={school.id} hover>
                <TableCell>{school.name}</TableCell>
                <TableCell>{school.code}</TableCell>
                <TableCell>
                  <Chip label={school.level} size="small" color="primary" variant="outlined" />
                </TableCell>
                <TableCell>{school.district}</TableCell>
                <TableCell>{school.principal_name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(school)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(school.id)}
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
        <DialogTitle>{editingId ? 'Edit Sekolah' : 'Tambah Sekolah Baru'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Nama Sekolah"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Kode Sekolah"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Jenjang</InputLabel>
            <Select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              label="Jenjang"
            >
              <MenuItem value="TK">TK</MenuItem>
              <MenuItem value="SD">SD</MenuItem>
              <MenuItem value="SMP">SMP</MenuItem>
              <MenuItem value="SMA">SMA</MenuItem>
              <MenuItem value="SMK">SMK</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Provinsi"
            value={formData.province}
            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
            fullWidth
          />
          <TextField
            label="Kabupaten"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            fullWidth
          />
          <TextField
            label="Kecamatan"
            value={formData.sub_district}
            onChange={(e) => setFormData({ ...formData, sub_district: e.target.value })}
            fullWidth
          />
          <TextField
            label="Alamat"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Telepon"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
          />
          <TextField
            label="Nama Kepala Sekolah"
            value={formData.principal_name}
            onChange={(e) => setFormData({ ...formData, principal_name: e.target.value })}
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

export default SchoolManagement;
