import React, { useState } from "react";
import userAuth from "../Custom_hook/UserAuth";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

function CatMessageDialogbox(props: any) {
  let auth_: any;

  auth_ = userAuth();
  const { auth } = auth_;

  const { cat_id, open, setOpen } = props;
  const [message, setMessage] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const requestAdoption = () => {
    setOpen(false);

    const body = {
      cat_id: cat_id,
      buyer_id: auth.user_id,
      buyer_message: message,
      contact_info: contactInfo,
    };

    console.log(body);

    return fetch("http://127.0.0.1:5000/adoption_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
          alert("Your request has been sent to the Owner");
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Write a Message to the Owner</DialogTitle>
        <DialogContent>
          <input
            type="text"
            id="message"
            className="w-[550px] h-[100px] p-4 text-justify"
            placeholder="Explain your reasoning to be the best candidate for this cat....."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></input>
          <input
            type="text"
            id="message"
            className="w-[550px] p-4 text-justify"
            placeholder="Enter a personal email to contact with you"
            value={contactInfo}
            onChange={(e) => {
              setContactInfo(e.target.value);
            }}
          ></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={requestAdoption}>Send Request</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CatMessageDialogbox;
