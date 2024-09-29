import React, { useState } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


const usepagination = () => {
    const axiospublic=useAxiosPublic()
    const [page,setPage]=useState(1)
    const itemsPerPage=9


    const {data:products=[],isLoading}=useQuery({
        queryKey:['products'],
        queryFn: async () => {
            const response = await axiospublic.get(`/products`);
            return response.data ||[]
        }
    })
    const currentProducts = Array.isArray(products) ? 
    products.slice((page - 1) * itemsPerPage, page * itemsPerPage) : []

    return {currentProducts,isLoading,page,setPage, totalProducts: products.length,itemsPerPage}
};

export default usepagination;