/** public/site-helper.js — 页面提示卡片、关键词徽章与访问说明 */

(function () {
  'use strict';

  /* ---- 配置数据 ---- */
  const CONFIG = {
    siteUrl: 'https://main-cn-hth.com.cn',
    keyword: '华体会',
    cardTitle: '欢迎访问',
    badgeLabel: '热门关键词',
    noticeHeadline: '访问说明',
    noticeItems: [
      '请使用现代浏览器打开本站以获得最佳体验',
      '部分功能需要启用 JavaScript',
      '如遇加载缓慢，请尝试刷新页面'
    ]
  };

  /* ---- 工具函数 ---- */
  function createElement(tag, props, children) {
    const el = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (key) {
        if (key === 'className') {
          el.className = props[key];
        } else if (key === 'style' && typeof props[key] === 'object') {
          Object.assign(el.style, props[key]);
        } else {
          el.setAttribute(key, props[key]);
        }
      });
    }
    if (children) {
      children.forEach(function (child) {
        if (typeof child === 'string') {
          el.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
          el.appendChild(child);
        }
      });
    }
    return el;
  }

  function createBadge(text, color) {
    var span = document.createElement('span');
    span.textContent = text;
    span.style.display = 'inline-block';
    span.style.padding = '4px 10px';
    span.style.margin = '4px';
    span.style.borderRadius = '12px';
    span.style.fontSize = '0.85em';
    span.style.fontWeight = '600';
    span.style.backgroundColor = color || '#e0e0e0';
    span.style.color = '#222';
    return span;
  }

  /* ---- 构建卡片 ---- */
  function buildCard() {
    var container = createElement('div', {
      className: 'site-helper-card',
      style: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '280px',
        maxWidth: '90vw',
        backgroundColor: '#ffffff',
        border: '1px solid #d0d7de',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: '16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        zIndex: '9999',
        lineHeight: '1.5',
        color: '#1f2328'
      }
    });

    /* 标题 */
    var titleEl = createElement('h3', {
      style: {
        margin: '0 0 8px 0',
        fontSize: '1.1em',
        fontWeight: '600'
      }
    }, [CONFIG.cardTitle]);
    container.appendChild(titleEl);

    /* 网站链接 */
    var linkEl = createElement('a', {
      href: CONFIG.siteUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
      style: {
        color: '#0969da',
        textDecoration: 'none',
        wordBreak: 'break-all'
      }
    }, [CONFIG.siteUrl]);
    container.appendChild(linkEl);

    /* 分隔 */
    container.appendChild(createElement('hr', {
      style: {
        border: 'none',
        borderTop: '1px solid #d0d7de',
        margin: '12px 0'
      }
    }));

    /* 关键词徽章区域 */
    var badgeLabelEl = createElement('div', {
      style: {
        fontSize: '0.9em',
        fontWeight: '500',
        marginBottom: '6px'
      }
    }, [CONFIG.badgeLabel]);
    container.appendChild(badgeLabelEl);

    var badgeContainer = createElement('div', {
      style: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    });
    /* 使用关键词生成多个徽章（颜色稍作变化） */
    var variants = [
      { text: CONFIG.keyword, color: '#ddf4ff' },
      { text: CONFIG.keyword + '·体育', color: '#dafbe1' },
      { text: CONFIG.keyword + '·电竞', color: '#fff8c5' },
      { text: CONFIG.keyword + '·真人', color: '#ffebe9' }
    ];
    variants.forEach(function (item) {
      badgeContainer.appendChild(createBadge(item.text, item.color));
    });
    container.appendChild(badgeContainer);

    /* 分隔 */
    container.appendChild(createElement('hr', {
      style: {
        border: 'none',
        borderTop: '1px solid #d0d7de',
        margin: '12px 0'
      }
    }));

    /* 访问说明 */
    var noticeTitle = createElement('div', {
      style: {
        fontSize: '0.9em',
        fontWeight: '500',
        marginBottom: '6px'
      }
    }, [CONFIG.noticeHeadline]);
    container.appendChild(noticeTitle);

    var ul = createElement('ul', {
      style: {
        margin: '0',
        paddingLeft: '18px',
        fontSize: '0.85em',
        color: '#656d76'
      }
    });
    CONFIG.noticeItems.forEach(function (text) {
      var li = createElement('li', {}, [text]);
      ul.appendChild(li);
    });
    container.appendChild(ul);

    /* 关闭按钮 */
    var closeBtn = createElement('button', {
      style: {
        position: 'absolute',
        top: '8px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '1.2em',
        cursor: 'pointer',
        color: '#656d76',
        lineHeight: '1'
      }
    }, ['×']);
    closeBtn.addEventListener('click', function () {
      container.style.display = 'none';
    });
    container.appendChild(closeBtn);

    return container;
  }

  /* ---- 注入页面 ---- */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(buildCard());
      });
    } else {
      document.body.appendChild(buildCard());
    }
  }

  init();
})();