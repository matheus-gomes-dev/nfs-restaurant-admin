import { Card, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface VisualizationChartProps {
  title: string;
  children: ReactNode;
}

export default function VisualizationChart({ title, children }: VisualizationChartProps) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}