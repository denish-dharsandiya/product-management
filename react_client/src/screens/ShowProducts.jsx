import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Container, Button} from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const ShowProducts = () => {
    const columns = [
        {
            name: 'Product Name',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'CreatedAt',
            selector: row => new Date(row.createdAt).toLocaleDateString(),
            sortable: true,
        },
        {
            name:"Actions",
            button: true,
            cell: (row) => (
                <>
                <Link to={`/product/edit/${row.id}`}>
                    <Button>Edit</Button>
                </Link>
                <Button className="btn btn-danger m-2" onClick={() => handleDelete(row.id)}>Delete</Button> 
            </>
            ),
        }

    ]
    const [startDate,setStartDate] = useState(new Date());
    const [endDate,setEndDate] = useState(new Date());
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    useEffect(() => {
        const getProductsData = async () => {
            const { data } = await axios.get('/api/products/allProducts')
            setProducts(data)
            setAllProducts(data)
        }
        getProductsData()
    }, [])

    const handleFilter = async(event) => {
        const { data } = await axios.get('/api/products/allProducts')
        console.log(data)
        const newData = data.filter(row => {
            return row.title.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setProducts(newData);
        setAllProducts(newData)
    }

    // handling Delete
    const handleDelete = async (id) => {
       await axios.delete(`/api/products/${id}`)
       window.location.reload();
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    }

    const handleSelect = (date) => {
        let filtered = allProducts.filter((product)=>{
            let productDate = new Date(product["createdAt"])
            return (
                productDate >= date.selection.startDate && productDate <= date.selection.endDate
            )
        })
        console.log(date)
        setStartDate(date.selection.startDate)
        setEndDate(date.selection.endDate)
        setProducts(filtered)
    }

    return (
        <>
           <Container  className="justify-content-center p-2">
               <h1 className='text-center'>Show All Products</h1>
               <hr />
               <Link to={`/addProduct`}>
                    <Button>Add Product</Button>
                </Link>
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                />
               <div className='text-end'><input type="text" onChange={handleFilter} /></div>
                <DataTable
                    columns={columns}
                    data={products}
                    fixedHeader
                    pagination
                ></DataTable>
           </Container>

           
        </>
    )
}

export default ShowProducts
