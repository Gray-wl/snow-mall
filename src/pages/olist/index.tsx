import React, { Component } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import { query } from '@/services/olist';
import { CartProductType } from '@/@types/product';
import List from './List';

export interface OListState {
  data: CartProductType[];
}

class OListPage extends Component<{}, OListState> {
  state: OListState = {
    data: [],
  };

  componentDidMount() {
    query().then((res) => {
      this.setState({ data: res.list.data });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <List data={data} />
      </WingBlank>
    );
  }
}

export default OListPage;
