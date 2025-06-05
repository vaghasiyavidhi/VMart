import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { increament, decreament, removeCart } from '../Slice/cartSlice';
import { useDispatch } from 'react-redux';

function Cart() {
  
  const item = useSelector((state)=>state.cart.pro)
  const count = useSelector((state)=>state.cart.value)
  const prices = useSelector((state)=>state.cart.price)
  const gt = useSelector((state)=>state.cart.gst)
  const tp = useSelector((state)=>state.cart.tamt)
  const discount = useSelector((state)=>state.cart.dis)
  const famt = useSelector((state)=>state.cart.pamt)
  const save = useSelector((state)=>state.cart.s)
    
  const dispatch = useDispatch()

  return (
    <>
        <Container style={{marginTop:80, marginBottom:30}}>
            <Row className='justify-content-center'>
                <Col lg={8} md={12} sm={12} xs={12}>
                  {
                    item.map((val, i)=>{
                      return(
                        <Card key={i} style={{ marginTop:40, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                            <div style={{ display: 'flex' }}>
                              <Card.Img src={val.thumbnail}/>
                              <Card.Body>
                                <Link to={`/product/${val.id}`} style={{textDecoration:'none', color:'black'}}><Card.Title>{val.title}</Card.Title></Link>
                                <p className='text-secondary'>{val.sku}</p>
                                <Card.Text>{val.description}</Card.Text>
                                <h4>₹ {val.price} <span className='text-success fs-6'>{val.discountPercentage} % off</span></h4>
                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                  <div  style={{display:'flex', alignItems:'center'}}>
                                    <button onClick={()=>{dispatch(decreament(val))}} className='cart-btn1'>-</button>
                                    <p style={{fontSize:20, paddingTop:15, fontWeight:500}}>{val.qty}</p>
                                    <button onClick={()=>{dispatch(increament(val))}} className='cart-btn2'>+</button>
                                  </div>
                                  <MdDeleteForever onClick={()=>{dispatch(removeCart(val))}} style={{fontSize:26, cursor:'pointer'}}/>
                                </div>
                            </Card.Body>
                          </div>
                        </Card>
                      )
                    })
                  }
                </Col>
                <Col lg={4} md={6} xs={10} className='shadow' style={{marginTop:40, height:390}}>
                  <h5 className='text-secondary pt-3 pb-3'>PRICE DETAILS</h5><hr style={{marginTop:0}}/>
                  <div className='pt-2 pb-3'>
                    <div className='d-flex justify-content-between'>
                      <p style={{fontSize:18}}>Price ({count} items)</p>
                      <p style={{fontSize:18}}>₹ {prices}</p>
                    </div>
                    <div className='d-flex justify-content-between' style={{borderBottom:'1px dashed #ddd'}}>
                      <p style={{fontSize:18}}>GST (18%)</p>
                      <p style={{fontSize:18}}>₹ {gt}</p>
                    </div>
                  </div>
                  <div className='pb-3'>
                    <div className='d-flex justify-content-between'>
                      <h5>Total Price</h5>
                      <h5 className='text-end'>₹ {tp}</h5>
                    </div>
                    <div className='d-flex justify-content-between' style={{borderBottom:'1px dashed #ddd'}}>
                      <p style={{fontSize:18}}>Discount (10%)</p>
                      <p style={{fontSize:18}}>- ₹ {discount}</p>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between pb-2'>
                    <h5>Total Amount</h5>
                    <h5 className='text-end'>₹ {famt}</h5>
                  </div><hr style={{marginTop:0}}/>
                  <p className='text-success fw-semibold' style={{fontSize:17}}>You will save ₹ {save} on this order</p>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Cart