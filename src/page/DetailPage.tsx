import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../interfaces/interfaceProduct'
import Navbar from '../components/Navbar';

type Props = {}

export default function DetailPage({ }: Props) {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);

  useEffect(() => {
    console.log('Component Did Mount');
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();

    return () => {
      console.log('Component Will Unmount');
    };
  }, [id]);

  useEffect(() => {
    if (product) {
      console.log('Component Did Update');
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-white p-5 shadow-md rounded w-full max-w-3xl">
          <div className="flex justify-center">
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <img key={index} src={image} alt={`${product.title} ${index + 1}`} className="w-40 h-40" />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center mt-4">
            <p className="text-xl">{product.title}</p>
            <p className="text-xl mt-4">Price: ${product.price}</p>
            <p className="text-xl mt-2">Stock: {product.stock}</p>
          </div>
        </div>
      </div>
    </>
  )
}