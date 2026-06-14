// ============================================
// EMPLOYEES LIST PAGE
// Data grid with search, filter, pagination
// ============================================

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Download as ExportIcon,
} from '@mui/icons-material';

import { ROUTES }           from '../../config/navigation';
import { EmploymentStatus } from '../../graphql/types';

// -----------------------------------------------
// STATUS CHIP COLORS
// -----------------------------------------------
const STATUS_COLORS: Record<EmploymentStatus, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  ACTIVE:     'success',
  INACTIVE:   'default',
  ON_LEAVE:   'warning',
  TERMINATED: 'error',
  SUSPENDED:  'error',
};

// -----------------------------------------------
// COLUMNS DEFINITION
// -----------------------------------------------
const getColumns = (
  onView:   (id: string) => void,
  onEdit:   (id: string) => void,
  onDelete: (id: string) => void,
): GridColDef[] => [
  {
    field:      'employeeNumber',
    headerName: 'Emp #',
    width:      110,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" fontWeight={600} color="primary">
        {params.value}
      </Typography>
    ),
  },
  {
    field:      'name',
    headerName: 'Employee',
    flex:       1,
    minWidth:   200,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar
          src={params.row.profilePicture}
          alt={params.row.firstName}
          sx={{ width: 32, height: 32, fontSize: '0.8rem' }}
        >
          {params.row.firstName?.[0]}{params.row.lastName?.[0]}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight={600} noWrap>
            {params.row.firstName} {params.row.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {params.row.email}
          </Typography>
        </Box>
      </Box>
    ),
    valueGetter: (params: GridRenderCellParams) =>
      `${params.row.firstName} ${params.row.lastName}`,
  },
  {
    field:      'jobTitle',
    headerName: 'Job Title',
    flex:       1,
    minWidth:   150,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2" noWrap>
        {params.value || '—'}
      </Typography>
    ),
  },
  {
    field:      'department',
    headerName: 'Department',
    width:      140,
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.row.department?.code || '—'}
        size="small"
        variant="outlined"
        sx={{ fontWeight: 600, fontSize: '0.75rem' }}
      />
    ),
  },
  {
    field:      'employmentStatus',
    headerName: 'Status',
    width:      120,
    renderCell: (params: GridRenderCellParams) => (
      <Chip
        label={params.value}
        size="small"
        color={STATUS_COLORS[params.value as EmploymentStatus] || 'default'}
        sx={{ fontWeight: 600, fontSize: '0.7rem' }}
      />
    ),
  },
  {
    field:      'hireDate',
    headerName: 'Hire Date',
    width:      110,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant="body2">
        {params.value
          ? new Date(params.value).toLocaleDateString()
          : '—'
        }
      </Typography>
    ),
  },
  {
    field:      'actions',
    headerName: 'Actions',
    width:      120,
    sortable:   false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Tooltip title="View">
          <IconButton
            size="small"
            onClick={() => onView(params.row.id)}
            color="primary"
          >
            <ViewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            onClick={() => onEdit(params.row.id)}
            color="info"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            onClick={() => onDelete(params.row.id)}
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];

// -----------------------------------------------
// PAGE COMPONENT
// -----------------------------------------------
const EmployeesPage: React.FC = () => {
  const navigate = useNavigate();

  const [searchTerm,   setSearchTerm]   = useState('');
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [pageSize,     setPageSize]     = useState(20);
  const [page,         setPage]         = useState(0);

  // Handlers
  const handleView   = useCallback((id: string) => {
    navigate(ROUTES.EMPLOYEE_DETAIL.replace(':id', id));
  }, [navigate]);

  const handleEdit   = useCallback((id: string) => {
    navigate(ROUTES.EMPLOYEE_EDIT.replace(':id', id));
  }, [navigate]);

  const handleDelete = useCallback((id: string) => {
    // Delete handler — wired up in Phase 11
    console.log('Delete employee:', id);
  }, []);

  const columns = getColumns(handleView, handleEdit, handleDelete);

  return (
    <Box>
      {/* Page Header */}
      <Box
        sx={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     { xs: 'flex-start', sm: 'center' },
          flexDirection:  { xs: 'column', sm: 'row' },
          gap:            2,
          mb:             3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Employees
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your organization's workforce
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate(ROUTES.EMPLOYEE_NEW)}
          sx={{ borderRadius: 2, px: 3, flexShrink: 0 }}
        >
          Add Employee
        </Button>
      </Box>

      {/* Filters & Search */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              placeholder="Search employees..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              size="small"
              sx={{ flex: 1, minWidth: 200 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={e => setFilterAnchor(e.currentTarget)}
              sx={{ borderRadius: 2, flexShrink: 0 }}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              startIcon={<ExportIcon />}
              sx={{ borderRadius: 2, flexShrink: 0 }}
            >
              Export
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={() => setFilterAnchor(null)}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 180 } }}
      >
        <MenuItem onClick={() => setFilterAnchor(null)}>
          All Employees
        </MenuItem>
        <MenuItem onClick={() => setFilterAnchor(null)}>
          Active Only
        </MenuItem>
        <MenuItem onClick={() => setFilterAnchor(null)}>
          On Leave
        </MenuItem>
        <MenuItem onClick={() => setFilterAnchor(null)}>
          Full Time
        </MenuItem>
        <MenuItem onClick={() => setFilterAnchor(null)}>
          Contract
        </MenuItem>
      </Menu>

      {/* Data Grid */}
      <Card elevation={1}>
        <DataGrid
          rows={[]}
          columns={columns}
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={model => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
          sx={{
            border:       'none',
            borderRadius: 3,
            '& .MuiDataGrid-row': { cursor: 'pointer' },
          }}
          slots={{
            noRowsOverlay: () => (
              <Box
                sx={{
                  display:        'flex',
                  flexDirection:  'column',
                  alignItems:     'center',
                  justifyContent: 'center',
                  height:         200,
                  gap:            2,
                }}
              >
                <PeopleIcon
                  sx={{ fontSize: 48, color: 'text.disabled' }}
                />
                <Typography color="text.secondary">
                  No employees found
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate(ROUTES.EMPLOYEE_NEW)}
                  size="small"
                >
                  Add First Employee
                </Button>
              </Box>
            ),
          }}
        />
      </Card>
    </Box>
  );
};

export default EmployeesPage;