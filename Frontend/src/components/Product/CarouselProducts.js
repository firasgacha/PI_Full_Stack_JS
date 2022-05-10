import React,{useEffect} from 'react'
import * as api from '../../api/Api';
import ProductCard from './ProductCard';
export default function CarouselProducts() {
//     const [data, setData] = React.useState([]);

//     const GetProductsData = () => {
//         api.getAllProducts()
//         .then(response => {
//           const result = response.data;
//           const { status, message, data } = result;
//               if (status !== 'SUCCESS') {
//                   alert(message, status)
//               }
//               else {
//                   setData(data);
//                   console.log(data);
//               }
//       }) .catch(err => {console.log(err)})
//     }
//     useEffect(() => {
//         GetProductsData();
//       },[]);
  return (
<div className="carousel carousel-center rounded-box">
        <div className="carousel-item">
            <ProductCard image={"https://api.lorem.space/image/fashion?w=400&h=225"}/>
        </div>
        <div className="carousel-item">
            <ProductCard image={"https://api.lorem.space/image/shoes?w=400&h=225"}/>
        </div>
        <div className="carousel-item">
            <ProductCard image={"https://api.lorem.space/image/watch?w=400&h=225"}/>
        </div>
        <div className="carousel-item">
            <ProductCard image={"https://api.lorem.space/image/furniture?w=400&h=225"}/>
        </div>
        <div className="carousel-item">
            <ProductCard image={"https://api.lorem.space/image/book?w=400&h=225"}/>
        </div>
      </div>  
    )
}
