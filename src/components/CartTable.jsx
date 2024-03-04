import React from 'react';

//display cart items
// render the cart items in a table
function CartTable({ cart, products }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(cart).map(([id, quantity]) => {
                    const product = products.find(product => product.id === id);
                    return (
                        <tr key={id}>
                            <td>{product.name}</td>
                            <td>{quantity}</td>
                            <td>{product.price * quantity}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default CartTable;