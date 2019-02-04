import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "react-sidebar";
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import PersistentDrawerRight from './PersistentDrawerRight.js';
import ProductTable from './ProductTable.js';
import ChipArray from './ChipArray.js';


class ItemEntry extends React.Component{
  render(){
    const product = this.props.product;
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={'https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/master/src/static/products/' + product.sku.toString() +'_1.jpg'} />
        </ListItemAvatar>
        <ListItemText
          primary={product.title}
          secondary={product.price}
        />
      </ListItem>
    );
  }
}

class ShoppingCartTable extends React.Component{
  render(){
    const items = [];
    if(this.props.selected){
      Object.keys(this.props.selected).forEach((product)=>{
        items.push(<ItemEntry key={product.key} product={product} />);
      } );
    }
    // this.props.products.forEach((product) => {
    //   items.push(
    //     <ItemEntry product={product} />);
    // });
    return (
      <List subheader={<ListSubheader component="div">Shopping Cart</ListSubheader>}>
        {items}
      </List>    
   );

  }
}

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartOpen: false
    };
 
    this.onSetCartOpen = this.onSetCartOpen.bind(this);
  }

  onSetCartOpen(open) {
    this.setState({ cartOpen: open });
  }
 
 
  render() {
    return (
      <Sidebar
        sidebar={<ShoppingCartTable products={this.props.products}/>}
        open={this.state.cartOpen}
        onSetOpen={this.onSetCartOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        <button onClick={() => this.onSetCartOpen(true)}>
          Shopping Cart
        </button>
      </Sidebar>
    );
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      selected:{},
      chipData: {
        'XS': false,
        'S': false,
        'M': false,
        'ML': false,
        'L': false,
        'XL': false,
        'XXL' : false
      }
    };
    // this.addToCart = this.addToCart.bind(this);
  }

  applyFilter = () => {
    const products = this.state.data.filter( product =>
      product.availableSizes.some( size => this.state.chipData[size])
    );
    return products.length>0 ? products : this.state.data;
  }

  onClickChip = id => {
    let statecopy = Object.assign({}, this.state);
    statecopy.chipData[id] = !statecopy.chipData[id];
    this.setState(statecopy);
  }

  addToCart = (id, size) => {
    let statecopy = Object.assign({}, this.state);
    if (id in this.state.selected){
      if (size in statecopy.selected[id]){
        statecopy.selected[id][size] += 1;
      }
      else{
        statecopy.selected[id][size] = 1;
      }
    }
    else{
      statecopy.selected[id] = {};
      statecopy.selected[id][size] = 1;
    }
    this.setState(statecopy);
  }

  deleteSize = (id, size) => {
    if (id in this.state.selected){
      if (size in this.state.selected[id]){
        let statecopy = Object.assign({}, this.state);
        delete statecopy.selected[id][size];
        this.setState(statecopy);
      }
    }
  }  

  deleteInCart = id => {
    if (id in this.state.selected){
      let statecopy = Object.assign({}, this.state);
      delete statecopy.selected[id];
      this.setState(statecopy);
    }
  }

  render() {
    if (this.state.data){
      const dt = this.applyFilter();
      return (
        <div>
        <PersistentDrawerRight products={this.state.data} selected={this.state.selected} del={this.deleteInCart} delSize={this.deleteSize}/>
        <ChipArray chipData={this.state.chipData} onClickChip={this.onClickChip}/>
        <div style={{margin: '80px auto'}}>
        <ProductTable products={dt} addToCart={this.addToCart}/>
        </div>
        </div>
      );
    }
    else{
      return <p>Loading ...</p>;
    }
  }
  componentDidMount() {
    import('./products.json').then(json => {
      this.setState({ data : json.products });
    })
    
  }
}

export default App;
