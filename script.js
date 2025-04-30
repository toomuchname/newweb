document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5秒切换一次

    // 平滑滚动函数
    function scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // 初始化轮播图
    function initCarousel() {
        showSlide(currentSlide);
        startSlideShow();
    }

    // 显示指定索引的幻灯片
    function showSlide(index) {
        // 移除所有幻灯片的active类
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // 添加当前幻灯片的active类
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    // 切换到下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 切换到上一张幻灯片
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // 开始自动轮播
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // 停止自动轮播
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // 添加鼠标悬停事件
    carousel.addEventListener('mouseenter', stopSlideShow);
    carousel.addEventListener('mouseleave', startSlideShow);

    // 事件监听器
    prevButton.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    nextButton.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    // 为指示器添加点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideShow();
            currentSlide = index;
            showSlide(currentSlide);
            startSlideShow();
        });
    });

    // 为所有按钮添加点击事件
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = button.getAttribute('href');
            scrollToSection(targetSection);
        });
    });

    // 初始化轮播图
    initCarousel();
}); 
