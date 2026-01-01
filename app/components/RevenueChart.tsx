'use client'

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Order } from '@/types/orders';

interface RevenueChartProps {
  orders: Order[];
}

export default function RevenueChart({ orders }: RevenueChartProps) {
  const completedOrders = orders.filter(order => order.status === 'completa');
  
  const categoryRevenue = completedOrders.reduce((acc, order) => {
    order.items.forEach(item => {
      const category = item.category;
      acc[category] = (acc[category] || 0) + item.price;
    });
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryRevenue).map(([category, revenue]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    y: revenue
  }));

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Faturamento',
      data: chartData
    }],
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: R$ {point.y:.2f}'
        }
      }
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}