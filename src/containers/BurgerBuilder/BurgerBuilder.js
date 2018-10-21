import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

import * as burgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends Component {

    state = {
        purchasingMode: false,
    }


    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => sum + el, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({ purchasingMode: true })
        } else {
            this.props.onSetAuthRedirect("/checkout")
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasingMode: false });
    }

    purchaseContinueHandler = () => {
        //alert("You continued!");
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout'
        });

    }

    render() {

        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;

        let burgerAndBuildControls = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />
        if (this.props.ings) {
            burgerAndBuildControls = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disableInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler}
                />
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasingMode}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerAndBuildControls}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated:state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirect: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }

}

// IF wrapping a hoc, the hoc must distribute props to
// wrapped component. 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));