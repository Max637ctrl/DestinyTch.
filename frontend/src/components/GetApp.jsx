import React from 'react';
import appStore from '../assets/apple.svg';  // Make sure the image is correctly imported
import phones from '../assets/phones.png';  // Make sure the image is correctly imported
import playStore from "../assets/android.svg";

const GetApp = () => {
  return (
    <section className="flexCenter w-full flex-col" id="app">
      <div className="mx-auto max-w-[1440px] relative flex w-full flex-col justify-between gap-32 overflow-hidden px-6 py-12 sm:flex-row sm:gap-12 sm:py-24 lg:px-20 xl:max-h-[598px] 2xl:round-5xl bg-primary">
        <div className='flex w-full flex-1 flex-col items-start justify-center gap-4 xl:max-w-[555px]'>
          <h2 className='font-bold text-4xl lg:text-6xl'>Get our app now!</h2>
          <h4 className='uppercase text-md text-secondary'>Available for iOS and Android</h4>
          <p className='py-4'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum sapiente repellat, assumenda culpa deserunt incidunt vitae blanditiis quia, provident nemo tempore dignissimos impedit unde!
          </p>
          <div className='flex w-full flex-col gap-3 xl:flex-row'>
            <button className='flexCenter gap-x-3 btn-dark rounded-full !px-15 !py-3.5'>
              <img src={appStore} alt="App Store logo" />
              App Store
            </button>

            <button className='flexCenter gap-x-3 btn-secondary rounded-full !px-15 !py-3.5'>
              <img src={playStore} alt="Play Store logo" />
              PlayStore
            </button>
          </div>
        </div>
        <div className='flex flex-1 items-center justify-end'>
          <img src={phones} width={550} height={870} alt="Phones displaying app" />
        </div>
      </div>
    </section>
  );
};

export default GetApp;
