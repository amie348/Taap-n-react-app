import { Box, CircularProgress, FormControlLabel, Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
// import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUser, getStaff } from '../../api/users';

import BootstrapTable from 'react-bootstrap-table-next';


export default function User() {
  const [staff, setStaff] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    loadUsers()
  }, [])

  const toggleChecked = (id) => {
    const newArr = staff.map(obj => {
      if (obj.id === id) {
        return {...obj, active:(!obj.active)  };
      }
      return obj;
      });
    setStaff(newArr);
  }
  const onDeleteHandler = async (user) => {
    console.log({ user });
    const preUsers = staff;
    const filtered = staff.filter(rev => rev._id !== user._id);
    // setStaff(filtered);
    try {
      await deleteUser(user.name);
    } catch (error) {
      toast.error('Something went wrong User Not Deleted !!!');
      // setStaff(preUsers)
    }
  }
  const loadUsers = async () => {
    const res = await getStaff();
    if (!res.ok) return;
    setStaff(res.data.data);
    console.log(res);
  }

  const products = [ ];
  const columns = [{
  dataField: 'id',
  text: 'Product ID'
  }, {
  dataField: 'name',
  text: 'Product Name'
  }, {
  dataField: 'price',
  text: 'Product Price'
  }];

  return (
    <div>
      <div className="container">
        <div className="display-6 px-3 fw-bold mt-3 ">All Users</div>
      </div>
      
			{staff.length === 0 ? (
        <Box p={3} style={{ width: "100%", textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div class="table-responsive">
          
          <BootstrapTable keyField='id' data={ products } columns={ columns } />

        </div >
      )}
    </div >
  )
}
