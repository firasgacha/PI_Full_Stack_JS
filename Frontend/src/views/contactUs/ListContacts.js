import React, { useEffect, useState } from 'react';
import * as api from '../../api/Api';

export default function ListContacts() {
    const [Data, setData] = useState([]);
    const getAllContactsData = () => {
        api.getAllContacts()
          .then(response => {
            const result = response.data;
            const { status, message, data } = result;
            if (status !== 'SUCCESS') {
              alert(message, status)
            }
            else {
              setData(data);
            }
          }).catch(err => { console.log(err) })
      }
      useEffect(() => {
        getAllContactsData();
      }, []);
  return (
    <div>ListContacts</div>
  )
}
