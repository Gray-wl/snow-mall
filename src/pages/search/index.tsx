import React, { Component } from 'react';
import { ProductType } from '@/@types/product';
import { PaginationType } from '@/@types/list';
import { query } from '@/services/search';
import SearchInput from './SearchInput';
import List from './List';

interface ListState {
  data: ProductType[];
  pagination: PaginationType;
}

export default class SearchPage extends Component<{}, ListState> {
  state: ListState = {
    data: [],
    pagination: {
      totalPage: 0,
      pageNo: 0,
      pageSize: 10,
      searchKey: '',
    },
  };

  queryList = (pagination?: PaginationType) => {
    // 查询列表
    let pageNo = this.state.pagination.pageNo;
    let pageSize = this.state.pagination.pageSize;
    let searchKey = this.state.pagination.searchKey;

    if (pagination) {
      if (pagination.pageNo !== undefined) {
        pageNo = pagination.pageNo;
      }
      if (typeof pagination.searchKey === 'string') {
        searchKey = pagination.searchKey;
      }
      pageSize = pagination.pageSize || pageSize;
    }
    query({
      pageNo,
      pageSize,
      searchKey,
    }).then((res) => {
      const { list } = res;
      this.saveState(list);
    });
  };

  saveState = (partialState: {
    data?: ProductType[];
    pagination: PaginationType;
  }) => {
    let data = [...this.state.data, ...(partialState.data || [])];
    const pagination = {
      ...this.state.pagination,
      ...partialState.pagination,
    };

    if (pagination.pageNo === 0) {
      data = partialState.data || [];
    }

    this.setState({ data, pagination });
  };

  render() {
    const { data, pagination } = this.state;

    return (
      <>
        <SearchInput queryList={this.queryList} />
        <List data={data} pagination={pagination} queryList={this.queryList} />
      </>
    );
  }
}
