import React, { useCallback, useEffect, useRef, useState } from 'react';
import { InputItem, Button } from 'antd-mobile';
import { history } from 'umi';
import styles from './index.less';

interface SearchInputProps {
  queryList: Function;
}

const SearchInput: React.FC<SearchInputProps> = ({ queryList }) => {
  const inputRef = useRef<any>(null);
  const [input, setInput] = useState('');
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const val = input.trim();
    if (val === '') {
      queryList({ searchKey: val, pageNo: 0 });
    }
    setSearchMode(val !== '');
  }, [input]);

  const inputChange = useCallback((val: string) => {
    setInput(val);
  }, []);

  const handle = useCallback(() => {
    if (searchMode) {
      const val = input.trim();
      queryList({ searchKey: val, pageNo: 0 });
    } else {
      history.push('/');
    }
  }, [searchMode, input]);

  return (
    <div className={styles.main}>
      <InputItem
        ref={inputRef}
        value={input}
        onChange={inputChange}
        clear
        className={styles.searchBar}
      />
      <Button type="primary" onClick={handle} className={styles.btn}>
        {searchMode ? '搜索' : '取消'}
      </Button>
    </div>
  );
};

export default SearchInput;
