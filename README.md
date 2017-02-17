# select-sync
<a href='https://ko-fi.com/A5071NK' target='_blank'><img height='32' style='border:0px;height:32px;' src='https://az743702.vo.msecnd.net/cdn/kofi1.png?v=a' border='0' alt='Buy Me a Coffee' /></a> 

`select-sync` is a Jquery plugin to synchronize selects by selected or disabled options. Works great for many selects which are for an array or multiple selects for one value.

# Install

#### Yarn, NPM, or Bower
```
yarn add select-sync

npm install select-sync

bower install select-sync
```

#### Rails Install
```ruby
# Gemfile
source 'https://rails-assets.org' do
  gem 'rails-assets-select-sync'
end


# app/assets/javascripts/application.js
/*
 *= require jquery
 *= require select-sync
*/
```

# Usage
```javascript
$("select[name='myArray[]']").selectSync('disableSelected', {
  beforeSync: function(selects){
    // do something if you want to 
  },
  afterSync: function(selects){
    $(selects).trigger('chosen:updated');
  }
});

$("select[name='myArray[]']").selectSync('selected', {
  beforeSync: function(selects){
    // do something if you want to 
  },
  afterSync: function(selects){
    $(selects).trigger('chosen:updated');
  }
});

// Remove select sync
$('select[data-sync]').selectSync('disableSelected', 'destroy');
$('select[data-sync]').selectSync('selected', 'destroy');


$('#add').click(function(){
  // add new selects

  //reinitialize sync to include new selects
  $("select[name='myArray[]']").selectSync('disableSelected', {
    beforeSync: function(selects){
      // do something if you want to 
    },
    afterSync: function(selects){
      $(selects).trigger('chosen:updated');
    }
  });
});
```

# Options

beforeSync: function - Default `false`
Function to call before the sync has started.

afterSync: function - Default `false`
Function to call after the sync has completed.

# Limitations

* Currently can only have one sync per type per select.
* Doesnt work for multi-selects. I would try using a chosen multi-select before resorting to using this plugin.

# Credits
Created by Weston Ganger - @westonganger
