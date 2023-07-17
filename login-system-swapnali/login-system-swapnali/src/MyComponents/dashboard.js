import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate=useNavigate()

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching search results');
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data.results);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredResults = searchResults.filter((row) => {
    const { name, gender, species, status, origin, location } = row;
    const searchQueryLower = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(searchQueryLower) ||
      gender.toLowerCase().includes(searchQueryLower) ||
      species.toLowerCase().includes(searchQueryLower) ||
      status.toLowerCase().includes(searchQueryLower) ||
      origin?.name.toLowerCase().includes(searchQueryLower) ||
      location?.name.toLowerCase().includes(searchQueryLower)
    );
  });

  const handleLogout = () => {
    navigate('/')
  };

  return (
    <>
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '16px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button variant="contained" onClick={handleLogout}>Logout</Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: 'lightblue' }}>
              <TableCell style={{ color: 'white' }}>Id No</TableCell>
              <TableCell style={{ color: 'white' }}>Avatar</TableCell>
              <TableCell align="right" style={{ color: 'white' }}>Name</TableCell>
              <TableCell align="right" style={{ color: 'white' }}>Gender</TableCell>
              <TableCell align="right" style={{ color: 'white' }}>Species</TableCell>
              <TableCell align="right" style={{ color: 'white' }}>Status</TableCell>
              <TableCell align="right" style={{ color: 'white' }}>Origin</TableCell>
              <TableCell align="right" style={{ color: 'white' }}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResults
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  style={{ border: '1px solid lightgray' }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img src={row?.image} alt="Avatar" style={{ borderRadius: '50%', width: '25px', height: '25px' }} />
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.species}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row?.origin?.name}</TableCell>
                  <TableCell align="right">{row?.location?.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredResults.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default Dashboard;
