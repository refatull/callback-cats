import React from 'react';
import userAuth from '../Custom_hook/UserAuth';
import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

function CatAcceptDialog(props: any) {
  let auth_: any;

  auth_ = userAuth();
  const { auth } = auth_;

  const { adoptionId, open, setOpen } = props;
  const [message, setMessage] = useState('');

  const confirmRequestAdoption = () => {
    setOpen(false);

    const body = {
      adoption_id: adoptionId,
      owner_message: message,
    };

    console.log(body);

    return fetch('http://127.0.0.1:5000/adoption_confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.code === 200) {
          console.log(body);
          console.log(data);
          alert('Your message has been sent');
        }
      })
      .catch((error) => {
        console.log('error');
      });
  };

  const rejectRequest = () => {
    setOpen(false);

    const body = {
      adoption_id: adoptionId,
      owner_message: message,
    };

    console.log(body);

    return fetch('http://127.0.0.1:5000/adoption_reject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.code === 200) {
          console.log(body);
          console.log(data);
          alert('Your message has been sent');
        }
      })
      .catch((error) => {
        console.log('error');
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Write a Reasoning for Accepting/Rejecting the Request
        </DialogTitle>
        <DialogContent>
          <input
            type='text'
            id='message'
            className='w-[550px] h-[100px] p-4 text-justify'
            placeholder='Explain your reasoning to accept or reject the request.....'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmRequestAdoption}>Accept</Button>
          <Button onClick={rejectRequest}>Reject</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CatAcceptDialog;
