import React, { Component } from 'react';
import { connect, history } from 'umi';
import { CartProductType } from '@/@types/Product';
import { ConnectProps, ConnectState } from '@/models/connect';
import { query } from '@/services/cart';
import List, { UpdateProductType } from './List';
import { editCart } from '@/services/editCart';
import PayBar from './PayBar';

interface CartState {
  data: CartProductType[];
}

class CartPage extends Component<ConnectProps, CartState> {
  state: CartState = { data: [] };

  componentDidMount() {
    query().then((res) => {
      this.setState({ data: res.list.data });
    });
  }

  updateProduct = (newState: UpdateProductType) => {
    const { id, index, count, checked } = newState;
    let data = [...this.state.data];
    if (count === 0) {
      data.splice(index, 1);
    } else {
      Object.assign(data[index], newState);
    }

    editCart({ id, count }).then((res) => {
      this.setState({ data });
    });
  };

  checkedAllChange = (allChecked: boolean) => {
    let data = [...this.state.data];
    data.every((item) => (item.checked = allChecked));
    this.setState({ data });
  };

  goPay = () => {
    const { data } = this.state;
    const checkedData = data.filter((item) => item.checked);
    this.props.dispatch({
      type: 'cart/saveCart',
      payload: { data: checkedData },
    });
    history.push('/confirmBill');
  };

  render() {
    const { data } = this.state;
    return (
      <>
        <List data={data} updateProduct={this.updateProduct} />
        <PayBar
          data={data}
          checkedAllChange={this.checkedAllChange}
          goPay={this.goPay}
        />
      </>
    );
  }
}

export default connect(({ cart }: ConnectState) => ({ cart }))(CartPage);
