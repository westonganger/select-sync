/*
 * select-sync - jQuery plugin to synchronize selects by selected, disabled or all options.
 * @version v0.9.0
 * @link http://github.com/westonganger/select-sync
 * @license MIT
 */

(function($){
  "use strict";

  var event = 'change';

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

    if(!isFunction(options.beforeSync)){
      options.beforeSync = false;
    }

    if(!isFunction(options.afterSync)){
      options.afterSync = false;
    }

    var syncDisableSelected = function(e){
      elements.find('option').removeAttr('disabled');

      elements.each(function(){
        if(item.value){
          // will this work?
          elements.find('option:not(:selected)[value='+ item.value +']').prop('disabled', true);
        }
      });
    };

    var syncSelected = function(){
      elements.each(function(){
        if(item.value){
          $(this).val();
          return false;
        }
      });
    };

    var sync = function(){
      if(options.beforeSync){
        options.beforeSync(elements);
      }

      if(type === 'disabledSelected'){
        syncDisableSelected();
      }else{
        syncSelected();
      }

      if(options.afterSync){
        options.afterSync(elements);
      }
    };

    elements.data("sync-"+ev, true)
            .off('sync:'+ev)
            .on('sync:'+ev, function(e){
              func();
            })
            .off('change.sync-'+ev)
            .on('change.sync-'+ev, function(e){
              $(this).trigger('sync:'+ev)
            });

    elements.first().trigger('sync:'+ev);

    return this;
  };
}(jQuery));
