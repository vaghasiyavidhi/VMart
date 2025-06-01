import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { addToCart } from '../Slice/cartSlice';
import { useDispatch } from 'react-redux';

function Product() {

    const [des, setDes] = useState([])
    const [rev, setRev] = useState([])

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        fetch(`https://dummyjson.com/products/${params.id}`)
        .then(res => res.json())
        .then((product)=>{
            setDes(product)
            setRev(product.reviews)
        })
    })

  return (
    <>
        <Container style={{marginTop:100}}>
            <Row>
                <Col lg={6} sm={12} xs={12}>
                    <img src={des.thumbnail} alt="" width={500} height={480}/>
                    <Row>
                        <Col>
                            <img src={des.images} alt="" width={180} height={160} style={{border:'1px solid gray'}} />
                        </Col>
                    </Row>
                    <Row style={{display:'flex', justifyContent:'center'}}>
                        <Link to={'/cart'} style={{textDecoration:'none'}}><Button onClick={()=>{dispatch(addToCart(des))}} variant="success" style={{width:170, height:50, fontSize:17, fontWeight:500, marginTop:40, marginBottom:40, display:'flex', justifyContent:'center', alignItems:'center'}}>ADD TO CART</Button></Link>
                    </Row>
                </Col>
                <Col lg={6} sm={12} xs={12}>
                    <h2>{des.title}</h2>
                    <h6 style={{fontSize:17}}>{des.brand} ({des.category})</h6>
                    <div className='rating'>{des.rating}<FaStar style={{margin:'0 0 4px 4px', height:'10px'}}/></div>
                    <div style={{marginTop:15, marginBottom:10}}>{des.description}</div>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <div style={{fontSize:34, fontWeight:500, display:'flex', alignItems:'center'}}>₹ {des.price}</div>
                        <div style={{fontSize:17, fontWeight:500, color:'darkgreen', marginLeft:10}}>{des.discountPercentage}% off</div>
                    </div>
                    <div style={{margin:'10px 0'}}>
                        <div style={{marginBottom:15}}><img src={require('../images/c22c9fc4-0555-4460-8401-bf5c28d7ba29.webp')} alt="" width={18} height={18} style={{marginRight:10}} /><b style={{fontWeight:600}}>Warranty : </b>{des.warrantyInformation}</div>
                        <div style={{marginBottom:15}}><img src={require('../images/c22c9fc4-0555-4460-8401-bf5c28d7ba29.webp')} alt="" width={18} height={18} style={{marginRight:10}} /><b style={{fontWeight:600}}>Delivery : </b>{des.shippingInformation}</div>
                        <div style={{marginBottom:15}}><img src={require('../images/c22c9fc4-0555-4460-8401-bf5c28d7ba29.webp')} alt="" width={18} height={18} style={{marginRight:10}} /><b style={{fontWeight:600}}>Availability Status : </b>{des.availabilityStatus}</div>
                        <div style={{marginBottom:15}}><img src={require('../images/c22c9fc4-0555-4460-8401-bf5c28d7ba29.webp')} alt="" width={18} height={18} style={{marginRight:10}} /><b style={{fontWeight:600}}>Return Policy : </b>{des.returnPolicy}</div>
                        <div style={{marginBottom:15}}><img src={require('../images/c22c9fc4-0555-4460-8401-bf5c28d7ba29.webp')} alt="" width={18} height={18} style={{marginRight:10}} /><b style={{fontWeight:600}}>Order Quantity : </b>{des.minimumOrderQuantity}</div>
                    </div>
                    <div style={{marginTop:40, marginBottom:20}}>
                        <h4 style={{marginBottom:30}}>Ratings & Reviews</h4>
                        {
                            rev.map((r, i)=>{
                                return(
                                    <div key={i} style={{border:'1px solid #ddd', padding:'15px 0 0 15px', marginTop:15}}>
                                        <div className='rev-rate'>{r.rating}<FaStar style={{margin:'0 0 4px 3px', height:'11px'}}/></div>
                                        <h6 style={{marginTop:6}}>{r.comment}</h6>
                                        <p style={{color:'grey', fontSize:14}}>By : {r.reviewerName}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Product