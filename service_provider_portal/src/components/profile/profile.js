import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getServiceProviderProfile, updateServiceProviderImage, updateServiceProviderProfile } from "../../api/requests";
import Authentication from "../../containers/auth_container";

const Profile = () => {
  const [Name, setName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Description, setDescription] = useState("");
  const [address, setAddress] = useState('');
  const [emailAddress, setemailAddress] = useState("");
  const [image, setImage] = useState(null);
  const auth = Authentication.useContainer();


  useEffect(() => {
    getServiceProviderProfile()
      .then((response) => {
        if (response.data.success) {
          const serviceProviderPersonalInfo = response.data.service_provider_personal_info;
          setName(serviceProviderPersonalInfo.name);
          setPhoneNumber(serviceProviderPersonalInfo.phone_number);
          setDescription(serviceProviderPersonalInfo.description);
          setemailAddress(serviceProviderPersonalInfo.email);
          setImage(serviceProviderPersonalInfo.img_url);
          setAddress(serviceProviderPersonalInfo.address)
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateServiceProviderProfile(Name, PhoneNumber, emailAddress, Description, address)
      .then((response) => {
        if (response.data.success) {
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const choosePhoto = (e) => {
    document.getElementById('fileInput').click();
  }

  const handleSubmitImg = (e) => {
    updateServiceProviderImage(e.target.files[0])
      .then((response) => {
        if (response.data.success) {
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const logout = (e) => {
    auth.setToken(null);
    window.location.reload();
  }

  return (
    <Container>
      <div className='row m-2'>
        <div className='col-xl-4'>
          <div className='card mb-4 mb-xl-0'>
            <div className='card-header'>Profile Picture</div>
            <div className='card-body text-center'>
              <img
                className='img-account-profile rounded-circle mb-2 w-50 h-50'
                src={image}
                alt='profile image'
                onClick={() => console.log('clickedddd')}
              />
              <div className='small font-italic text-muted mb-4'>Photo uploaded will be automatically saved</div>
              <div style={{height:0, overflow: "hidden"}}>
                <input type="file" id="fileInput" onChange={handleSubmitImg} />
              </div>
              <button className='btn btn-primary' type='button' onClick={choosePhoto}>
                Upload new image
              </button>
              <div className="mt-3">
                <a onClick={logout} href="">Logout</a>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-8'>
          <div className='card mb-4'>
            <div className='card-header'>Account Details</div>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label className='small mb-1'>
                    Name
                  </label>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Enter your Name'
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='small mb-1'>
                    Address
                  </label>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Enter your Location'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='small mb-1'>
                    Email Address
                  </label>
                  <input
                    className='form-control'
                    type='email'
                    placeholder='Enter your email address'
                    value={emailAddress}
                    onChange={(e) => setemailAddress(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='small mb-1'>
                    Phone Number
                  </label>
                  <input
                    className='form-control'
                    type='tel'
                    placeholder='Enter your Phone Number'
                    value={PhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='small mb-1'>
                    Description
                  </label>
                  <textarea value={Description} className="form-control" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button className='btn btn-primary' type='submit'>
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  align-self: center;
  max-height: initial;
  box-sizing: inherit;
  font-weight: 300;
`;

export default Profile;
