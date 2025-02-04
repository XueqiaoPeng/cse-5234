import {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {history} from 'umi';

export default function Purchase() {
  let items: { [index: string]: number; } = {};

  const [productDetail, setName] = useState([]);

  useEffect(()=>{
    getProductDetails().then(r => console.log('Retrieved the inventory from API'))
  }, [])

  const getProductDetails = async () => {
    const response = await fetch('http://localhost:3000/inventory-management/inventory/')

    setName(await response.json())
  }

  const onSubmit = () => {

    console.log(items)
    history.push('/purchase/confirmOrder');

  }

  return (
    <Container>
      <Row className={"justify-content-md-center mt-5"}>
        <Col lg="1"></Col>
        <Col lg="10">
          <h1>Select Your Order</h1>
        </Col>
        <Col lg="1"></Col>
      </Row>

      <Row className={"justify-content-md-center mt-3"}>
        <Col lg="1"></Col>
        <Col lg="10">
          <Form method="GET" id="my_form">
            <Table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Disc</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
              </thead>
              {productDetail.map((_, index) => {
                return (
                  <tbody key={index}>
                  <tr>
                    <td>{productDetail[index]['name']}</td>
                    <td>{productDetail[index]['description']}</td>
                    <td>{"$" + productDetail[index]['price']}</td>
                    <td>
                      <select name={"item_" + index} className={"form-control"} form="my_form" onChange={(e) => {
                        items[productDetail[index]['name']] = Number(e.target.value)
                      }}>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </td>
                  </tr>
                  </tbody>
                )
              })}
            </Table>
          </Form>
        </Col>
        <Col lg="1"></Col>
      </Row>
      <Row>
        <Col lg="1"></Col>
        <Col lg="10" className={"d-grid gap-2"}>
          <Button variant="primary" onClick={onSubmit}>
            Confirm Order
          </Button>
        </Col>
        <Col lg="1"></Col>
      </Row>
    </Container>
  );
}
  