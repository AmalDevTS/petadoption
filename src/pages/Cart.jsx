import React from 'react'
import { Link } from 'react-router-dom'
import heart from '../images/heart.png'
import kart from '../images/shopping-cart (1).png'
import CartItems from '../components/CartItems'
import { productAPI } from '../services/allAPI'
import { useEffect, useState } from 'react'
import logo from '../images/Colored Pet Shop Collie Dog.png'
import Swal from 'sweetalert2'
import loadingimg from '../images/pet-jumping-20210422 (1).gif'





function Cart() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const [searchCart, setSearchCart] = useState("");

    const [mainProduct, setMainProduct] = useState([]);

    const getMainProduct = async () => {
        const result = await productAPI(searchCart);
        setMainProduct(result.data);
    };

    useEffect(() => {
        getMainProduct()
    }, [searchCart]);


    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: "Do you want to logout?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem("token");
                setIsLoggedIn(false);
                Swal.fire("Logged out!", "", "success");
            }
        });
    };


  return (
    <div>
         <nav className="navbar" style={{ backgroundColor: "#4b1c81" }}>
                <div className="container-fluid">
                    <img src={logo}  width={"55px"} alt="" />
                    <form className="d-flex me-auto ms-5" role="search">
                        <input className="form-control me-2"
                                        onChange={(e)=>setSearchCart(e.target.value)}

                        type="search" placeholder="Search" aria-label="Search" style={{ borderRadius: "15px" }} />
                        <button className="btn btn-success" style={{ backgroundColor: "#fbab05", borderRadius: "20px", borderColor: "#fbab05" }} type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                    <Link to='/main'>
                        <button className="btn btn-primary me-2" type="button" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }}>
                            Adopt
                        </button>
                    </Link>
                    {isLoggedIn ? (

        
                        <>
                            <Link to='/checkout'>
                                <button className="btn btn-primary me-2" type="button" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }}>
                                <img className='mb-1' src={kart} width={"25px"}   alt="" /> Cart</button>
                            </Link>
                            <Link to='/wishlist'>
                                <button className="btn btn-primary me-2" type="button" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }}>Wishlist <img src={heart} width={"20px"} alt="" /></button>
                            </Link>
                            <button className="btn btn-success me-2" type="button" onClick={handleLogout} style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }}>Logout <i class="fa-solid fa-power-off" style={{color:"white"}}></i></button>
                        </>
                                            ) : (

        
                        <Link to="/login">
                            <button className="btn btn-success me-2" type="button" style={{ backgroundColor: "#4b1c81", borderRadius: "20px", borderColor: "#4b1c81" }}>Login <i class="fa-solid fa-power-off" style={{color:"white"}}></i></button>
                        </Link>
                                            )}

                
                </div>
            </nav>
            <div className='row'>
            {mainProduct.length > 0 ?
                    mainProduct.map((item,index) => (
                        <div className='col-md-3' key={index} >
                            <CartItems product={item} isLoggedIn={isLoggedIn}  />
                        </div>
                    )) :
                    <img src={loadingimg} alt="" style={{ width: '400px', display: 'block', margin: 'auto' }} />

                }



            </div>








    </div>
  )
}

export default Cart