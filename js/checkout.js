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

var total_price=0;
var keys=Object.keys(JSON.parse(localStorage['buy_items']));
function initializing()
{
    document.getElementById('cart').getAttributeNode('value').value=localStorage['cart'];
    var buy_items=JSON.parse(localStorage['buy_items']);
    if(Object.keys(buy_items).length!=0)
    {
      for(var index=0; index<keys.length; index+=1)
      {
        var tag=document.createElement('h1');
        tag.id=index;
        document.getElementById('cart_list').appendChild(tag);
        var data=keys[index].split(',');
        var start_index=data[0].lastIndexOf('/');
        //tag.style.textAlign='center';
        tag.style.color='maroon';
        //tag.style.border='2px solid #0ad2fa';
        tag.style.display='inline-block';
        tag.style.padding='5px';
        tag.style.fontSize='15px';
        tag.innerHTML = (index + 1) + '. ' + data[0].substring(start_index + 1) + '&nbsp;&nbsp;&nbsp;';
        var tag1 = document.createElement('h1');
        tag1.className='samp5';
        tag1.style.fontSize = '15px';
        tag1.innerHTML= 'Price : ' + data[1] + ';&nbsp;&nbsp;&nbsp;' + 'No of Items : ' + buy_items[keys[index]] + '<br>';
        tag.appendChild(tag1);
        total_price=total_price+(parseInt(data[1].substring(1))*parseInt(buy_items[keys[index]]));
        document.getElementById('cart_list').appendChild(document.createElement('br'));
      }
      var tag1=document.createElement('h3');
      tag1.innerHTML='Total Price : ₹'+total_price+'&nbsp;&nbsp;';
      tag1.style.display='inline-block';
      tag1.style.color='#b01ca1';
      tag1.id='total_price';
      document.getElementById('cart_list').appendChild(tag1);
      var tag=document.createElement('input');
      tag.id='pay_now';
      tag.setAttribute('onclick','buy_now()');
      tag.style.fontSize='20px';
      tag.type='button';
      tag.setAttribute('value','PAY NOW');
      tag.style.background='#b01ca1';
      tag.style.color='#f5edf4';
      tag.style.width='120px';
      tag.style.height='40px';
      tag.style.cursor='pointer';
      document.getElementById('cart_list').appendChild(document.createElement('br'));
      document.getElementById('cart_list').appendChild(document.createElement('br'));
      document.getElementById('cart_list').appendChild(tag);
    }
    else
    {
        document.getElementById('cart_list').innerHTML='<h1>No items in the Cart</h1>';
    }
  }

  function buy_now()
  {
    document.getElementById('submit').click();
  }

  function form_submit()
  {
    var value=confirm('Please confirm payment by clicking OK');
    if(value)
    {
      value=confirm('Do you want to clear items in the cart');
      if(value)
      {
        localStorage['cart']=0;
        localStorage['cart_items']=JSON.stringify({});
        localStorage['buy_items']=JSON.stringify({});
      }
      alert('Congrats, Order Placed successfully');
      location.replace('home.html');
    }

    return false;
  }
