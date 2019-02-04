import React, { Component } from 'react';
class CardHeader extends React.Component {
  render() {
    const { image } = this.props;
    var style = { 
        backgroundImage: 'url(' + image + ')',
    };
    return (
      <header style={style} id={image} className="card-header">
        <h4 className="card-header--title">Free-shipping</h4>
      </header>
    )
  }
}

class Button extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <button className="button button-primary"
              onClick={()=>this.props.addToCart(this.props.product.id)}>
        Add to cart
      </button>
    )
  }
}

class CardBody extends React.Component {
  render() {
    return (
      <div className="card-body">
        
        <h2>{this.props.title}</h2>
        
        <p className="body-content">{this.props.price}</p>
        <p className="body-content">{this.props.mprice}</p>
        <Button addToCart={this.props.addToCart}
                product={this.props.product}/>
      </div>
    )
  }
}

class ItemTable extends React.Component {
  render() {
    const product = this.props.product;
    return (
      <article className="card">
        <CardHeader image={'https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/master/src/static/products/' + this.props.product.sku.toString() +'_1.jpg' }/>
        <CardBody title={product.title} price={product.currencyFormat+product.price} mprice={'or '+ product.installments + ' x ' + product.price/product.installments}
                  addToCart={this.props.addToCart}
                  product={product}/>
      </article>
    )
  }
}

class ProductTable extends React.Component {
  render() {
    const items = [];
    let lastCategory = null;
    
    this.props.products.forEach((product) => {
      items.push(
        <ItemTable
          key={product.id}
          product={product}
          addToCart={this.props.addToCart} />
      );
    });

    return (
      <table>
        <tbody>{items}</tbody>
      </table>
    );
  }
}

export default ProductTable;