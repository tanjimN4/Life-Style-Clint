import React, { useContext, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../provider/AuthProvider';

const useMyItemPagintion = () => {
    const axiospublic=useAxiosPublic()
    const [page,setPage]=useState(1)
    const {user}=useContext(AuthContext)
    const itemsPerPage=9


    const {data:products=[],isLoading}=useQuery({
        queryKey:['products'],
        queryFn: async () => {
            const response = await axiospublic.get(`/add/item`)
            return response.data.filter(item => item.email === user.email);
        }
    })
    const currentProducts = Array.isArray(products) ? 
    products.slice((page - 1) * itemsPerPage, page * itemsPerPage) : []

    return {currentProducts,isLoading,page,setPage, totalProducts: products.length,itemsPerPage}
};

export default useMyItemPagintion;