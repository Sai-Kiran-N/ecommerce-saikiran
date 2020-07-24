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
  if('item_view' in localStorage && localStorage['item_view']!='')
  {
    var data=localStorage['item_view'].split(',');
    var start_index=data[0].lastIndexOf('/');
    document.getElementById('image').src=data[0]+'.jpg';
    document.getElementById('name').innerHTML=data[0].substring(start_index+1);
    document.getElementById('price').innerHTML='Price : '+data[1];
  }
  else
  {
      location.replace('home.html');
  }
}


function add_to_cart()
{
  var data=localStorage['item_view'].split(',');
  var start_index=data[0].lastIndexOf('/');
  var value=confirm(data[0].substring(start_index+1)+' added to cart successfully'+'\n\nClick ok to confirm');
  if(value)
  {
    var items=parseInt(document.getElementById('items').getAttributeNode('value').value);
    var cart_items=JSON.parse(localStorage['cart_items']);
    var item=localStorage['item_view'];
    if(item in cart_items)
    {
      cart_items[item]+=items;
    }
    else
    {
        cart_items[item]=items;
    }
    localStorage['cart_items']=JSON.stringify(cart_items);
    localStorage['cart']=parseInt(localStorage['cart'])+items;
    document.getElementById('cart').setAttribute('value',localStorage['cart']);
  }
}

function buy_now()
{
  var value=confirm('Please confirm to Buy Now by clicking OK');
  if(value)
  {
    var data={};
    var items=document.getElementById('items').getAttributeNode('value').value;
    var item=localStorage['item_view'];
    data[item]=items;
    localStorage['buy_items']=JSON.stringify(data);
    localStorage['item_view']='';
    location.replace("checkout.html");
  }
}

function change_value(self)
{
    document.getElementById('items').getAttributeNode('value').value=self;
}
