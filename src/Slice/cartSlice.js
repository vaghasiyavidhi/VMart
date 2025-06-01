import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:0,
    price:0,
    gst:0,
    tamt:0,
    dis:0,
    pamt:0,
    s:0,
    // qty:1,
    pro: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state, actions)=>{
            const exist = state.pro.find((item)=>item.id === actions.payload.id)
            if(exist){
                exist.qty += 1
            }
            else{
                const newPro = {...actions.payload, qty:1}
                state.pro.push(newPro)
            }
            state.value += state.pro.length
            state.price += parseInt(actions.payload.price)
            state.gst = (0.18 * state.price).toFixed(2)
            state.tamt = parseInt(state.gst) + parseInt(state.price)
            state.dis = (0.1 * state.tamt).toFixed(2)
            state.pamt = (state.tamt - state.dis).toFixed(2)
            state.s = (state.price - state.dis).toFixed(2)
        },
        removeCart:(state, actions)=>{
            state.pro = state.pro.filter((item)=>item.id !== actions.payload.id)
            state.value = state.pro.reduce((total, item)=>total + item.qty, 0)
            if(state.pro.length === 0){
                state.price = 0
                state.gst = 0
                state.tamt = 0
                state.dis = 0
                state.pamt = 0
                state.s = 0
                return
            }
            state.price = state.pro.reduce((acc, item) => acc + item.price * item.qty, 0)
            state.gst = (0.18 * state.price).toFixed(2)
            state.tamt = parseInt(state.gst) + parseInt(state.price)
            state.dis = (0.1 * state.tamt).toFixed(2)
            state.pamt = (state.tamt - state.dis).toFixed(2)
            state.s = (state.price - state.dis).toFixed(2)
        }, 
        increament:(state, actions)=>{
            const product = state.pro.find((item)=>item.id === actions.payload.id)
            if(product){
                product.qty += 1
                state.value = state.pro.length
                state.price += parseInt(actions.payload.price)
                state.gst = (0.18 * state.price).toFixed(2)
                state.tamt = parseInt(state.gst) + parseInt(state.price)
                state.dis = (0.1 * state.tamt).toFixed(2)
                state.pamt = (state.tamt - state.dis).toFixed(2)
                state.s = (state.price - state.dis).toFixed(2)
            }
        },
        decreament:(state, actions)=>{
            const product = state.pro.find((item)=>item.id === actions.payload.id)
            if(product && product.qty > 1){
                product.qty -= 1
                state.value = state.pro.length
                state.price -= parseInt(actions.payload.price)
                state.gst = (0.18 * state.price).toFixed(2)
                state.tamt = parseInt(state.gst) + parseInt(state.price)
                state.dis = (0.1 * state.tamt).toFixed(2)
                state.pamt = (state.tamt - state.dis).toFixed(2)
                state.s = (state.price - state.dis).toFixed(2)
            }
        },

        // addToCart:(state, actions)=>{
        //     state.value += 1
        //     state.pro = [...state.pro, actions.payload]
        //     state.price += parseInt(actions.payload.price)
        //     state.gst = (0.18 * state.price).toFixed(2)
        //     state.tamt = parseInt(state.gst) + parseInt(state.price)
        //     state.dis = (0.1 * state.tamt).toFixed(2)
        //     state.pamt = (state.tamt - state.dis).toFixed(2)
        //     state.s = (state.price - state.pamt).toFixed(2)
        // },
        // removeCart:(state, actions)=>{
        //     state.value -= 1
        //     state.pro = state.pro.filter((i) => i.id !== actions.payload.id)
        //     state.price -= parseInt(actions.payload.price)
        //     state.gst = (0.18 * state.price).toFixed(2)
        //     state.tamt = parseInt(state.gst) + parseInt(state.price)
        //     state.dis = (0.1 * state.tamt).toFixed(2)
        //     state.pamt = (state.tamt - state.dis).toFixed(2)
        //     state.s = (state.price - state.pamt).toFixed(2)
        //  },
        // increament:(state, actions)=>{
        //     state.qty += 1
        //     state.price += parseInt(actions.payload.price)
        //     state.gst = (0.18 * state.price).toFixed(2)
        //     state.tamt = parseInt(state.gst) + parseInt(state.price)
        //     state.dis = (0.1 * state.tamt).toFixed(2)
        //     state.pamt = (state.tamt - state.dis).toFixed(2)
        //     state.s = (state.price - state.pamt).toFixed(2)
        // },
        // decreament:(state, actions)=>{
        //     state.qty -= 1
        //     state.price -= parseInt(actions.payload.price)
        //     state.gst = (0.18 * state.price).toFixed(2)
        //     state.tamt = parseInt(state.gst) + parseInt(state.price)
        //     state.dis = (0.1 * state.tamt).toFixed(2)
        //     state.pamt = (state.tamt - state.dis).toFixed(2)
        //     state.s = (state.price - state.pamt).toFixed(2)
        // },
    },
})

export const { addToCart, removeCart, increament, decreament } = cartSlice.actions

export default cartSlice.reducer