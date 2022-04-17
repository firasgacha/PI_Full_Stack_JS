import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'cloudinary-react';


export default function Message(props) {
  const date = Date.now();
  return (
    <div className="px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start">
      {props.image ? (
        <img
          src={props.image}
          alt="Avatar"
          className="rounded-full mr-4"
          width={45}
          height={45}
        />
      ) : <p>No Image</p>}
      <div>
        <div className="flex items-center mb-1">
          {props.userName ? (
            <p className="mr-2 text-primary-500">{props.userName}</p>
          ) : null}
          {date? (
            <span className="text-gray-500 text-xs">
              date
            </span>
          ) : null}
        </div>
        <p>{props.content}</p>
      </div>
    </div>
  );
}

