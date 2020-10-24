import React from 'react';
import './App.css';
interface IProps {
  category: any
}
class ProductCategoryRow extends React.Component<IProps> {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan={2}>
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component<any> {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component<any> {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}
const myContext = React.createContext("dada")
class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
        <myContext.Provider value={this.state}>{this.props.children}</myContext.Provider>
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  static contextType = myContext


  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    let value = this.context
    console.log(value)
    return (
      <div style={{ height: '50vh',border:'1px solid red' }} onMouseMove={this.handleMouseMove}>
        <h1>移动鼠标!</h1>
        <p>当前的鼠标位置是 ({this.state.x}, {this.state.y})</p>
        <p>{123123}</p>
        <p>{value.filterText+"sadas"}</p> 
      </div>
    );
  }
}
const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
const FancyButton = React.forwardRef((props, ref11) => {
  const handleClick = () => { 
    console.log(ref11)
  }
  return(
  <button ref={ref} className="FancyButton" onClick={handleClick}>
    {props.children}
  </button>
)
});

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();

function App() {
  var arr = [23,1,2,32,12,53,110,23,53,23,12,55,87,12,1,23,12]
  const arr1 = arr.slice(0,arr.length-2).map((item,index)=>{
    const tmpArr = arr.slice(index,index+3)
    return tmpArr.reduce((pre,current)=>{
      return pre + current 
    })
  })
  var maxValue = Math.max(...arr.slice(0,arr.length-2).map((item,index)=>{
    const tmpArr = arr.slice(index,index+3)
    return tmpArr.reduce((pre,current)=>{
      return pre + current 
    })
  }))
  console.log(maxValue as any)
  return (
    <div>
      <FilterableProductTable products={PRODUCTS} >
         {false && console.log(<MouseTracker name={123}></MouseTracker>)}
         <MouseTracker name={123}></MouseTracker>
      </FilterableProductTable>,
      <FancyButton ref={ref}>Click me!</FancyButton>;
    </div>  
  );
}

export default App;
