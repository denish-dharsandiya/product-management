import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'

const EditProduct = () => {

    const { id } = useParams()
    const history = useHistory()
    


    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const [price, setPrice] = useState(0)
    const [priceError, setPriceError] = useState('')
    const [description, setDescription] = useState('')
    const [published, setPublished] = useState(true)

    useEffect(() => {
        const getDataById = async () => {
            const {data} = await axios.get(`/api/products/${id}`)
            setTitle(data.title)
            setPrice(data.price)
            setDescription(data.description)
            setPublished(data.published)
        }

        getDataById()
    },[id])

   const updateHandler = async (e) => {

        e.preventDefault()
       
        // update by put request
        if (validate()) {
            const data = {
                title: title,
                price: price,
                description: description,
                published: published
            }

            await axios.put(`/api/products/${id}`, data)

            history.push('/')
        }

   }

   const validate = () => {
    let titleError = "";
    let priceError = ""
    if(!title) {
        titleError = "Product Name field is required";
        setTitleError(titleError)
        return false;
    }
    else if (!price) {
        priceError = "Price value must be grater than 1 or more";
        setPriceError(priceError)
        return false;
    }
    return true;
  }

    return (
        <>
            <Container className='mt-5 p-2'>
                <h1>Edit Product</h1>
                <hr />

                <Form onSubmit={updateHandler}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            name= "title"
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
                            value={published}
                            checked={published} 
                            onChange={(e) => setPublished(e.target.checked)}
                            label="publish"
                           />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Update Product
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

export default EditProduct
