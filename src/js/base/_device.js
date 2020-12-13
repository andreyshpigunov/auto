//
//  _device.js | Vanilla JS
//  Определение браузера, ОС и устройства
//
//  Copyright © 2019 Andrey Shpigunov. All right reserved.
//


//  Доступно из js, все переменные (при соответствии возвращают true):
//  Base.device.[ie|firefox|safari|webkit|chrome|opera|windows|macos|linux|ios|mobile|desktop|ipad|ipod|iphone|android|js]


const device = function () {
  
  let htmlElement_ = document.documentElement,
      userAgent_ = window.navigator.userAgent.toLowerCase(),
      platform_ = window.navigator.platform.toLowerCase(),
      classes = [];
    
		
  // Сохраняем уже установленные классы тега <html>
	// ----------------------------------------------
	let classAttr = htmlElement_.className;
  if (classAttr !== '') classes = classAttr.split(/\s+/);
		
		
	// Определяем классы для указания браузера
	// ---------------------------------------
	let versionMatch;
  if ((/msie/.test(userAgent_) || /trident/.test(userAgent_)) && !/opera/.test(userAgent_)) {
    classes.push('ie');
    versionMatch = userAgent_.match(/msie ([0-9.]+)/);
    if (versionMatch) {
      var version = parseInt(versionMatch[1], 10);
      classes.push('ie' + version);
      if (version === 7 || version === 8) classes.push('ie7-8');
    }
  } else if (/mozilla/.test(userAgent_) && !/(compatible|webkit)/.test(userAgent_)) {
    classes.push('firefox');
  } else if (/safari/.test(userAgent_) && !/chrome/.test(userAgent_)) {
    classes.push('safari', 'webkit');
    versionMatch = userAgent_.match(/version\/([0-9.]+)/);
    if (versionMatch) classes.push('safari' + parseInt(versionMatch[1], 10));
  } else if (/chrome/.test(userAgent_)) {
    classes.push('chrome', 'webkit');
  } else if (/opera/.test(userAgent_)) {
    classes.push('opera');
  }
		
		
	// Определяем классы для указания ОС
	// ---------------------------------
	if (/win/.test(platform_)) {
    classes.push('windows');
  } else if (/mac/.test(platform_)) {
    classes.push('macos');
  } else if (/linux/.test(platform_)) {
    classes.push('linux');
  } else if (/iphone|ipad|ipod/.test(userAgent_)) {
    classes.push('ios');
  }
		
		
	// Определяем классы для указания типа устройства
	// ----------------------------------------------
	if (/mobile/.test(userAgent_)) {
    classes.push('mobile');
  } else {
    classes.push('desktop');
  }
		
		
	// Определяем классы для указания типа мобильного устройства
	// ---------------------------------------------------------
	if (/ipad/.test(userAgent_)) {
    classes.push('ipad');
  } else if (/ipod/.test(userAgent_)) {
    classes.push('ipod');
  } else if (/iphone/.test(userAgent_)) {
    classes.push('iphone');
  } else if (/android/.test(userAgent_)) {
    classes.push('android');
  }
		
		
	// Добавляем класс поддержки js и убираем no-js (возможно поставленный другими способами)
	// --------------------------------------------------------------------------------------
	classes.push('js');
  for (let i = 0, len = classes.length; i < len; i++) {
    if (classes[i] === 'no-js') {
      classes.splice(i, 1);
      break;
    }
  }
		
		
	// Устанавливаем классы
	// --------------------
	htmlElement_.className = classes.join(' ');
		
	
	// Создаем объект со значениями классов, для использования в js
	// ------------------------------------------------------------
	let classesHash = {};
  
  for (let i = 0, len = classes.length; i < len; i++) {
    classesHash[classes[i]] = true;
  }
  
  classesHash.width = window.innerWidth;
  classesHash.height = window.innerHeight;
  return classesHash;

}();


export default device;

