import * as React from 'react';
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch, } from '../../app/hook';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { profileList, selectPatient, selectPatientStatus } from '../slices/patientsSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const ListProfiles = () => {
  const dispatch = useAppDispatch();
  const profilePatientStatus = useAppSelector(selectPatientStatus);

  useEffect(() =>{
    if(profilePatientStatus === "idle"){
      dispatch(profileList())
    }
  }, [profilePatientStatus, dispatch]);
   const profilePatient = useAppSelector(selectPatient);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
            <StyledTableCell align="right">Gender</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profilePatient.map((value) => (
            <StyledTableRow
              key={value.ProfileId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <StyledTableCell component="th" scope="value">
              {value.ProfileId}
              </StyledTableCell>
              <StyledTableCell align="right">{value.Profile.firstName}</StyledTableCell>
              <StyledTableCell align="right">{value.Profile.lastName}</StyledTableCell>
              <StyledTableCell align="right">{value.Profile.address}</StyledTableCell>
              <StyledTableCell align="right">{value.Profile.phoneNumber}</StyledTableCell>
              <StyledTableCell align="right"> {value.gender}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
