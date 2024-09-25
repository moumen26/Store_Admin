import React from "react";

export default function ProductCard({
  productName,
  productQuantity = '',
  productPrice = '',
  productImage,
  onClick,
  selected,
}) {
  return (
    <div
      className={`productCard ${selected ? "selected" : ""}`} 
      onClick={onClick}
    >
      <div className="productImage">
        <img 
          srcSet={productImage}
          src={productImage} 
          alt={productName} 
          loading="lazy"
        />
      </div>
      <div className="productName flex-col space-y-1">
        <span className="productSpan">{productName}</span>
        {productQuantity &&
          <span className="productSpan">{productQuantity} unity</span>
        }
        {productPrice &&
            <span className="productSpan">{productPrice} DA</span>
        }
      </div>
    </div>
  );
}
