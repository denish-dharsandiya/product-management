import axios from 'axios'
import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AddProduct = ({ history }) => {


    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const [price, setPrice] = useState(0)
    const [priceError, setPriceError] = useState('')
    const [description, setDescription] = useState('')
    const [published, setPublished] = useState(true)
    const [image, setImage] = useState('')
    const [imageError, setImageError] = useState('')

    const addProductHandler = async (e) => {

        e.preventDefault()
        if (validate()) {
        const formData = new FormData()
        formData.append('image', image)
        formData.append('title', title)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('published', published)

        await axios.post('/api/products/addProduct', formData)
        history.push('/')
        }
    
    }


    const validate = () => {
        if (!image) {
            setImageError('Image Field required');
            return false;
        }
        if(!title) {
            setTitleError("Product Name field is required")
            return false;
        }
        if (!price) {
            setPriceError("Price value must be grater than 1 or more")
            return false;
        }
        return true;
      }

    return (
        <>
            <Container className='mt-5 p-2'>
                <h1>Add Product</h1>
                <hr />

                <Form onSubmit={addProductHandler} method="POST" encType='multipart/form-data'>

                <Form.Group controlId="fileName" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        name='image'
                        onChange={(e) =>{
                            const image = e.target.files[0];
                            if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                                setImageError('Please select image JPG, PNG, GIF.');
                                return false;
                            }   
                            setImage(e.target.files[0])
                            setImageError('');
                            } 
                        }
                        size="lg" />
                        <span className="text-danger">{imageError}</span>
                </Form.Group>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            name="title"
                          />
                          <span className="text-danger">{titleError}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price ($)</Form.Label>
                        <Form.Control
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            name="price"
                             />
                             <span className="text-danger">{priceError}</span>
                    </Form.Group>

                  
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            as="textarea"
                            />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="publishedCheckedid">
                        <Form.Check
                            type="checkbox"
                            onChange={(e) => setPublished(e.target.checked)}
                            label="publish"
                           />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Add Product
                    </Button>
                    {' '}
                    <Link to={`/`}>
                        <Button>Cancel</Button>
                    </Link>
                </Form>
            </Container>
        </>
    )
}

export default AddProduct
