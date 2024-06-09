import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { selectProducts } from '../store/slices/productSlice';

type Props = {}

export default function SummaryPage({}: Props)  {
  const products = useSelector(selectProducts);

  const totalPrice = products.reduce((sum, product) => sum + product.price * product.stock, 0).toFixed(2);

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-20">
        <h1 className="text-2xl font-bold mb-5">Summary</h1>
        <div className="bg-white p-5 shadow-md rounded">
          <h2 className="text-xl mb-3">Total Price of All Products:</h2>
          <p className="text-2xl font-bold">${totalPrice}</p>
        </div>
      </div>
    </>
  );
};
