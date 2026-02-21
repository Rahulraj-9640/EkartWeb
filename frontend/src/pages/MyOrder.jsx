import OrderCard from '@/components/OrderCard'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MyOrder = () => {
    const [userOrder, setUserOrder] = useState(null)

    const getUserOrders = async () => {
        const accessToken = localStorage.getItem("accessToken")
        const backendURL = import.meta.env.VITE_URL || 'http://localhost:8000'
        const res = await axios.get(`${backendURL}/api/v1/orders/myorder`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (res.data.success) {
            setUserOrder(res.data.orders)
        }
    }

    useEffect(() => {
        getUserOrders()
    }, [])

    return (
        <>
            <OrderCard userOrder={userOrder}/>
        </>
    )
}

export default MyOrder
