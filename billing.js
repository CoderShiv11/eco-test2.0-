document.getElementById('billing-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Order placed successfully!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
  });