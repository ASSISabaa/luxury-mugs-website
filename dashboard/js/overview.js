// dashboard/js/overview.js

async function fetchOverview() {
    try {
      const productsRes = await fetch('/api/products');
      const ordersRes = await fetch('/api/orders');
  
      const products = await productsRes.json();
      const orders = await ordersRes.json();
  
      // total products
      document.getElementById('total-products').textContent = products.length;
  
      // total orders
      document.getElementById('total-orders').textContent = orders.length;
  
      // mugs sold & revenue
      let totalSold = 0;
      let totalRevenue = 0;
      products.forEach(product => {
        totalSold += product.quantitySold || 0;
        totalRevenue += (product.quantitySold || 0) * product.price;
      });
  
      document.getElementById('mugs-sold').textContent = totalSold;
      document.getElementById('total-revenue').textContent = `$${totalRevenue.toFixed(2)}`;
  
      // sales chart (dummy data for now)
      const ctx = document.getElementById('salesChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Sales',
            data: [5, 10, 4, 8, 15, 6, 11],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3b82f6',
            borderWidth: 2,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
  
    } catch (err) {
      console.error('Error loading overview:', err);
    }
  }
  
  window.onload = fetchOverview;
  