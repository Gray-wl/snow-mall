import React, { useCallback } from 'react';
import { Link, connect, history } from 'umi';
import { Toast } from 'antd-mobile';
import classnames from 'classnames';
import { ProductType } from '@/@types/product';
import { ConnectProps } from '@/models/connect';
import { editCart } from '@/services/editCart';
import styles from './index.less';

interface CartAndBuyProps extends ConnectProps {
  product: ProductType;
}

const CartAndBuy: React.FC<CartAndBuyProps> = ({ product, dispatch }) => {
  const addToCart = useCallback(() => {
    editCart({ id: product.id, increment: 1 }).then(() => {
      Toast.success(product.title + '已加入购物车！');
    });
  }, [product]);

  const goPay = useCallback(() => {
    dispatch({
      type: 'cart/saveCart',
      payload: {
        data: [{ ...product, count: 1, checked: true, img: product.imgs[0] }],
      },
    });
    history.push('/confirmBill');
  }, [product]);

  return (
    <div className={styles.main}>
      <Link to="/cart" className={classnames(styles.cart)}>
        <span className="iconfont icon-3 font16" />
        <p className={styles.title}>购物车</p>
      </Link>
      <div
        className={classnames(styles.addCart, styles.btn)}
        onClick={addToCart}
      >
        加入购物车
      </div>
      <div className={classnames(styles.buyNow, styles.btn)} onClick={goPay}>
        立即购买
      </div>
    </div>
  );
};

export default connect()(CartAndBuy);
