// 登录注册功能JavaScript

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initAuthFunctions();
});

// 初始化认证功能
function initAuthFunctions() {
    // 初始化手机登录方式切换
    initPhoneLoginSwitch();
    
    // 初始化验证码发送功能
    initSmsCodeSender();
    
    // 初始化表单验证
    initFormValidation();
    
    // 初始化微信二维码
    initWeChatQR();
}

// 手机登录方式切换
function initPhoneLoginSwitch() {
    const phonePasswordRadio = document.getElementById('phonePassword');
    const phoneSmsRadio = document.getElementById('phoneSms');
    const passwordGroup = document.getElementById('phonePasswordGroup');
    const smsGroup = document.getElementById('phoneSmsGroup');
    
    if (phonePasswordRadio && phoneSmsRadio) {
        phonePasswordRadio.addEventListener('change', function() {
            if (this.checked) {
                passwordGroup.style.display = 'block';
                smsGroup.style.display = 'none';
                // 清空验证码输入
                const smsInput = smsGroup.querySelector('input');
                if (smsInput) smsInput.value = '';
            }
        });
        
        phoneSmsRadio.addEventListener('change', function() {
            if (this.checked) {
                passwordGroup.style.display = 'none';
                smsGroup.style.display = 'block';
                // 清空密码输入
                const passwordInput = passwordGroup.querySelector('input');
                if (passwordInput) passwordInput.value = '';
            }
        });
    }
}

// 验证码发送功能
function initSmsCodeSender() {
    // 注册页面验证码
    const sendSmsBtn = document.getElementById('sendSmsCode');
    if (sendSmsBtn) {
        sendSmsBtn.addEventListener('click', function() {
            sendSmsCode(this, 'register');
        });
    }
    
    // 登录页面验证码
    const sendLoginSmsBtn = document.getElementById('sendLoginSmsCode');
    if (sendLoginSmsBtn) {
        sendLoginSmsBtn.addEventListener('click', function() {
            sendSmsCode(this, 'login');
        });
    }
}

// 发送短信验证码
function sendSmsCode(button, type) {
    const phoneInput = button.closest('form').querySelector('input[type="tel"]');
    const phone = phoneInput.value.trim();
    
    // 验证手机号格式
    if (!validatePhone(phone)) {
        showMessage('请输入正确的手机号码', 'error');
        phoneInput.focus();
        return;
    }
    
    // 禁用按钮并开始倒计时
    let countdown = 60;
    button.disabled = true;
    button.innerHTML = `${countdown}秒后重发`;
    
    const timer = setInterval(function() {
        countdown--;
        if (countdown > 0) {
            button.innerHTML = `${countdown}秒后重发`;
        } else {
            clearInterval(timer);
            button.disabled = false;
            button.innerHTML = '发送验证码';
        }
    }, 1000);
    
    // 模拟发送验证码API调用
    setTimeout(function() {
        showMessage('验证码已发送，请注意查收', 'success');
    }, 500);
    
    console.log(`发送验证码到: ${phone}, 类型: ${type}`);
}

// 表单验证
function initFormValidation() {
    // 邮箱注册表单
    const emailRegisterForm = document.getElementById('emailRegisterForm');
    if (emailRegisterForm) {
        emailRegisterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEmailRegister(this);
        });
    }
    
    // 手机注册表单
    const phoneRegisterForm = document.getElementById('phoneRegisterForm');
    if (phoneRegisterForm) {
        phoneRegisterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePhoneRegister(this);
        });
    }
    
    // 邮箱登录表单
    const emailLoginForm = document.getElementById('emailLoginForm');
    if (emailLoginForm) {
        emailLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEmailLogin(this);
        });
    }
    
    // 手机登录表单
    const phoneLoginForm = document.getElementById('phoneLoginForm');
    if (phoneLoginForm) {
        phoneLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePhoneLogin(this);
        });
    }
}

