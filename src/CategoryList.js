import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CategoryList extends Component {
    state = {
        categories: []            
    };

componentDidMount(){ //compenent yerleşti
    this.getCategories();
}

    getCategories = ()=>{
        fetch("http://localhost:3000/categories") //fetch ile apinin adresi alınır
        .then(response=>response.json()) //gelen responseu jsona döüştürür
        .then(data=>this.setState({categories:data})); //categories statei değiştrildi ve categories değeri data yapıldı.

    }

    render() {
        return (
            <div>
                <h3>{this.props.info.title}</h3> 
               
                <ListGroup>
                    {this.state.categories.map(category => ( //mapler array functiondur
                        <ListGroupItem  active={category.categoryName===this.props.currentCategory?true:false}
                        onClick={() => this.props.changeCategory(category)} 
                        key={category.id}>
                        
                        {category.categoryName}
                        </ListGroupItem>
                    ))}
                </ListGroup>
                {/* <h4>{this.props.currentCategory}</h4> */} 
            </div>
        )
    }
}
