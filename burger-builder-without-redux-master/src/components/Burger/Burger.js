import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map((ingKey) => {            
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
            return <BurgerIngredients key={ingKey + i} type={ingKey} />
        });
        // Flattern the array
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);   
    
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>You currently do not have ingredients.</p>
    }    

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
};

export default burger;