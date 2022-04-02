import React from "react";

// components

import CardProduct from "components/Cards/CardProduct.js";

export default function Products() {
    return (
        <>
            <div className="flex flex-wrap mt-4" style={{'margin' :'-4%'}}>
                <div className="mb-12 px-4">
                    <CardProduct />
                </div>
            </div>
        </>
    );
}