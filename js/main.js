/* ==========================================================================
   Neptune 官方网站 - 主交互脚本
   功能: 语言切换 / 移动端菜单 / 滚动效果 / 气象模式表格 / 返回顶部
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- 当前语言状态 ---------- */
  let currentLang = localStorage.getItem("neptune-lang") || "zh-CN";
  if (!I18N[currentLang]) currentLang = "zh-CN";

  /* ============================================================
     一、语言切换 (i18n)
     ============================================================ */
  function applyLanguage(lang) {
    currentLang = lang;
    const dict = I18N[lang];
    if (!dict) return;

    /* 设置 <html lang> */
    document.documentElement.lang = dict._htmlLang || lang;

    /* 遍历所有带 data-i18n 的元素并替换文本 */
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      const text = dict[key];
      if (text !== undefined && text !== null) {
        el.textContent = text;
      }
    });

    /* 处理带 data-i18n-html 的元素（含 HTML） */
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-html");
      const text = dict[key];
      if (text !== undefined && text !== null) {
        el.innerHTML = text;
      }
    });

    /* 处理带 data-i18n-placeholder 的元素 */
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      const text = dict[key];
      if (text !== undefined && text !== null) {
        el.setAttribute("placeholder", text);
      }
    });

    /* 更新语言切换按钮显示 */
    updateLangToggle(lang);

    /* 重新渲染气象表格 */
    renderWeatherTable(activeWeatherTab);

    /* 持久化 */
    localStorage.setItem("neptune-lang", lang);

    /* 更新 SEO meta description（动态切换语言时） */
    updateMetaLanguage(lang);
  }

  function updateLangToggle(lang) {
    const btnZh = document.getElementById("langZh");
    const btnEn = document.getElementById("langEn");
    if (btnZh && btnEn) {
      if (lang === "zh-CN") {
        btnZh.classList.add("lang-active");
        btnEn.classList.remove("lang-active");
      } else {
        btnEn.classList.add("lang-active");
        btnZh.classList.remove("lang-active");
      }
    }
  }

  function updateMetaLanguage(lang) {
    /* 根据语言更新 meta description / title 以辅助 SEO */
    const descZh = "Neptune 是一款海洋环境数据处理与模拟工具，提供网格处理、岸线处理、水深处理、NetCDF 数据解析、气象数据下载等功能。";
    const descEn = "Neptune is a  marine environment data processing and simulation tool, offering mesh processing, coastline & bathymetry analysis, NetCDF visualization, and meteorological data download.";
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute("content", lang === "zh-CN" ? descZh : descEn);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", lang === "zh-CN" ? descZh : descEn);
    }
  }

  /* ============================================================
     二、移动端菜单
     ============================================================ */
  function initMobileMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    if (!menuBtn || !navMenu) return;

    menuBtn.addEventListener("click", function () {
      menuBtn.classList.toggle("active");
      navMenu.classList.toggle("open");
    });

    /* 点击菜单项后关闭 */
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuBtn.classList.remove("active");
        navMenu.classList.remove("open");
      });
    });
  }

  /* ============================================================
     三、头部滚动效果
     ============================================================ */
  function initHeaderScroll() {
    const header = document.getElementById("header");
    if (!header) return;

    const heroEl = document.getElementById("hero");
    const heroHeight = heroEl ? heroEl.offsetHeight : 600;

    function onScroll() {
      const y = window.scrollY;

      /* 滚动超过阈值添加阴影 */
      if (y > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      /* 在 Hero 区内使用深色头部，离开后保持深色背景的区段也用深色 */
      const darkSections = document.querySelectorAll(".section-dark, .download, .hero");
      let inDark = false;
      darkSections.forEach(function (sec) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          inDark = true;
        }
      });

      if (inDark) {
        header.classList.add("header-dark");
      } else {
        header.classList.remove("header-dark");
      }

      /* 返回顶部按钮 */
      const backTop = document.getElementById("backTop");
      if (backTop) {
        if (y > 500) {
          backTop.classList.add("show");
        } else {
          backTop.classList.remove("show");
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     四、滚动揭示动画 (Intersection Observer)
     ============================================================ */
  function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("visible"); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     五、气象模式表格
     ============================================================ */
  let activeWeatherTab = "noaa_regional";

  function initWeatherTabs() {
    const tabs = document.querySelectorAll(".weather-tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        activeWeatherTab = tab.getAttribute("data-tab");
        renderWeatherTable(activeWeatherTab);
      });
    });
  }

  function renderWeatherTable(tabKey) {
    const tbody = document.getElementById("weatherTbody");
    if (!tbody) return;

    const models = WEATHER_MODELS[tabKey] || [];
    const isZh = currentLang === "zh-CN";
    const thModel = isZh ? "模式" : "Model";
    const thName = isZh ? "名称" : "Name";
    const thRes = isZh ? "分辨率" : "Resolution";
    const thRange = isZh ? "预报时效" : "Forecast Range";

    /* 更新表头 */
    const thead = document.querySelector(".weather-table thead tr");
    if (thead) {
      thead.innerHTML =
        "<th>" + thModel + "</th>" +
        "<th>" + thName + "</th>" +
        "<th>" + thRes + "</th>" +
        "<th>" + thRange + "</th>";
    }

    /* 渲染行 */
    tbody.innerHTML = models.map(function (m) {
      const name = isZh ? m.name_zh : m.name_en;
      const range = isZh ? m.range_zh : m.range_en;
      return (
        "<tr>" +
        "<td><span class='model-code'>" + m.code + "</span></td>" +
        "<td>" + name + "</td>" +
        "<td><span class='badge-res'>" + m.res + "</span></td>" +
        "<td>" + range + "</td>" +
        "</tr>"
      );
    }).join("");
  }

  /* ============================================================
     六、返回顶部
     ============================================================ */
  function initBackTop() {
    const backTop = document.getElementById("backTop");
    if (!backTop) return;
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ============================================================
     七、平滑锚点滚动
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#" || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  /* ============================================================
     八、语言按钮事件绑定
     ============================================================ */
  function initLangButtons() {
    const btnZh = document.getElementById("langZh");
    const btnEn = document.getElementById("langEn");
    if (btnZh) btnZh.addEventListener("click", function () { applyLanguage("zh-CN"); });
    if (btnEn) btnEn.addEventListener("click", function () { applyLanguage("en"); });
  }

  /* ============================================================
     初始化
     ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initHeaderScroll();
    initScrollReveal();
    initWeatherTabs();
    initBackTop();
    initSmoothScroll();
    initLangButtons();

    /* 首次应用语言 */
    applyLanguage(currentLang);
  });
})();
