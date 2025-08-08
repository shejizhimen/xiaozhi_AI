/* =====================================================
Template Name   : Retox
Description     : Creative Agency HTML5 Template
Author          : Themesland
Version         : 1.2
=======================================================*/

(function ($) {
    "use strict";

    //Header Search
    if ($('.search-box-outer').length) {
        $('.search-box-outer').on('click', function () {
            $('body').addClass('search-active');
        });
        $('.close-search').on('click', function () {
            $('body').removeClass('search-active');
        });
    }



    // data-background    
    $(document).on('ready', function () {
        $("[data-background]").each(function () {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
        });
    });


    // wow init
    new WOW().init();


    // hero slider
    $('.hero-slider').owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        margin: -1,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 5000,
        items: 1,
        navText: [
            "<i class='far fa-long-arrow-left'></i>",
            "<i class='far fa-long-arrow-right'></i>"
        ],
    });

    $('.hero-slider').on('change.owl.carousel', function (event) {
        new WOW().init();
    });


    // partner-slider
    $('.partner-slider').owlCarousel({
        loop: true,
        margin: 50,
        nav: false,
        navText: [
            "<i class='icofont-long-arrow-left'></i>",
            "<i class='icofont-long-arrow-right'></i>"
        ],
        dots: false,
        autoplay: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 6
            }
        }
    });


    // testimonial-slider
    $('.testimonial-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        navText: [
            "<i class='icofont-long-arrow-left'></i>",
            "<i class='icofont-long-arrow-right'></i>"
        ],
        dots: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });


    // case-slider
    $('.case-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        navText: [
            "<i class='far fa-long-arrow-left'></i>",
            "<i class='far fa-long-arrow-right'></i>"
        ],
        dots: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });



    // preloader
    $(window).on('load', function () {
        $(".preloader").fadeOut("slow");
    });


    // fun fact counter
    $('.counter').countTo();
    $('.counter-box').appear(function () {
        $('.counter').countTo();
    }, {
        accY: -100
    });


    // progress bar
    $(document).ready(function () {
        var progressBar = $('.progress');
        if (progressBar.length) {
            progressBar.each(function () {
                var Self = $(this);
                Self.appear(function () {
                    var progressValue = Self.data('value');
                    Self.find('.progress-bar').animate({
                        width: progressValue + '%'
                    }, 1000);
                });
            })
        }
    });


    // magnific popup init
    $(".popup-gallery").magnificPopup({
        delegate: '.popup-img',
        type: 'image',
        gallery: {
            enabled: true
        },
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });



    // scroll to top
    $(window).scroll(function () {

        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            $("#scroll-top").fadeIn('slow');
        } else {
            $("#scroll-top").fadeOut('slow');
        }
    });

    $("#scroll-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1500);
        return false;
    });


    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass("fixed-top");
        } else {
            $('.navbar').removeClass("fixed-top");
        }
    });


    // countdown
    if ($('#countdown').length) {
        $('#countdown').countdown('2030/01/30', function (event) {
            $(this).html(event.strftime('' + '<div class="row">' + '<div class="col countdown-single">' + '<h2 class="mb-0">%-D</h2>' + '<h5 class="mb-0">Day%!d</h5>' + '</div>' + '<div class="col countdown-single">' + '<h2 class="mb-0">%H</h2>' + '<h5 class="mb-0">Hours</h5>' + '</div>' + '<div class="col countdown-single">' + '<h2 class="mb-0">%M</h2>' + '<h5 class="mb-0">Minutes</h5>' + '</div>' + '<div class="col countdown-single">' + '<h2 class="mb-0">%S</h2>' + '<h5 class="mb-0">Seconds</h5>' + '</div>' + '</div>'));
        });
    }


    // project filter
    $(window).on('load', function () {
        if( $(".filter-box").children().length > 0 ) {
            $(".filter-box").isotope({
                itemSelector: '.filter-item',
                masonry: {
                  columnWidth: 1
                },
            });

            $('.filter-btns').on( 'click', 'li', function() {
                var filterValue = $(this).attr('data-filter');
                $(".filter-box").isotope({ filter: filterValue });
            });

            $(".filter-btns li").each(function(){
                $(this).on("click", function(){
                    $(this).siblings("li.active").removeClass("active"); 
                    $(this).addClass("active");
                });
            });
        }
    });


    // copyright date
    let date= new Date().getFullYear();
    $("#date").html(date);


    // 登录/注册功能
    $(document).ready(function() {
        // 模拟登录状态（实际项目中应该从服务器获取）
        var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        // 根据登录状态显示相应的UI
        function updateAuthUI() {
            if (isLoggedIn) {
                $('#loginRegisterBtn').parent().hide();
                $('#userProfile').show();
            } else {
                $('#loginRegisterBtn').parent().show();
                $('#userProfile').hide();
            }
        }
        
        // 初始化UI状态
        updateAuthUI();
        
        // 登录/注册按钮点击事件
        $('#loginRegisterBtn').on('click', function(e) {
            e.preventDefault();
            
            // 创建完整的登录/注册模态框
            var modalHtml = `
                <div class="modal fade" id="authModal" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="authModalTitle">用户登录</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="auth-tabs">
                                    <!-- 主要标签：登录/注册 -->
                                    <ul class="nav nav-tabs mb-3" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-bs-toggle="tab" href="#mainLoginTab" onclick="updateModalTitle('用户登录')">登录</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-bs-toggle="tab" href="#mainRegisterTab" onclick="updateModalTitle('用户注册')">注册</a>
                                        </li>
                                    </ul>
                                    
                                    <div class="tab-content">
                                        <!-- 登录标签页 -->
                                        <div id="mainLoginTab" class="tab-pane active">
                                            <!-- 登录方式选择标签 -->
                                            <div class="login-tabs mb-4">
                                                <ul class="nav nav-tabs justify-content-center" id="loginTabs" role="tablist">
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link active" id="modal-phone-login-tab" data-bs-toggle="tab" data-bs-target="#modal-phone-login" type="button" role="tab">
                                                            <i class="far fa-mobile"></i> 手机登录
                                                        </button>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link" id="modal-wechat-login-tab" data-bs-toggle="tab" data-bs-target="#modal-wechat-login" type="button" role="tab">
                                                            <i class="fab fa-weixin"></i> 微信登录
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            <!-- 登录表单内容 -->
                                            <div class="tab-content" id="modalLoginTabContent">
                                                <!-- 手机登录 -->
                                                <div class="tab-pane fade show active" id="modal-phone-login" role="tabpanel">
                                                    <form id="modalPhoneLoginForm">
                                                        <div class="mb-3">
                                                            <label class="form-label">手机号码</label>
                                                            <input type="tel" class="form-control" placeholder="请输入您的手机号" required>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label">登录方式</label>
                                                            <div class="login-method-switch mb-3">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio" name="modalPhoneLoginMethod" id="modalPhonePassword" value="password" checked>
                                                                    <label class="form-check-label" for="modalPhonePassword">密码登录</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" type="radio" name="modalPhoneLoginMethod" id="modalPhoneSms" value="sms">
                                                                    <label class="form-check-label" for="modalPhoneSms">验证码登录</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mb-3" id="modalPhonePasswordGroup">
                                                            <label class="form-label">密码</label>
                                                            <input type="password" class="form-control" placeholder="请输入您的密码" required>
                                                        </div>
                                                        <div class="mb-3" id="modalPhoneSmsGroup" style="display: none;">
                                                            <label class="form-label">验证码</label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control" placeholder="请输入验证码" required>
                                                                <button class="btn btn-outline-secondary" type="button" id="modalSendLoginSmsCode">发送验证码</button>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex justify-content-between mb-3">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" id="modalRememberPhone">
                                                                <label class="form-check-label" for="modalRememberPhone">记住我</label>
                                                            </div>
                                                            <a href="#" class="text-muted">忘记密码？</a>
                                                        </div>
                                                        <button type="submit" class="theme-btn w-100"><i class="far fa-sign-in"></i> 立即登录</button>
                                                    </form>
                                                </div>
                                                
                                                <!-- 微信登录 -->
                                                <div class="tab-pane fade" id="modal-wechat-login" role="tabpanel">
                                                    <div class="wechat-login-container text-center">
                                                        <div class="qr-code-section mb-4">
                                                            <h5>扫码登录</h5>
                                                            <div class="qr-code-wrapper">
                                                                <img src="assets/img/qr-code/wechat-login.png" alt="微信登录二维码" class="qr-code-img" style="width: 200px; height: 200px;">
                                                            </div>
                                                            <p class="mt-3 text-muted">使用微信扫描上方二维码<br>确认登录</p>
                                                        </div>
                                                        <div class="wechat-status">
                                                            <div class="alert alert-info">
                                                                <i class="fas fa-qrcode"></i>
                                                                <strong>登录步骤：</strong><br>
                                                                1. 使用微信扫描二维码<br>
                                                                2. 在手机上确认登录<br>
                                                                3. 自动跳转到用户中心
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- 注册标签页 -->
                                        <div id="mainRegisterTab" class="tab-pane">
                                            <!-- 注册方式选择标签 -->
                                            <div class="register-tabs mb-4">
                                                <ul class="nav nav-tabs justify-content-center" id="registerTabs" role="tablist">
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link active" id="modal-phone-tab" data-bs-toggle="tab" data-bs-target="#modal-phone-register" type="button" role="tab">
                                                            <i class="far fa-mobile"></i> 手机注册
                                                        </button>
                                                    </li>
                                                    <li class="nav-item" role="presentation">
                                                        <button class="nav-link" id="modal-wechat-tab" data-bs-toggle="tab" data-bs-target="#modal-wechat-register" type="button" role="tab">
                                                            <i class="fab fa-weixin"></i> 微信注册
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                            <!-- 注册表单内容 -->
                                            <div class="tab-content" id="modalRegisterTabContent">
                                                <!-- 手机注册 -->
                                                <div class="tab-pane fade show active" id="modal-phone-register" role="tabpanel">
                                                    <form id="modalPhoneRegisterForm">
                                                        <div class="mb-3">
                                                            <label class="form-label">手机号码</label>
                                                            <input type="tel" class="form-control" placeholder="请输入您的手机号" required>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label">验证码</label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control" placeholder="请输入验证码" required>
                                                                <button class="btn btn-outline-secondary" type="button" id="modalSendSmsCode">发送验证码</button>
                                                            </div>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label">密码</label>
                                                            <input type="password" class="form-control" placeholder="请设置密码（至少6位）" required>
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label">确认密码</label>
                                                            <input type="password" class="form-control" placeholder="请再次输入密码" required>
                                                        </div>
                                                        <div class="mb-3 form-check">
                                                            <input class="form-check-input" type="checkbox" id="modalAgreePhone" required>
                                                            <label class="form-check-label" for="modalAgreePhone">
                                                               我同意 <a href="terms.html" target="_blank">服务条款</a> 和 <a href="privacy.html" target="_blank">隐私政策</a>
                                                            </label>
                                                        </div>
                                                        <button type="submit" class="theme-btn w-100"><i class="far fa-paper-plane"></i> 立即注册</button>
                                                    </form>
                                                </div>
                                                
                                                <!-- 微信注册 -->
                                                <div class="tab-pane fade" id="modal-wechat-register" role="tabpanel">
                                                    <div class="wechat-register-container text-center">
                                                        <div class="qr-code-section mb-4">
                                                            <h5>扫码关注微信公众号注册</h5>
                                                            <div class="qr-code-wrapper">
                                                                <img src="assets/img/qr-code/wechat-register-temp.svg" alt="微信注册二维码" class="qr-code-img" style="width: 200px; height: 200px;">
                                                            </div>
                                                            <p class="mt-3 text-muted">使用微信扫描上方二维码<br>关注公众号完成注册</p>
                                                        </div>
                                                        <div class="wechat-tips">
                                                            <div class="alert alert-info">
                                                                <i class="fas fa-info-circle"></i>
                                                                <strong>注册步骤：</strong><br>
                                                                1. 使用微信扫描二维码<br>
                                                                2. 关注"小智AI技术中心"公众号<br>
                                                                3. 发送"注册"获取注册链接<br>
                                                                4. 完成微信授权即可注册成功
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // 移除已存在的模态框
            $('#authModal').remove();
            
            // 添加新的模态框到页面
            $('body').append(modalHtml);
            
            // 显示模态框
            $('#authModal').modal('show');
            
            // 初始化模态框功能
            initModalAuthFunctions();
        });
        
        // 更新模态框标题
        window.updateModalTitle = function(title) {
            $('#authModalTitle').text(title);
        };
        
        // 初始化模态框认证功能
        function initModalAuthFunctions() {
            // 手机登录方式切换
            $('#modalPhonePassword').on('change', function() {
                if (this.checked) {
                    $('#modalPhonePasswordGroup').show();
                    $('#modalPhoneSmsGroup').hide();
                }
            });
            
            $('#modalPhoneSms').on('change', function() {
                if (this.checked) {
                    $('#modalPhonePasswordGroup').hide();
                    $('#modalPhoneSmsGroup').show();
                }
            });
            
            // 验证码发送功能
            $('#modalSendSmsCode, #modalSendLoginSmsCode').on('click', function() {
                sendModalSmsCode(this);
            });
            
            // 表单提交处理
            $('#modalPhoneLoginForm').on('submit', function(e) {
                e.preventDefault();
                handleModalLogin('phone', this);
            });
            
            $('#modalPhoneRegisterForm').on('submit', function(e) {
                e.preventDefault();
                handleModalRegister('phone', this);
            });
        }
        
        // 发送验证码
        function sendModalSmsCode(button) {
            const phoneInput = $(button).closest('form').find('input[type="tel"]');
            const phone = phoneInput.val().trim();
            
            if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
                alert('请输入正确的手机号码');
                phoneInput.focus();
                return;
            }
            
            let countdown = 60;
            $(button).prop('disabled', true).text(countdown + '秒后重发');
            
            const timer = setInterval(function() {
                countdown--;
                if (countdown > 0) {
                    $(button).text(countdown + '秒后重发');
                } else {
                    clearInterval(timer);
                    $(button).prop('disabled', false).text('发送验证码');
                }
            }, 1000);
            
            // 模拟发送验证码
            setTimeout(function() {
                alert('验证码已发送，请注意查收');
            }, 500);
        }
        
        // 处理登录
        function handleModalLogin(type, form) {
            const formData = new FormData(form);
            
            // 模拟登录验证
            setTimeout(function() {
                isLoggedIn = true;
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', '用户');
                updateAuthUI();
                $('#authModal').modal('hide');
                alert('登录成功！');
            }, 1000);
        }
        
        // 处理注册
        function handleModalRegister(type, form) {
            const inputs = $(form).find('input');
            let isValid = true;
            
            // 基本验证
            inputs.each(function() {
                if ($(this).prop('required') && !$(this).val().trim()) {
                    isValid = false;
                    $(this).focus();
                    alert('请填写所有必填项');
                    return false;
                }
            });
            
            if (!isValid) return;
            
            // 密码确认验证
            const passwords = $(form).find('input[type="password"]');
            if (passwords.length === 2 && passwords.eq(0).val() !== passwords.eq(1).val()) {
                alert('两次输入的密码不一致');
                passwords.eq(1).focus();
                return;
            }
            
            // 协议确认
            const agreeCheckbox = $(form).find('input[type="checkbox"]');
            if (agreeCheckbox.length && !agreeCheckbox.prop('checked')) {
                alert('请同意服务条款和隐私政策');
                return;
            }
            
            // 模拟注册
            setTimeout(function() {
                alert('注册成功！请登录。');
                // 切换到登录标签
                $('a[href="#mainLoginTab"]').tab('show');
            }, 1000);
        }
        
        // 退出登录
        $(document).on('click', '#logoutBtn', function(e) {
            e.preventDefault();
            isLoggedIn = false;
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            updateAuthUI();
            alert('已退出登录！');
        });
    });


})(jQuery);










