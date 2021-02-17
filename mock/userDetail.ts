var Mock = require('mockjs');
import { Request, Response } from 'express';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  'GET /api/getUserDetail': {
    status: 1,
    id: '001',
    name: 'Gray',
    icon: 'https://tva1.sinaimg.cn/large/00831rSTly1gdm7eok2oij301s01sgli.jpg',
    email: 'gray@126.com',
    signature: 'hello world',
    title: '买买买',
    tags: [
      {
        key: '0',
        label: '买',
      },
      {
        key: '1',
        label: '再买',
      },
      {
        key: '2',
        label: '接着买~',
      },
    ],
    country: 'China',
    address: '上海',
    phone: '0110-20204123',
  },
};
