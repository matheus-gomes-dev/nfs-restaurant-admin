'use client'

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Order } from '@/types/orders';

interface ProductRevenueChartProps {
  orders: Order[];
}

export default function ProductRevenueChart({ orders }: ProductRevenueChartProps) {
  const completedOrders = orders.filter(order => order.status === 'completa');
  
  const productRevenue = completedOrders.reduce((acc, order) => {
    order.items.forEach(item => {
      acc[item.name] = (acc[item.name] || 0) + item.price;
    });
    return acc;
  }, {} as Record<string, number>);

  const sortedProducts = Object.entries(productRevenue)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  const productNames = sortedProducts.map(([name]) => name);
  const data = sortedProducts.map(([, revenue]) => revenue);

  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: productNames,
      title: {
        text: 'Produtos'
      }
    },
    yAxis: {
      title: {
        text: 'Faturamento (R$)'
      }
    },
    series: [{
      name: 'Faturamento',
      data: data,
      color: '#27B14C'
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}