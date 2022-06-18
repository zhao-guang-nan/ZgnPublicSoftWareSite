"use strict";

document.addEventListener("DOMContentLoaded", function () {
    /* =====================================================
        HERO HOMEPAGE SLIDER
    ===================================================== */
    var homepageSlider = new Swiper(".homepage-slider", {
        slidesPerView: 1,
        spaceBetween: 0,
        /*更改每页滑动的间隔*/
        speed: 1000,
        autoplay: {
            /*更改自动滑动的间隔*/            
            delay: 10000,
        },

        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =====================================================
        TESTIMONIALS SLIDER
    ===================================================== */
    var testimonialsSlider = new Swiper(".testimonials-slider", {
        slidesPerView: 1,
        spaceBetween: 10,

        breakpoints: {
            761: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },

        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =====================================================
        CUSTOMERS SLIDER
    ===================================================== */
    var customersSlider = new Swiper(".customers-slider", {
        slidesPerView: 2,
        spaceBetween: 10,

        breakpoints: {
            481: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            991: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 6,
            },
        },

        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =====================================================
        PRODUCT DETAILS THUMBS SLIDER
    ===================================================== */
    var productDetailSliderThumb = new Swiper(".shop-detail-slider-thumbs", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    /* =====================================================
        PRODUCT DETAILS SLIDER
    ===================================================== */
    var productDetailSlider = new Swiper(".shop-detail-slider", {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: productDetailSliderThumb,
        },
    });

    /* =====================================================
        PORTFOLIO SLIDER
    ===================================================== */
    var portfolioSlider = new Swiper(".portfolio-slider", {
        slidesPerView: 1,
        spaceBetween: 0,

        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
    });

    /* =============================================
        TRIGGER COUNTER UP FUNCTION USING WAYPOINTS
    ================================================ */
    const counterElem = document.getElementById("counterUp");
    if (counterElem) {
        const counterWaypoint = new Waypoint({
            element: counterElem,
            handler: function () {
                vanillaCounterUp(".counter", 100);
            },
            offset: "75%",
        });
    }

    /* =============================================
        COUNTER UP FUNCTION
    ================================================ */

    function vanillaCounterUp(counterTarget, counterSpeed) {
        const counters = document.querySelectorAll(counterTarget);
        const speed = counterSpeed;

        counters.forEach((counter) => {
            function updateCount() {
                const target = +counter.getAttribute("data-counter");
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.trunc(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = Math.trunc(target);
                }
            }
            updateCount();
        });
    }

    /* ==============================================
     CUSTOM SELECT
    ============================================== */
    const sizes = document.querySelector(".js-sizes");

    if (sizes) {
        const sizeschoices = new Choices(sizes, {
            placeholder: true,
            searchEnabled: false,
            itemSelectText: "Select",
            callbackOnInit: function () {
                let pickerCustomClass = sizes.dataset.customclass;
                let pickerSevClasses = pickerCustomClass.split(" ");
                sizes.parentNode.classList.add.apply(sizes.parentNode.classList, pickerSevClasses);
            },
        });
    }

    /* ==============================================
        GET COUNTRIES FROM AJAX REQUEST
    ============================================== */

    /* =====================================================
        CUSTOM SELECT
    ===================================================== */


    /* =====================================================
        NAVBAR BEHAVIOR
    ===================================================== */

    /* ==============================================
        MULTILEVEL DROPDOWNS
    ============================================== */
    let dropdownElementList = [].slice.call(document.querySelectorAll(".dropdown-toggle"));
    let dropdownSubmenuElementList = [].slice.call(document.querySelectorAll(".dropdown-submenu-toggle"));
    let dropdownMenus = [].slice.call(document.querySelectorAll(".dropdown-menu"));

    let dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });

    let submenuList = dropdownSubmenuElementList.map(function (e) {
        e.onclick = function (e) {
            e.target.parentNode.querySelector("ul").classList.toggle("show");
            e.stopPropagation();
            e.preventDefault();
        };
    });
    function closeAllSubmenus() {
        let dropdownSubmenus = [].slice.call(document.querySelectorAll(".dropdown-submenu"));
        dropdownSubmenus.map(function (submenu) {
            submenu.classList.remove("show");
        });
    }

    //I'm using "click" but it works with any event
    document.addEventListener("click", function (event) {
        var specifiedElement = document.querySelector(".dropdown");
        var isClickInside = specifiedElement.contains(event.target);

        if (!isClickInside) {
            closeAllSubmenus();
        }

        //自研软件界面单击事件
        if(event.srcElement.dataset.selfstudypagetype){
            //处理页码的问题
            let type=event.srcElement.dataset.selfstudypagetype;
            do{
                if(type==='selfStudyPageBefore'){
                    goToBeforePage();
                    break;
                }
                if(type==='selfStudyPageMiddle'){
                    let pageIndex=parseInt(event.srcElement.innerHTML);
                    changeWhichPageFunc(pageIndex);
                    break;
                }
                if(type==='selfStudyPageAfter'){
                    goToAfterPage();
                    break;
                }
            }while(false);
            return;
        }
        //其他软件界面
        if(event.srcElement.dataset.othersoftwarepagetype){
            //处理页码的问题
            let type=event.srcElement.dataset.othersoftwarepagetype;
            do{
                if(type==='otherSoftWarePageBefore'){
                    goToBeforePage();
                    break;
                }
                if(type==='otherSoftWarePageMiddle'){
                    let pageIndex=parseInt(event.srcElement.innerHTML);
                    changeWhichPageFunc(pageIndex);
                    break;
                }
                if(type==='otherSoftWarePageAfter'){
                    goToAfterPage();
                    break;
                }
            }while(false);
            return;
        }
        //教程界面
        if(event.srcElement.dataset.turorialpagetype){
            //处理页码的问题
            let type=event.srcElement.dataset.turorialpagetype;
            do{
                if(type==='turorialPageBefore'){
                    goToBeforePage();
                    break;
                }
                if(type==='turorialPageMiddle'){
                    let pageIndex=parseInt(event.srcElement.innerHTML);
                    changeWhichPageFunc(pageIndex);
                    break;
                }
                if(type==='turorialPageAfter'){
                    goToAfterPage();
                    break;
                }
            }while(false);
            return;
        }        
        //日志界面
        if(event.srcElement.dataset.logpagetype){
            //处理页码的问题
            let type=event.srcElement.dataset.logpagetype;
            do{
                if(type==='logPageBefore'){
                    goToBeforePage();
                    break;
                }
                if(type==='logPageMiddle'){
                    let pageIndex=parseInt(event.srcElement.innerHTML);
                    changeWhichPageFunc(pageIndex);
                    break;
                }
                if(type==='logPageAfter'){
                    goToAfterPage();
                    break;
                }
            }while(false);
            return;
        }   
        //常见问题界面p
        if(event.srcElement.dataset.questionpagetype){
            //处理页码的问题
            let type=event.srcElement.dataset.questionpagetype;
            do{
                if(type==='questionPageBefore'){
                    goToBeforePage();
                    break;
                }
                if(type==='questionPageMiddle'){
                    let pageIndex=parseInt(event.srcElement.innerHTML);
                    changeWhichPageFunc(pageIndex);
                    break;
                }
                if(type==='questionPageAfter'){
                    goToAfterPage();
                    break;
                }
            }while(false);
            return;
        }   
        
    });
});
