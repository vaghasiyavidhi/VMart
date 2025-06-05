import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { addToCart } from '../Slice/cartSlice';
import { useDispatch } from 'react-redux';
import { IoMdHeartEmpty } from "react-icons/io";

function Shop() {

    const [products, setProducts]=useState([])
    const [list, setAllList]=useState([])
    const [cat, setCat]=useState('all')
    const [search, setSearch]=useState('')
    const [page, setPage]=useState(1)
    const itemsPage = 35
    const [total, setTotal]=useState(0)
    const [sortBy, setSortBy]=useState('')
    const [order, setOrder]=useState('')
    const dispatch = useDispatch()

    useEffect(()=>{
        getAll()
        getCat()
        pageData(1)
    }, [])

    const getAll = () =>{
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((data)=>{
            setProducts(data.products)
        });
    }

    const getCat = () =>{
        fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then((data)=>{
            setAllList(data)
        });
    }

    const handleCat = (c) =>{
        setCat(c)
        if(c === 'all')
        {
            getAll()
        }
        else {
            fetch(`https://dummyjson.com/products/category/${c.name}`)
            .then(res => res.json())
            .then((data)=>{
                setProducts(data.products)
            });
        }
    }

    const handleSearch = (value) =>{
        setSearch(value)
        if(search.trim() === ''){
            getAll()
        }
        else{
            fetch(`https://dummyjson.com/products/search?q=${value}`)
            .then(res => res.json())
            .then((data)=>{
                setProducts(data.products)
            })
        }
    }

    // const pageData = (page) =>{
    //     const skip = (page - 1) * itemsPage

    //     fetch(`https://dummyjson.com/products?limit=${itemsPage}&skip=${skip}`)
    //     .then(res => res.json())
    //     .then((data)=>{
    //         setProducts(data.products)
    //         setTotal(data.total)
    //         setPage(page)
    //     })
    // }

    const pageData = (page, sortField = sortBy, sortOrder = order) =>{
        const skip = (page - 1) * itemsPage
        let url = `https://dummyjson.com/products?limit=${itemsPage}&skip=${skip}`

        if(sortField && sortOrder){
            url += `&sortBy=${sortField}&order=${sortOrder}`
        }
        fetch(url)
            .then(res => res.json())
            .then((data)=>{
                setProducts(data.products)
                setTotal(data.total)
                setPage(page)
            })
    }

    const totalPage = Math.ceil(total / itemsPage)

    const handleSort = (sortField, sortOrder) => {
        setSortBy(sortField)
        setOrder(sortOrder)
        pageData(1, sortField, sortOrder)
    }

    // const lastItem = page * itemsPage
    // const firstItem = lastItem - itemsPage
    // const filterPro = products.slice(firstItem, lastItem)
    // const totalPage = Math.ceil(products.length / itemsPage)

  return (
   <>
        <div>
        <Container fluid style={{marginTop:80}}>
            <Row>
                <Col xs={12} md={3}>
                    <div style={{paddingLeft:20, paddingTop:30, overflowY:'auto', backgroundColor: '#E7E9EB', position:'fixed', width:'260px', height:'85vh', borderRight:'1px solid #ccc', zIndex:100}}>
                        <h4 style={{marginBottom:10}}>Categories</h4>
                        <div>
                            <div onClick={()=>handleCat('all')} style={{fontWeight:cat === 'all' ? 'bold' : 'normal', cursor:'pointer', marginTop:20}}>All</div>
                            <div>
                                {
                                    list.map((c, i)=>{
                                        return(
                                            <div key={i}>
                                                <div onClick={()=>handleCat(c)} style={{padding:'10px 0px', fontWeight:cat === c ? 'bold' : 'normal', cursor:'pointer'}}>{c.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={9}>
                    <div style={{display:'flex', justifyContent:'center', marginTop:25}}>
                        <input type="search" placeholder="Search..." value={search} onChange={(e)=>{handleSearch(e.target.value)}} style={{width:600, height:40, border:'2px solid black', outlineOffset:0, borderRadius:6, paddingLeft:10, marginBottom:15, textTransform:'capitalize'}} />
                        <Dropdown style={{marginLeft:40}}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Sort Products
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>{handleSort('price','asc')}}>Price : Low to High</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{handleSort('price','desc')}}>Price : High to Low</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{handleSort('title','asc')}}>Title : A-Z</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{handleSort('title','desc')}}>Title : Z-A</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Row style={{display:'flex', flexWrap:'wrap'}}>
                        {
                            products.length > 0 ? (
                                products.map((pro, i)=>{
                                    return(
                                        <Col key={i} xs={12} sm={6} md={5} lg={3}>
                                            <Card style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop:15, marginBottom:15}}>
                                                <div style={{display:'flex', justifyContent:'end', padding:'10px 10px 0px 0px'}}>
                                                    <IoMdHeartEmpty style={{fontSize:20}} />
                                                </div>
                                                <Link to={`product/${pro.id}`}><Card.Img className='stretched-link' variant="top" src={pro.thumbnail} alt={pro.title} /></Link><hr style={{marginBottom:0, marginTop:0}}/>
                                                <Card.Body>
                                                    <Link to={`product/${pro.id}`} style={{textDecoration:'none', color:'gray'}}>{pro.brand}</Link>
                                                    <Card.Title style={{marginTop:10}}>{pro.title}</Card.Title>
                                                    <Card.Text style={{display:'flex', alignItems:'center'}}>₹ {pro.price}</Card.Text>
                                                    <Link to={`product/${pro.id}`}><Button variant='dark' style={{width:80}}>View</Button></Link>
                                                    <Link to={'/cart'}><Button onClick={()=>dispatch(addToCart(pro))} variant="dark" style={{width:80, marginLeft:'6%'}}>Add</Button></Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })
                            ) : (<h5 style={{margin:'auto', marginTop:'30%'}}>No Products Available.</h5>)
                        }

                        <nav>
                            <ul className='pagination justify-content-center'> 
                                <li className={`page-item ${page === 1 && 'disabled'}`}>
                                    <button className='page-link' onClick={()=>{setPage(prev => Math.max(prev - 1, 1))}}>&laquo;</button>
                                </li>
                                {[...Array(totalPage)].map((_, i)=>{
                                    return(
                                        <li key={i} className={`page-item ${page === i + 1 && 'active'}`}>
                                            <button className='page-link' onClick={()=>{pageData(i + 1)}}>{i + 1}</button>
                                        </li>
                                    )
                                })}
                                <li className={`page-item ${page === totalPage && 'disabled'}`}>
                                    <button className='page-link' onClick={()=>{setPage(prev => Math.min(prev + 1, totalPage))}}>&raquo;</button>
                                </li>
                            </ul>
                        </nav>
                    </Row>
                </Col>
            </Row>
        </Container>
        </div>
   </>
  )
}

export default Shop