import React from "react";
import profile from '../../images/blank-profile-picture.png';

const ImagesSection = (props) => {
  const { service_provider } = props;

  return (
    <section style={{ position: "relative" }}>
      <div className=" w-full flex justify-center w-80">
        <div className="flex flex-col" style={{textAlign: 'center'}}>
            <img src={service_provider?.img_url || profile} alt={"img"}
            className='img-account-profile rounded-full rounded-circle'
            style={{ width: '200px', height: '200px' }} />
        </div>
      </div>
      <div className="flex justify-center flex-col mt-5 mb-3.5">
        <h1 className="text-center font-bold text-3xl" style={{fontSize: '5rem'}}>{service_provider?.name}</h1>
      </div>
      <hr className="full flex self-center w-2/3 mt-2" />
      <div className="flex justify-center flex-col mt-5 mb-3.5">
        <div className="font-bold text-3xl">Phone: {service_provider?.phone_number}</div>
        <div className="font-bold text-3xl">Description: {service_provider?.description}</div>
        <div className="font-bold text-3xl">Address: {service_provider?.address}</div>
      </div>
    </section>
  );
};

export default ImagesSection;
