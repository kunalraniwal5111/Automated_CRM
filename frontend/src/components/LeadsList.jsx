import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_LEADS, UPDATE_LEAD_STATUS } from '../graphql/queries';
import { Link, useNavigate } from 'react-router-dom';

const LeadsList = () => {
  const { loading, error, data, refetch } = useQuery(GET_LEADS);
  const [updateLeadStatus] = useMutation(UPDATE_LEAD_STATUS)
  const [selectedLead, setSelectedLead] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updatedLeadId, setUpdatedLeadId] = useState(null);
  const navigate = useNavigate()



  const handleStatusChangeClick = (lead) => {
    setSelectedLead(lead);
    setNewStatus(lead.status);
  };

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      await updateLeadStatus({ variables: { id: selectedLead.id, status: newStatus } });
      setUpdatedLeadId(selectedLead.id);
      setSelectedLead(null);
      await refetch();
      navigate('/')
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
    setUpdating(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h2 className='mt-5 text-center text-4xl font-semibold'>Leads</h2>
      <div className='mx-auto mt-10 text-2xl text-center'>
        <Link to="/addLead">Add new Lead</Link>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left"><span className='font-bold text-xl'>Name</span></TableCell>
              <TableCell align="left"><span className='font-bold text-xl'>Email</span></TableCell>
              <TableCell align="left"><span className='font-bold text-xl'>Phone</span></TableCell>
              <TableCell align="left"><span className='font-bold text-xl'>Status</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.leads.map((lead) => (
              <TableRow
                key={lead.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{lead.name}</TableCell>
                <TableCell align="left">{lead.email}</TableCell>
                <TableCell align="left">{lead.phone}</TableCell>
                <TableCell align="left">{lead.status}
                  {updating && updatedLeadId === lead.id ? (
                    <p>Updating...</p>
                  ) : (
                    <button className='m-4 bg-blue-500 p-1 rounded' onClick={() => handleStatusChangeClick(lead)}>Update Status</button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedLead && (
        <div className='w-full mt-10 flex flex-col justify-center items-center'>
          <h3 className=' ml-4 font-semibold'>Update Status for {selectedLead.name}</h3>
          <input className='mt-2 ml-4 border-2 rounded p-2 border-black '
            type="text"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
          <div className='mt-2'>
            <button className='ml-5 border-1 bg-blue-400 w-20 p-1 rounded' onClick={handleStatusUpdate}>Update</button>
            <button className='ml-5 border-1 bg-blue-400 w-20 p-1 rounded' onClick={() => setSelectedLead(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsList;
