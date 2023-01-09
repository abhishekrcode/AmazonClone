export const initialState = {
    basket:[], 
    user:null
};

//Selector
export const getBasketTotal = (basket) =>{
    return (
    basket.reduce((amount, item) =>  item.price + amount, 0) //0 is initial valur of amount
    )
}

const reducer = (state, action) => {
    // console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket:[...state.basket,action.item],
            };
        
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        
        case "REMOVE_FROM_BASKET":
            // return {
            //     ...state,
            //     basket:state.basket.filter(item => item.id!== action.id)
            // } --> esse kya hoga ki ek he id ke jitne bhi item checkout list mai hunge sab remove ho jaayega lekin hume wo nehi chahiye so for this we have to use index to remove the item from checkout list.
            
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            let newBasket = [...state.basket];

            if(index >= 0){
                newBasket.splice(index,1);
            }else {
                console.warn(`Cant remove product (id: ${action.id}) as its not in basket!`
                )
            }

            return {
                ...state,
                basket: newBasket

            }

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

          default:
            return state;  
    }
};

export default reducer;