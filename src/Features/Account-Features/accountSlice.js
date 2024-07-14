// import { createSlice } from "@reduxjs/toolkit";
// const initialState={
//     balance:0,
//     loan:0,
//     loanPurpose:"",
//     isLoading:false,
// };
// const accountSlice=createSlice({
// name:"account",
// initialState,
// reducers:{
//     deposit(state,action){
//         state.balance+=action.payload;
//     },
//     withdraw(state,action){
//         state.balance-=action.payload;
//     },
//     requestLoan(state,action){
//         if(state.loan>0) return;
//         state.loan=action.payload.amount;
//         state.loanPurpose=action.payload.loanPurpose;
//         state.balance=state.balance+action.payload.amount;
//     },
//     payLoan(state,action){
//         state.loan=0;
//         state.loanPurpose="";
//         state.balance-=state.loan;
//     },
//    },
// });
// console.log(accountSlice);
// export const{deposit,withdraw,requestLoan,payLoan}=accountSlice.actions;
// export default accountSlice.reducer;

const initialAccountState={
        balance:0,
        loan:0,
        loanPurpose:"",
        isLoading:false,
    };
export default function accountReducer(state=initialAccountState, action){
    switch(action.type){
        case "account/deposit":
            return{...state, balance:state.balance+action.payload, isLoading:false};
        case "account/withdraw":
            return {...state, balance:state.balance-action.payload};
        case "account/requestLoan":
            if(state.loan>0) return;
            return {...state, 
                loan:action.payload.amount,
                balance:state.balance+action.payload.amount,
            loanPurpose:action.payload.purpose};
        case "account/payLoan":
            return {...state, balance:state.balance-state.loan,loan:0,loanPurpose:""};
        case "account/isLoading":
            return {...state,isLoading:true};
        default:
             return state;
    }
}



export function deposit(amount,currency){
  if(currency==="USD")  return{type:"account/deposit",payload:amount};
  return async function(dispatch,getState){
    dispatch({type:"account/convertingCurrency"});
    const res=await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
    const data=await res.json();
    const converted=data.rates.USD;
    dispatch({type:"account/deposit",payload:converted});
  };
}
export function withdraw(amount){
    return{type:"account/withdraw",payload:amount};
}
export function requestLoan(amount,purpose){
    return{type:"account/requestLoan",
        payload:{amount,purpose},
    };
}
export function payLoan(){
    return{
        type:"account/payLoan",
    };
}