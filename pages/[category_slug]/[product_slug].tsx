import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

interface Product {
    id?: number,
    name?: string,
    get_absolute_url?: string,
    description?: string,
    price?: number,
    get_image?: string,
    get_thumbnail?: string
}

const Product_Detail = () => {

    const router = useRouter();
    const { category_slug, product_slug } = router.query;

    const [product, setProduct] = useState<Product>({});

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`http://localhost:8000/api/v1/products/${category_slug}/${product_slug}/`)
                const product: Product = await res.json();
                setProduct(product)
            } catch (err) {
                console.log(err)
            }
        }
        if (category_slug && product_slug) {
            fetchProduct();
        }

    }, [category_slug, product_slug]);


  return (
    <div className="min-w-screen min-h-screen bg-gray-300 flex items-center p-5 lg:p-10 overflow-hidden relative">
        <div className="w-full max-w-6xl rounded bg-gray-400 shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
            <div className="md:flex items-center -mx-10">
                <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                    <div className="relative">
                        <img src={product.get_image} className="w-full relative z-10" alt="" />
                        <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-10">
                    <div className="mb-10">
                        <h1 className="font-bold uppercase text-2xl mb-5">{product.name} <br /><span className="text-sm" >Waterproof Jacket</span></h1>
                        <p className="text-md"> {product.description} <a href="#" className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900"></a></p>
                    </div>
                    <div>
                        <div className="inline-block align-bottom mr-5">
                            <span className="text-2xl leading-none align-baseline">$</span>
                            <span className="font-bold text-3xl leading-none align-baseline">{product.price}</span>
                            <span className="text-xl leading-none align-baseline">.99</span>
                        </div>
                        <div className="inline-block align-bottom">
                            <button className="bg-gray-700 opacity-75 hover:opacity-100 text-white hover:text-white-900 rounded-full px-10 py-2 font-semibold"><i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Product_Detail