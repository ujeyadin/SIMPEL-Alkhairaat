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
  Tabs,
  Tab,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const LetterManagement = () => {
  const [letters, setLetters] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    school_id: '',
    type: 'incoming',
    letter_number: '',
    registration_number: '',
    date: new Date().toISOString().split('T')[0],
    sender: '',
    recipient: '',
    subject: '',
    content: '',
    status: 'draft',
    attachment_url: '',
    disposition_to: '',
    notes: '',
  });

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/letters', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLetters(response.data.data || []);
    } catch (error) {
      console.error('Error fetching letters:', error);
    }
  };

  const handleOpenDialog = (letter = null) => {
    if (letter) {
      setEditingId(letter.id);
      setFormData(letter);
    } else {
      setEditingId(null);
      setFormData({
        school_id: '',
        type: 'incoming',
        letter_number: '',
        registration_number: '',
        date: new Date().toISOString().split('T')[0],
        sender: '',
        recipient: '',
        subject: '',
        content: '',
        status: 'draft',
        attachment_url: '',
        disposition_to: '',
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
        await axios.put(`/api/letters/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/letters', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchLetters();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving letter:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus surat ini?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/letters/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchLetters();
      } catch (error) {
        console.error('Error deleting letter:', error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/letters/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLetters();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: 'default',
      received: 'info',
      processed: 'warning',
      replied: 'success',
      archived: 'secondary',
      sent: 'primary',
    };
    return colors[status] || 'default';
  };

  const filteredLetters = letters.filter(letter =>
    tabValue === 0 ? letter.type === 'incoming' : letter.type === 'outgoing'
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          ✉️ Manajemen Surat Masuk/Keluar
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Buat Surat
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
        <Tab label="Surat Masuk" />
        <Tab label="Surat Keluar" />
      </Tabs>

      <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976D2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nomor Surat</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tanggal</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                {tabValue === 0 ? 'Pengirim' : 'Penerima'}
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Perihal</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLetters.map((letter) => (
              <TableRow key={letter.id} hover>
                <TableCell sx={{ fontWeight: '500' }}>{letter.letter_number || letter.registration_number}</TableCell>
                <TableCell>{new Date(letter.date).toLocaleDateString('id-ID')}</TableCell>
                <TableCell>{letter.sender || letter.recipient}</TableCell>
                <TableCell sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {letter.subject}
                </TableCell>
                <TableCell>
                  <Chip
                    label={letter.status}
                    size="small"
                    color={getStatusColor(letter.status)}
                    clickable
                    onClick={() => {
                      const statuses = ['draft', 'received', 'processed', 'replied', 'archived'];
                      const nextStatus = statuses[(statuses.indexOf(letter.status) + 1) % statuses.length];
                      handleStatusChange(letter.id, nextStatus);
                    }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(letter)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(letter.id)}
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
        <DialogTitle>{editingId ? 'Edit Surat' : 'Buat Surat Baru'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Jenis Surat</InputLabel>
            <Select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              label="Jenis Surat"
            >
              <MenuItem value="incoming">Surat Masuk</MenuItem>
              <MenuItem value="outgoing">Surat Keluar</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Nomor Surat"
            value={formData.letter_number}
            onChange={(e) => setFormData({ ...formData, letter_number: e.target.value })}
            fullWidth
          />
          <TextField
            label="Nomor Registrasi"
            value={formData.registration_number}
            onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
            fullWidth
          />
          <TextField
            label="Tanggal Surat"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label={formData.type === 'incoming' ? 'Pengirim' : 'Penerima'}
            value={formData.type === 'incoming' ? formData.sender : formData.recipient}
            onChange={(e) =>
              setFormData({
                ...formData,
                [formData.type === 'incoming' ? 'sender' : 'recipient']: e.target.value,
              })
            }
            fullWidth
          />
          <TextField
            label="Perihal/Subjek"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            fullWidth
          />
          <TextField
            label="Isi Surat"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            fullWidth
            multiline
            rows={3}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              label="Status"
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="received">Diterima</MenuItem>
              <MenuItem value="processed">Diproses</MenuItem>
              <MenuItem value="replied">Dibalas</MenuItem>
              <MenuItem value="archived">Diarsipkan</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Disposisi Kepada"
            value={formData.disposition_to}
            onChange={(e) => setFormData({ ...formData, disposition_to: e.target.value })}
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

export default LetterManagement;
