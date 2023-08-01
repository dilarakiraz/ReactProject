import { Container, Row, Col } from 'reactstrap';
import CategoryList from './CategoryList';
import Navi from './Navi';
import ProductList from './ProductList';
import React, { Component } from 'react'
import alertify from "alertifyjs"
import NotFound from "./NotFound"
import { Route, Switch } from 'react-router-dom';
import CartList from "./CartList"
import FormDemo1 from './FormDemo1';
import FormDemo2 from './FormDemo2';


export default class App extends Component {

  state = { currentCategory: "", products: [], cart: [] }


  componentDidMount() { //compenent yerleşti
    this.getProducts();
  }

  changeCategory = category => { //error function
    this.setState({ currentCategory: category.categoryName });
    //console.log(category);
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {

    let url = "http://localhost:3000/products"
    if (categoryId) {//seoUrl gönderilmişse
      url += "?categoryId=" + categoryId; //url sonuna bir / bir de gönderilen seoUrli ekle
    }
    fetch(url) //fetch ile apinin adresi alınır
      .then(response => response.json()) //gelen responseu jsona döüştürür
      .then(data => this.setState({ products: data })); //categories statei değiştrildi ve categories değeri data yapıldı.

  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1
    } else {
      newCart.push({ product: product, quantity: 1 }); //gönderilen elemanı 1 adediyle arraye ekler

    }

    this.setState({ cart: newCart }); //state i set etti
    alertify.success(product.productName + " added to cart!", 2);

  }

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id) //sepetteki her bir elemanın id si,parametre ile gönderilen productın idsi ise filtrele
    this.setState({ cart: newCart }) //state değiştiği anda o statei kullanan her şey güncellenir
    alertify.error(product.productName + ' Removed From Cart', 2);
  }

  render() {
    let productInfo = { title: "ProductList -" }
    let categoryInfo = { title: "CategoryList" }
    return (
      <div >
        <Container>

          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />


          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo} />
            </Col>
            <Col xs="9">

              <Switch>
                <Route exact path='/' render={props => (
                  <ProductList
                  {...props}
                    products={this.state.products}
                    addToCart={this.addToCart}
                    currentCategory={this.state.currentCategory}
                    info={productInfo}

                  />
                )} />
                <Route exact path='/cart' component={props=>(
                  <CartList
                  {...props}
                  cart={this.state.cart}
                  removeFromCart={this.removeFromCart}></CartList>
                )} />
                <Route path="/form1" component={FormDemo1}></Route>
                <Route path="/form2" component={FormDemo2}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
