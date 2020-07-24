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
var keys=Object.keys(JSON.parse(localStorage['cart_items']));
function initializing()
{
    document.getElementById('cart').getAttributeNode('value').value=localStorage['cart'];
    var cart_items=JSON.parse(localStorage['cart_items']);
    if(Object.keys(cart_items).length!=0)
    {
      for(var index=0; index<keys.length; index+=1)
      {
        var tag=document.createElement('h1');
        tag.id=index;
        document.getElementById('cart_list').appendChild(tag);
        var data=keys[index].split(',');
        var start_index=data[0].lastIndexOf('/');
       // tag.style.textAlign='center';
        tag.style.color='maroon';
        tag.style.border='2px solid #0ad2fa';
        tag.style.display='inline-block';
        tag.style.padding='6px';
        tag.style.fontSize='15px';
        tag.style.margin='3px';
       //tag.innerHTML='* '+data[0].substring(start_index+1)+'&nbsp;&nbsp;'+'Price : '+data[1]+';&nbsp;'+'No of Items : '+cart_items[keys[index]]+'<br>';
       var tag1 = document.createElement('samp');
       tag1.className ='samp1';
       var name= data[0].substring(start_index + 1);
       tag1.innerHTML=  name[0].toUpperCase()+name.substring(1)+ '&nbsp;&nbsp;';
       var tag2 = document.createElement('samp');
       tag2.className = 'samp2';
       tag2.innerHTML= 'Price : ' + data[1] + ';&nbsp;';
       var tag3 = document.createElement('samp');
       tag3.className ='samp3';
       tag3.innerHTML= 'No of Items : ' + cart_items[keys[index]]+'&nbsp;&nbsp';
       tag.appendChild(tag1);
       tag.appendChild(tag2);
       tag.appendChild(tag3);
       total_price=total_price+(parseInt(data[1].substring(1))*parseInt(cart_items[keys[index]]));
       var tag4=document.createElement('input');
       tag4.className = 'samp4';
       tag4.type='button';
       tag4.value='delete item from cart';
       tag4.style.width='160px';
       tag4.style.height='26px';
       tag4.style.color='#fcf7f7';
       tag4.style.background='#c22bbf';
       tag4.style.cursor='pointer';
       //tag4.style.marginTop = '5px';
       var fun_name='delete_me('+index+')';
       tag4.setAttribute('onclick',fun_name);
       tag.appendChild(tag4);
       document.getElementById('cart_list').appendChild(document.createElement('br'));
      }
      var tag=document.createElement('input');
      tag.id='place_order';
      tag.type='button';
      tag.value='PLACE ORDER';
      tag.style.width='160px';
      tag.style.height='40px';
      tag.style.fontSize='20px';
      tag.style.color='#fcf7f7';
      tag.style.background='#faaa0a';
      tag.style.cursor='pointer';
      tag.style.margin='30px auto auto auto';
      tag.setAttribute('onclick','buy_now()');
      var tag1=document.createElement('h3');
      tag1.innerHTML='Total Price : ₹'+total_price+'&nbsp;&nbsp;';
      tag1.style.display='inline-block';
      tag1.style.color='#b01ca1';
      tag1.id='total_price';
      document.getElementById('cart_list').appendChild(tag1);
      document.getElementById('cart_list').appendChild(tag);

    }
    else
    {
        document.getElementById('cart_list').innerHTML='<h1>No items in the Cart</h1>';
        document.getElementById('heading').style.display='none';
    }
  }

function delete_me(self)
{
  var value=confirm('Please confirm item deletion from cart by clicking OK');
  if(value)
  {
    var tag=document.getElementById(self);
    document.getElementById('cart_list').removeChild(tag);
    var cart_items=JSON.parse(localStorage['cart_items']);
    var key=keys[self];
    var items=cart_items[key];
    var data=key.split(',');
    var price=parseInt(data[1].substring(1))*items;
    delete cart_items[key];
    localStorage['cart']=parseInt(localStorage['cart'])-items;
    localStorage['cart_items']=JSON.stringify(cart_items);
    document.getElementById('cart').setAttribute('value',localStorage['cart']);
    if(Object.keys(cart_items).length==0)
    {
      document.getElementById('cart_list').innerHTML='<h1>No items in the Cart</h1>';
      document.getElementById('heading').style.display='none';
      //tag=document.getElementById('place_order');
      //document.getElementsById('cart_list').removeChild(tag);
      //tag=document.getElementById('total_price');
      //document.getElementsById('cart_list').removeChild(tag);
    }
    else
    {
      total_price=total_price-price;
      document.getElementById('total_price').innerHTML='Total Price : ₹'+total_price+'&nbsp;&nbsp;';
    }
  }
}

function buy_now()
{
  var value=confirm('Please confirm to place order by clicking OK');
  if(value)
  {
    localStorage['buy_items']=localStorage['cart_items'];
    location.replace("checkout.html");
  }
}
