import { Grid, Paper, Typography } from '@mui/material';

export default function StatsSection({ stats }) {
  return (
    <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={4} key={stat.label} sx={{ display: 'flex', justifyContent: 'center'}}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center', borderTop: `4px solid ${stat.color}`,  minWidth: 100 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stat.count}</Typography>
            <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
