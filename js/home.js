function initializing()
{
  if(!('cart' in localStorage))
  {
    localStorage['cart']=0;
  }
  if(!('cart_items' in localStorage))
  {
    localStorage['cart_items']=JSON.stringify({});
  }
  if(!('buy_items' in localStorage))
  {
    localStorage['buy_items']=JSON.stringify({});
  }
  document.getElementById('cart').getAttributeNode('value').value=localStorage['cart'];
}
