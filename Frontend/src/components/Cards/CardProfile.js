import React from "react";
import { useSelector} from "react-redux";


// components


export default function CardProfile() {
  const auth = useSelector(state => state.auth)


  const{user} = auth



  return (
      <>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  <img
                      alt="..."
                      src={user.avatar}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-12 lg:-ml-20 max-w-150-px"
                  />

                </div>
              </div>
            </div>
            <div className="text-center mt-24">
              <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {user.name}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"/>{" "}
                {user.address} {user.city} {user.state} {user.zip} {user.country}
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
