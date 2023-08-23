import { useLocation, useNavigate } from 'react-router-dom';
import './Userinfo.css';
import LoginNavbar from '../Components/LogoutNavBar';
import Login from '../Login/Login';
import React, { useState, useEffect } from 'react';
import CatInfoCard from '../Components/CatInfoCard';
import userAuth from '../Custom_hook/UserAuth';
import Footer from '../Components/footer';
import { Navbar } from 'react-bootstrap';
import Donatepage from '../Donate_page/Donatepage';

type Cats = {
  age: number;
  breed: string;
  description: string;
  gender: string;
  id: number;
  img_url: string;
  is_available: boolean;
  name: string;
  seller_email: string;
  seller_id: number;
  seller_name: string;
};

function UserInfo() {
  //const [open, setOpen] = useState(false);

  let auth_: any;

  auth_ = userAuth();
  const { auth } = auth_;

  const { loggedIn, dataEmail, dataPassword, name, username, user_id } = auth;

  const [dataCode, setDataCode] = useState(0);

  const nav = useNavigate();

  const [cats, setCats] = useState<Cats[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/all_cats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.code === 400) {
          alert('Not cat found');
        } else {
          console.log(data.body);
          const catData = data.body.map((cat: any) => ({
            age: cat.age,
            breed: cat.breed,
            description: cat.description,
            gender: cat.gender,
            id: cat.id,
            img_url: cat.img_url,
            is_available: cat.is_available,
            name: cat.name,
            seller_email: cat.seller_email,
            seller_id: cat.seller_id,
            seller_name: cat.seller_name,
          }));
          setCats(catData);
        }
      })
      .catch((error) => {
        console.log('error');
      });
  }, [dataCode]);

  const filterCats = cats.filter((cat) => cat.seller_id === user_id);

  const handleSubmit = () => {
    nav('/donate');
    //setOpen(true);
  };

  const deleteCat = (id: number) => {
    const catData = {
      id: id,
    };
    return fetch('http://127.0.0.1:5000/delete_cat_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(catData),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setDataCode(data.code);
      })
      .catch((error) => {
        console.log('error');
      });
  };

  return auth?.dataEmail ? (
    <>
      <LoginNavbar />
      <div className='mt-[100px] lg:mx-auto lg:w-[70%] mx-[5%] w-[90%]'>
        <div className=' mt-10 small-heading'>
          Welcome, <strong>{name}</strong>
        </div>
        <div className='  small-heading'>
          <strong>Username:</strong> {username}
        </div>
        <div className='  small-heading'>
          <strong>Email:</strong> {dataEmail}
        </div>
        <h6 className='mt-20 small-title'>My Cats</h6>
        <div className='upload-btn-container '>
          <button
            onClick={handleSubmit}
            className='px-20 py-3 border round-md mb-5 hover:bg-red-400 shadow-md border-gray-400 hover:border-red-400 hover:text-white'
          >
            Upload <i className='fa-sharp fa-solid fa-plus'></i>
          </button>
        </div>

        {/* rending all user cats */}

        <div className='  grid md:grid-cols-3 grid-cols-2 gap-4  lg:mx-auto py-4'>
          {filterCats.map((cat) => (
            <div key={cat.id} className='shadow-md bg-white p-4 rounded-lg'>
              <div className='delete-icon-container'>
                <i
                  className='fa-solid fa-xmark text-gray-300 hover:text-red-500 cursor-pointer text-[30px] mb-3'
                  onClick={() => {
                    //console.log(cat.id);
                    deleteCat(cat.id);
                  }}
                ></i>
              </div>
              <CatInfoCard cat={cat} />
            </div>
          ))}
        </div>
      </div>
      {/* footer */}
      <Footer />
    </>
  ) : (
    <>
      {alert('You can not access this page without logging in')}
      {nav('/login')}
    </>
  );
}

export default UserInfo;
