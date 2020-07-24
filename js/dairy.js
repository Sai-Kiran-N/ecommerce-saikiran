
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

      function item_view(self)
      {
        localStorage['item_view']=self;
        return 0;
      }

      function add_to_cart(self)
      {
        var data=self.split(',');
        var start_index=data[0].lastIndexOf('/');
        var value=confirm(data[0].substring(start_index+1)+' added to cart successfully'+'\n\nClick ok to confirm');
        if(value)
        {
          var cart_items=JSON.parse(localStorage['cart_items']);
          if(self in cart_items)
          {
            cart_items[self]+=1;
          }
          else
          {
            cart_items[self]=1;
          }
          localStorage['cart_items']=JSON.stringify(cart_items);
          localStorage['cart']=parseInt(localStorage['cart'])+1;
          document.getElementById('cart').getAttributeNode('value').value=localStorage['cart'];
        }
      }

      function buy_now(self)
      {
        var value=confirm('Please confirm to Buy Now by clicking OK');
        if(value)
        {
          var item={};
          item[self]=1;
          localStorage['buy_items']=JSON.stringify(item);
          location.replace('../checkout.html');
        }
      }
