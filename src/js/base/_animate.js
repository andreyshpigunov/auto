//
//	_animate.js | Vanilla JS
//	Анимации в зависимости от положения элемента
//
//	Copyright © 2019 Andrey Shpigunov. All right reserved.
//


const animate = function() {
  
  var animations = document.querySelectorAll('[data-animate]');
  
  if (animations.length) {
    var animationsHash = {};
    
    animations.forEach(function(e, index) {
      try {
        var json = JSON.parse(e.dataset.animate);
        if (json.hasOwnProperty('Start')) {
          var item = {};
          
          if (
            json.hasOwnProperty('TriggerID') &&
            document.getElementById(json.TriggerID)
          ) {
            item.Trigger = document.getElementById(json.TriggerID);
          } else {
            item.Trigger = e;
          }
          
          item.Element = e;
          item.Start = json.Start;
          item.End = json.End;
          item.Class = json.Class;
          item.ClassRemove = json.ClassRemove;
          item.FunctionName = json.FunctionName;
          
          animationsHash[index] = item;
        } else {
          Object.keys(json).forEach(function(i) {
            var item = {};
            
            if (
              json[i].hasOwnProperty('TriggerID') &&
              document.getElementById(json[i].TriggerID)
            ) {
              item.Trigger = document.getElementById(json[i].TriggerID);
            } else {
              item.Trigger = e;
            }
            
            item.Element = e;
            item.Start = json[i].Start;
            item.End = json[i].End;
            item.Class = json[i].Class;
            item.ClassRemove = json[i].ClassRemove;
            item.FunctionName = json[i].FunctionName;
            
            animationsHash[index + i] = item;
          })
        }
        
        e.removeAttribute('data-animate')
      } catch (err) {
        console.log(err)
      }
    });
    
    if (Object.keys(animationsHash).length) {
      _scroll(animationsHash);
      document.addEventListener('scroll', function() {
        _scroll(animationsHash);
      });
      if (document.querySelector('.animate-scrollarea')) {
        document.querySelector('.animate-scrollarea').addEventListener('scroll', function() {
          _scroll(animationsHash);
        })
      }
    }
  }
  
  function _scroll(animationsHash) {
    Object.keys(animationsHash).forEach(function(i) {
      var item = animationsHash[i];
      var offset = item.Trigger.getBoundingClientRect(), start, end;
      
      if (item.Start.match(/px/)) start = item.Start.replace('px', '');
      if (item.Start.match(/vh/)) start = _vh2px(item.Start.replace('vh', ''));
      if (item.Start.match(/%/))  start = _vh2px(item.Start.replace('%', ''));
      if (item.End.match(/px/)) end = item.End.replace('px', '');
      if (item.End.match(/vh/)) end = _vh2px(item.End.replace('vh', ''));
      if (item.End.match(/%/))  end = _vh2px(item.End.replace('%', ''));
      
      item.Duration = start - end;
      
      if (offset.top <= start && offset.top >= end) {
        if (item.Class != null) {
          item.Element.classList.add(item.Class);
        }
        
        if (typeof window[item.FunctionName] === "function") {
          item.Progress = (start - offset.top) / item.Duration;
          item.Progress = item.Progress.toFixed(4);
          window[item.FunctionName](item)
        }
      } else {
        if (item.Class != null && item.ClassRemove == true && item.Element.classList.contains(item.Class)) {
          item.Element.classList.remove(item.Class)
        }
        
        if (typeof window[item.FunctionName] === "function") {
          if (offset.top > start && item.Progress > 0) {
            item.Progress = 0;
            window[item.FunctionName](item);
          }
          
          if (offset.top < end && item.Progress < 1) {
            item.Progress = 1;
            window[item.FunctionName](item);
          }
        }
      }
    })
  }
  
  function _vh2px(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;
    var result = (y * value) / 100;
    return (result);
  }
  
  return null;

}();


export default animate;

