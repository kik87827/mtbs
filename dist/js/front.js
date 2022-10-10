document.addEventListener("DOMContentLoaded", function() {
  commonInit();
  mbTotal();
  commonEvent();
  commonForm();
});
window.addEventListener("load", function() {});

function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf('samsung') > -1) {
    browserAdd("samsung");
  }

  if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }


  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}


function mbTotal() {
  const touchstart = "ontouchstart" in window;
  const btn_htotal = document.querySelector(".btn_total"),
      mobile_mainmenu_zone = document.querySelector(".mobile_mainmenu_zone"),
      mainmenu_dim = document.querySelector(".mainmenu_dim"),
      btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
      domHtml = document.querySelector("html"),
      domBody = document.querySelector("body");

  // init 
  if(mobile_mainmenu_zone === null){return;}
  btn_htotal.addEventListener("click",function(e){
      e.preventDefault();
      totalOpen();
  },false);
  btn_mbmenuclose.addEventListener("click",function(e){
      e.preventDefault();
      totalClose();
  },false);
  mainmenu_dim.addEventListener("click",function(e){
      e.preventDefault();
      totalClose();
  },false);
  function totalOpen(){
      mobile_mainmenu_zone.classList.add("active")
      setTimeout(function(){
          mobile_mainmenu_zone.classList.add("motion");
          if(touchstart){
              domBody.setAttribute("data-scr", window.pageYOffset);
              domBody.style.marginTop = -window.pageYOffset + "px";
              domHtml.classList.add("touchDis");
          }
      },30);
  }
  function totalClose(){
      mobile_mainmenu_zone.classList.remove("motion");
      setTimeout(function(){
          mobile_mainmenu_zone.classList.remove("active");
          domHtml.classList.remove("touchDis");
          domBody.style.marginTop = 0;
          window.scrollTo(0, parseInt(domBody.getAttribute("data-scr")));
      },500);
  }
}


function commonEvent() {
  let windowWidth = 0;
  // action();
  window.addEventListener("resize", () => {
    if (windowWidth === window.innerWidth) {
      return;
    }
    // action();
    windowWidth = window.innerWidth;
  });

  function action() {
    function commonTitle(){
      const headerTitle = document.querySelector(".header_toptitle");
      const btn_total = document.querySelector(".btn_total");
      let btn_total_wid = btn_total !== null ? btn_total.getBoundingClientRect().width : 0;
      const header_util_wrap = document.querySelector(".header_util_wrap");
      let header_util_wrap_wid = header_util_wrap !== null ? header_util_wrap.getBoundingClientRect().width : 0;
      if(headerTitle !== null){
        headerTitle.style.paddingLeft = btn_total_wid + "px";
        headerTitle.style.paddingRight = header_util_wrap_wid + "px";
      }
    }
    commonTitle();
  }
}



function commonForm() {
  addDynamicEventListener(document.body, 'change', '.form_select', function(e) {
    let thisTarget = e.target;
    if (thisTarget.value === "0") {
      thisTarget.classList.add("ready");
    } else {
      console.log(thisTarget.value);
      thisTarget.classList.remove("ready");
    }
  });
  let form_input = document.querySelectorAll(".form_input");
  let input_form_select = document.querySelectorAll(".input_form_select");
  let domHTML = document.querySelector("html");
  if(form_input.length){
    form_input.forEach(function(elem,index){
          elem.addEventListener("focus",function(e){
              focusInAction(e.currentTarget);
          },false);
          elem.addEventListener("keydown",function(e){
              focusInAction(e.currentTarget);
          },false);
          elem.addEventListener("keypress",function(e){
              focusInAction(e.currentTarget);
          },false);
          
          elem.addEventListener("focusout",function(e){
              focusOutAction(e.currentTarget);
          },false);
      });
  }
  function focusInAction(target){
      let currentTarget = target;
      let currentParent = currentTarget.closest(".inform_fxwrap");
      if(currentParent !== null){
        currentParent.classList.add("active");
      }
  }

  function focusOutAction(target){
      let currentTarget = target;
      let currentParent = currentTarget.closest(".inform_fxwrap");
      if(currentParent !== null){
        currentParent.classList.remove("active");
      }
  }

  if(input_form_select.length){
      input_form_select.forEach(function(elem,index){
          let this_p = elem.closest(".input_form_select_w");
          if(elem.value.length>0){
              this_p.classList.add("active");
              return;
          }
          this_p.classList.remove("active");

          elem.addEventListener("change",function(e){
              e.preventDefault();
              let this_p = elem.closest(".input_form_select_w");
              this_p.classList.add("active");
          },false);
          elem.addEventListener("focus",function(e){
              e.preventDefault();
              let this_p = elem.closest(".input_form_select_w");
              if(domHTML.classList.contains("window")){
                  this_p.classList.add("active");
              }
          },false);
          elem.addEventListener("focusout",function(e){
              let this_p = elem.closest(".input_form_select_w");
              if(elem.value.length>0){return;}
              this_p.classList.remove("active");
          },false);
      })
    }
}


function DesignPopup(option) {
  this.selector = null;
  if (option.selector !== undefined) {
      this.selector = document.querySelector(option.selector);
  }
  this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.btn_closeTrigger = null;
  this.bg_design_popup = null;
  this.scrollValue = 0;
  this.popupShow(option.selector);
}

DesignPopup.prototype.popupShow = function (target) {
  var objThis = this;
  this.selector = document.querySelector(target);
  if (this.selector == null) {
      return;
  }
  this.domBody.setAttribute("data-scr", window.pageYOffset);
  this.domBody.style.marginTop = -window.pageYOffset+"px";
  this.scrollValue = window.pageYOffset;
  this.domHtml.classList.add("touchDis");
  this.selector.classList.add("active");
setTimeout(function(){
  objThis.selector.classList.add("motion");
},30);


  this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
  
  this.bg_design_popup = this.selector.querySelector(".popup_wrap .bg_dim");
  this.domBody.append(this.selector);
  this.bindEvent(this.selector);
  
}
DesignPopup.prototype.popupHide = function (target) {
  var objThis = this;
  if (target !== undefined) {
      if (typeof target =="object"){
          this.selector = target;
      }else{
          this.selector = document.querySelector(target);
      }
      this.selector.classList.remove("motion");
      setTimeout(function(){
          //remove
          objThis.selector.classList.remove("active");
          objThis.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
          if (objThis.design_popup_wrap_active.length==0){
              objThis.domHtml.classList.remove("touchDis");
              objThis.domBody.style.marginTop = 0;
              window.scrollTo(0, parseInt(objThis.domBody.getAttribute("data-scr")));
          }
      },420);
  }
}

DesignPopup.prototype.bindEvent = function () {
  var objThis = this;

  if (this.btn_closeTrigger.length) {
      for (var i = 0; i < this.btn_closeTrigger.length; i++) {
          this.btn_closeTrigger[i].addEventListener("click", function () {
              objThis.popupHide(objThis.selector);
          }, false);
      }
  }

  if (this.bg_design_popup !== null){
      this.bg_design_popup.addEventListener("click", function (e) {
          e.preventDefault();
          objThis.popupHide(objThis.selector);
      }, false);
  }
};