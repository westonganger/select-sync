/*
 * select-sync - Synchronize selects by selected, disabled or all options.
 * @version v1.0.1
 * @link http://github.com/westonganger/select-sync
 * @license MIT
 */

(function($){
  "use strict";

  var arrayExcludes = function(array, value){
    var bool = true;
    for(var i=0;i<array.length;i++){
      if(array[i] === x){
        bool = false;
        break;
      }
    }
    return bool;
  };

  var isFunction = function(obj){
    return !!(obj && obj.constructor && obj.call && obj.apply)
  };

  $.fn.selectSync = function(type, options){
    var ev = (type === 'disableSelected' ? 'disable-selected' : 'selected');

    if(arguments.length === 0){
      throw('error wrong number of arguments given');
    }else if(arguments.length === 1){
      options = {disableSelected: true, syncSelected: false};
    }else if(options === 'destroy'){
      this.each(function(i, item){
        $(item).off('sync:' + ev).off('change.sync-' + ev).data('sync-' + ev, false);
      });
      return this;
    }

    if(type !== 'disableSelected' && type !== 'selected'){
      throw('first argument is not valid');
    }

    var elements = this.not('[multiple]');

    if(options.beforeSync && !isFunction(options.beforeSync)){
      throw('afterSync option must be a function');
    }

    if(options.afterSync && !isFunction(options.afterSync)){
      throw('afterSync option must be a function');
    }

    if(options.alwaysDisabledValues){
      if(ev === 'selected'){
        throw('alwaysDisabledValues option is only valid for the sync type: disableSelected');
      }else if(!Array.isArray(options.alwaysDisabledValues)){
        throw('alwaysDisabledValues option must be an array');
      }
    }

    var syncDisableSelected = function(e){
      if(options.alwaysDisabledValues){
        elements.find('option').map(function(i, item){
          if(Array.prototype.includes){
            return !options.alwaysDisabledValues.includes(item.value);
          }else{
            return arrayExcludes(options.alwaysDisabledValues, item.value);
          }
        }).removeAttr('disabled');
      }else{
        elements.find('option').removeAttr('disabled');
      }

      elements.each(function(i, item){
        var val = $(item).val();
        if(val){
          elements.find("option:not(:selected)").each(function(i2, opt){
            if((opt.value === undefined && opt.text === val) || (opt.value && opt.value === val)){
              $(opt).prop('disabled', true);
            }
          });
        }
      });
    };

    var syncSelected = function(e){
      elements.val($(e.target).val());
    };

    var sync = function(e){
      if(options.beforeSync){
        options.beforeSync(elements);
      }

      if(e.type === 'sync:disable-selected'){
        syncDisableSelected(e);
      }else{
        syncSelected(e);
      }

      if(options.afterSync){
        options.afterSync(elements);
      }
    };

    elements.data("sync-"+ev, true)
            .off('sync:'+ev)
            .on('sync:'+ev, function(e){
              sync(e);
            })
            .off('change.sync-'+ev)
            .on('change.sync-'+ev, function(e){
              $(this).trigger('sync:'+ev);
            });

    elements.first().trigger('sync:'+ev);

    return this;
  };
}(jQuery));
