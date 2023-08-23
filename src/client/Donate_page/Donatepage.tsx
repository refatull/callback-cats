import { type } from 'os';
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginNavbar from '../Components/LogoutNavBar';
import userAuth from '../Custom_hook/UserAuth';
import Errorpage from '../Error_page/Errorpage';
import './Donatepage.css';
import Login from '../Login/Login';
import donateImg from '../../../public/undraw_gifts.svg';
import Footer from '../Components/footer';
function Donatepage() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [img_url, setImg_url] = useState('');
  const [description, setDescription] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');

  let auth_: any;

  auth_ = userAuth();
  const { auth } = auth_;

  const { loggedIn, dataEmail, dataPassword, dataName, username, user_id } =
    auth;
  const nav = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      name: name,
      img_url: img_url,
      age: age,
      description: description,
      breed: breed,
      gender: gender,
      seller_id: user_id,
    };

    //console.log(name, age, description, breed, gender);
    return fetch('http://127.0.0.1:5000/upload_cat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.code === 200) {
          alert('Your cat info is uploaded');
          nav('/userinfo');
        }
      })
      .catch((error) => {
        console.log('error');
      });
  };

  return (
    <>
      {auth?.dataEmail ? (
        <LoginNavbar />
      ) : (
        <>
          {alert('You can not access this page without logging in')} <Login />
        </>
      )}
      <div className='lg:mt-[100px] mt-8 text-center'>
        <h1 className='big-heading text-[#394867]'>
          Put Your Cat for Adoption
        </h1>
      </div>
      <div className='grid lg:grid-cols-2 grid-cols-1 md:my-[100px] mx-4 lg:w-[95%] '>
        {/* left container */}
        <div className='mx-auto flex flex-col justify-around '>
          <img className='mx-auto' src={donateImg} alt='cat' />
        </div>
        {/* right container */}
        <div className=' shadow-md p-10 lg:mt-0 mt-5 bg-white rounded-md   mx-auto'>
          <div>
            <div>
              <form>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-2'>
                  {/* left cols */}
                  <div>
                    <div>
                      <label htmlFor='name'> Name: </label>
                      <div className=''>
                        <input
                          type='text'
                          value={name}
                          id='name'
                          placeholder="Enter Your Cat's Name"
                          className='peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear '
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>

                    <div>
                      <label htmlFor='age'> Age: </label>
                      <div className=''>
                        <input
                          type='number'
                          value={age}
                          id='age'
                          placeholder="Enter Your Cat's Age"
                          className='peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear '
                          onChange={(e) => {
                            setAge(e.target.valueAsNumber);
                          }}
                        ></input>
                      </div>
                    </div>

                    <div>
                      <label htmlFor='description'> Description: </label>
                      <div className=''>
                        <input
                          type='text'
                          value={description}
                          id='description'
                          className='peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear '
                          placeholder='Write something about your cat...'
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label htmlFor='breed'> Breed: </label>
                      <div className=''>
                        <input
                          type='text'
                          value={breed}
                          id='breed'
                          placeholder="Enter Your Cat's Breed"
                          className='peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear '
                          onChange={(e) => {
                            setBreed(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>

                    <div>
                      <label htmlFor='gender'> Gender: </label>
                      <div className=''>
                        <input
                          type='text'
                          value={gender}
                          id='gender'
                          placeholder="Enter Your Cat's Gender"
                          className='peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear '
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                  {/* right cols */}
                  <div className='flex flex-col justify-between'>
                    <div className='text-center small-heading'>
                      Upload Your Cat's Image
                    </div>
                    <div className=''>
                      <img
                        // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2h0Vk15Cz4w6aXzhSKxW3tcPJU6fiFHUaw&usqp=CAU"
                        src='https://64.media.tumblr.com/93cc22ccda31679f83bb81dbe4a1bff8/0767393739a2484f-a9/s540x810/a1a2116a0479ecf9517de58e858ab33f5199d512.pnj'
                        alt='caticons'
                        className='w-[200px] rounded-full m-4 mx-auto my-[28px]'
                      />
                    </div>
                    <div className=''>
                      <label htmlFor='img_url'>Image Url:</label>
                      <div className=''>
                        <input
                          type='url'
                          value={img_url}
                          id='img_url'
                          className='peer block min-h-[auto] w-full rounded border-2  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear '
                          onChange={(e) => {
                            setImg_url(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                    <div className='mt-4'>
                      <button
                        type='button'
                        className='block w-[60%] mx-auto rounded bg-red-300 py-5 text-white hover:bg-red-400 shadow-md'
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Donatepage;
