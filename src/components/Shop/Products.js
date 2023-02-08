import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const DUMMY_PRICE = [{
    id: 'p1',
    price: 6,
    title: 'My First Book',
    description: 'first time wrote book'
  }, {
    id: 'p2',
    price: 12,
    title: 'My Secound Book',
    description: 'best book I ever wrote'
  }]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRICE.map(product => <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />)}

      </ul>
    </section>
  );
};

export default Products;