// 处理邮箱注册
function handleEmailRegister(form) {
    const formData = new FormData(form);
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    const agree = form.querySelector('#agreeEmail').checked;
    
    // 验证表单
    if (!validateEmail(email)) {
        showMessage('请输入正确的邮箱地址', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('密码长度至少6位', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('两次输入的密码不一致', 'error');
        return;
    }
    
    if (!agree) {
        showMessage('请同意服务条款和隐私政策', 'error');
        return;
    }
    
    // 模拟注册API调用
    showLoading('正在注册...');
    setTimeout(function() {
        hideLoading();
        showMessage('注册成功！正在跳转...', 'success');
        setTimeout(function() {
            // 注册成功后跳转到首页或用户中心
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
    
    console.log('邮箱注册:', { email, password });
}

// 处理手机注册
function handlePhoneRegister(form) {
    const phone = form.querySelector('input[type="tel"]').value;
    const smsCode = form.querySelector('input[type="text"]').value;
    const password = form.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    const agree = form.querySelector('#agreePhone').checked;
    
    // 验证表单
    if (!validatePhone(phone)) {
        showMessage('请输入正确的手机号码', 'error');
        return;
    }
    
    if (!smsCode || smsCode.length !== 6) {
        showMessage('请输入6位验证码', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('密码长度至少6位', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('两次输入的密码不一致', 'error');
        return;
    }
    
    if (!agree) {
        showMessage('请同意服务条款和隐私政策', 'error');
        return;
    }
    
    // 模拟注册API调用
    showLoading('正在注册...');
    setTimeout(function() {
        hideLoading();
        showMessage('注册成功！正在跳转...', 'success');
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
    
    console.log('手机注册:', { phone, smsCode, password });
}

// 处理邮箱登录
function handleEmailLogin(form) {
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const remember = form.querySelector('#rememberEmail').checked;
    
    if (!validateEmail(email)) {
        showMessage('请输入正确的邮箱地址', 'error');
        return;
    }
    
    if (!password) {
        showMessage('请输入密码', 'error');
        return;
    }
    
    // 模拟登录API调用
    showLoading('正在登录...');
    setTimeout(function() {
        hideLoading();
        showMessage('登录成功！正在跳转...', 'success');
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
    
    console.log('邮箱登录:', { email, password, remember });
}

// 处理手机登录
function handlePhoneLogin(form) {
    const phone = form.querySelector('input[type="tel"]').value;
    const loginMethod = form.querySelector('input[name="phoneLoginMethod"]:checked').value;
    const remember = form.querySelector('#rememberPhone').checked;
    
    if (!validatePhone(phone)) {
        showMessage('请输入正确的手机号码', 'error');
        return;
    }
    
    if (loginMethod === 'password') {
        const password = form.querySelector('#phonePasswordGroup input').value;
        if (!password) {
            showMessage('请输入密码', 'error');
            return;
        }
        console.log('手机密码登录:', { phone, password, remember });
    } else {
        const smsCode = form.querySelector('#phoneSmsGroup input').value;
        if (!smsCode || smsCode.length !== 6) {
            showMessage('请输入6位验证码', 'error');
            return;
        }
        console.log('手机验证码登录:', { phone, smsCode, remember });
    }
    
    // 模拟登录API调用
    showLoading('正在登录...');
    setTimeout(function() {
        hideLoading();
        showMessage('登录成功！正在跳转...', 'success');
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 1500);
    }, 2000);
}

// 初始化微信二维码
function initWeChatQR() {
    // 模拟微信二维码刷新
    const wechatLoginTab = document.getElementById('wechat-login-tab');
    if (wechatLoginTab) {
        wechatLoginTab.addEventListener('click', function() {
            setTimeout(function() {
                refreshWeChatQR();
            }, 100);
        });
    }
    
    const wechatRegisterTab = document.getElementById('wechat-tab');
    if (wechatRegisterTab) {
        wechatRegisterTab.addEventListener('click', function() {
            setTimeout(function() {
                refreshWeChatQR();
            }, 100);
        });
    }
}

// 刷新微信二维码
function refreshWeChatQR() {
    const qrImages = document.querySelectorAll('.qr-code-img');
    qrImages.forEach(function(img) {
        // 添加时间戳防止缓存
        const src = img.src.split('?')[0];
        img.src = src + '?t=' + new Date().getTime();
    });
}

// 工具函数

// 验证邮箱格式
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 验证手机号格式
function validatePhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// 显示消息提示
function showMessage(message, type = 'info') {
    // 创建消息提示元素
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    messageDiv.innerHTML = `
        <strong>${type === 'error' ? '错误' : type === 'success' ? '成功' : '提示'}：</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(messageDiv);
    
    // 3秒后自动移除
    setTimeout(function() {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// 显示加载状态
function showLoading(message = '加载中...') {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingOverlay';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    loadingDiv.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
            <div class="loading-spinner" style="margin-bottom: 15px;"></div>
            <div>${message}</div>
        </div>
    `;
    
    document.body.appendChild(loadingDiv);
}

// 隐藏加载状态
function hideLoading() {
    const loadingDiv = document.getElementById('loadingOverlay');
    if (loadingDiv) {
        loadingDiv.parentNode.removeChild(loadingDiv);
    }
}