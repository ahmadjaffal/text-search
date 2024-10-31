import React from 'react';

const ProductList = ({ products, searchTerm }) => {

    // Filter products based on search term in title or description
    const filteredProducts = products.filter(product =>
        (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Highlight search term in the title or the description
    const highlightText = (text) => {
        if (!searchTerm) return text;
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: '#F9DC5C' }}>{part}</span>
            ) : (
                part
            )
        );
    };

    return (
        <>
            {filteredProducts.length > 0 ? <p><b>{filteredProducts.length} products</b> were found.</p> : null}
            <ul>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <li key={product.id}>
                            <h2>{highlightText(product.title)}</h2>
                            <p>{highlightText(product.description)}</p>
                            <p>Price: <b>${product.price}</b></p>
                            {product.tags ?
                                <div className="products-tags">
                                    {product.tags.map(tag => (
                                        <span>{tag}</span>
                                    ))}
                                </div>
                                : null}
                        </li>
                    ))
                ) : (
                    <li><b>No products</b> found.</li>
                )}
            </ul>
        </>
    );
};

export default ProductList;