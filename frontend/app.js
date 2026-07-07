(function () {
    'use strict';

    const urlInput = document.getElementById('urlInput');
    const downloadBtn = document.getElementById('downloadBtn');
    const pasteBtn = document.getElementById('pasteBtn');
    const loader = document.getElementById('loader');
    const errorEl = document.getElementById('error');
    const resultEl = document.getElementById('result');
    const singleResult = document.getElementById('singleResult');
    const playlistResult = document.getElementById('playlistResult');
    const playlistContent = document.getElementById('playlistContent');
    const progressWrap = document.getElementById('progressWrap');
    const progressFill = document.getElementById('progressFill');
    const progressLabel = document.getElementById('progressLabel');
    const progressPercent = document.getElementById('progressPercent');
    const toast = document.getElementById('toast');
    const historySection = document.getElementById('historySection');
    const historyList = document.getElementById('historyList');
    const platformGrid = document.getElementById('platformGrid');
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const cookieBar = document.getElementById('cookieBar');
    const cookieAccept = document.getElementById('cookieAccept');
    const navHamburger = document.getElementById('navHamburger');
    const navLinks = document.getElementById('navLinks');

    let selectedFormatId = null;
    let pollTimer = null;

    const PLATFORMS = [
        { name: 'YouTube', color: '#ff0000' },
        { name: 'TikTok', color: '#000000' },
        { name: 'Instagram', color: '#e4405f' },
        { name: 'Twitter / X', color: '#1da1f2' },
        { name: 'Facebook', color: '#1877f2' },
        { name: 'Reddit', color: '#ff4500' },
        { name: 'Vimeo', color: '#1ab7ea' },
        { name: 'SoundCloud', color: '#ff7700' },
        { name: 'Twitch', color: '#9146ff' },
        { name: 'Dailymotion', color: '#0066dc' },
        { name: 'VK', color: '#4a76a8' },
        { name: 'Pinterest', color: '#e60023' },
    ];

    const PLATFORM_SVGS = {
        YouTube: '<svg viewBox="0 0 24 24" fill="#ff0000"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
        TikTok: '<svg viewBox="0 0 24 24" fill="#000000"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
        Instagram: '<svg viewBox="0 0 24 24" fill="#e4405f"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
        'Twitter / X': '<svg viewBox="0 0 24 24" fill="#1da1f2"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
        Facebook: '<svg viewBox="0 0 24 24" fill="#1877f2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
        Reddit: '<svg viewBox="0 0 24 24" fill="#ff4500"><path d="M12 0A12 12 0 001.73 9.65a3.3 3.3 0 001.05 6.44 3.3 3.3 0 00.1 0l.95.83a10.2 10.2 0 007.17 2.82v.02a10.2 10.2 0 007.17-2.82l.95-.83a3.3 3.3 0 001.1-6.44A12 12 0 0012 0zm5.14 7.66a1.64 1.64 0 111.64 1.64 1.64 1.64 0 01-1.64-1.64zM8.6 7.66a1.64 1.64 0 11-1.64 1.64A1.64 1.64 0 018.6 7.66zm-.8 5.9a.82.82 0 010-1.16.82.82 0 011.15 0c.55.55 1.47.91 3.05.91s2.5-.36 3.05-.91a.82.82 0 011.15 0 .82.82 0 010 1.16c-.8.8-2.22 1.27-4.2 1.27s-3.4-.47-4.2-1.27zm.63 2.85a.55.55 0 01.77 0 3.97 3.97 0 002.8 1.11c.73 0 1.6-.23 2.8-1.11a.55.55 0 01.77 0 .55.55 0 010 .77c-1.43 1.1-2.6 1.39-3.57 1.39-.97 0-2.14-.28-3.57-1.39a.55.55 0 010-.77zM3.64 9.3c.15-.52.52-.97 1.02-1.25.7-.38 1.53-.4 2.11-.1l.15.1a.82.82 0 01.8.8.82.82 0 01-.8.8A1.6 1.6 0 005.29 12a.82.82 0 010 .8 3.3 3.3 0 01-1.65-1.77 3.3 3.3 0 010-1.73zm16.72 0a3.3 3.3 0 010 1.73 3.3 3.3 0 01-1.65 1.77.82.82 0 010-.8 1.6 1.6 0 00-1.6-2.16.82.82 0 01-.8-.8.82.82 0 01.8-.8l.14-.1c.58-.3 1.42-.28 2.1.1.5.28.88.73 1.02 1.26z"/></svg>',
        Vimeo: '<svg viewBox="0 0 24 24" fill="#1ab7ea"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/></svg>',
        SoundCloud: '<svg viewBox="0 0 24 24" fill="#ff7700"><path d="M21.75 11.25c-.22 0-.44.02-.66.06-.53-2.83-3.04-4.97-6.02-4.97-.78 0-1.54.15-2.23.42-.22.09-.45.19-.66.31-.05.02-.08.05-.11.09-.03.04-.04.08-.05.13v9.76c0 .04.02.08.04.11.03.03.06.05.1.06l.22.02h8.58c1.24 0 2.25-1.01 2.25-2.25s-1.01-2.25-2.25-2.25v.55c0 .3-.25.55-.55.55s-.55-.25-.55-.55v-.55h-.05v-1.98c.07-.01.13-.02.2-.02 1.24 0 2.25-1.01 2.25-2.25s-1.01-2.25-2.25-2.25zM0 15.67h1.85v-5.12H0v5.12zm2.78 1.76h1.85v-6.88H2.78v6.88zm2.93 0h1.85v-7.38H5.71v7.38zm2.97 0h1.85v-7.38H8.68v7.38z"/></svg>',
        Twitch: '<svg viewBox="0 0 24 24" fill="#9146ff"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.428l-3 3v-3H6.857V1.714h13.714z"/></svg>',
        Dailymotion: '<svg viewBox="0 0 24 24" fill="#0066dc"><path d="M13.2 13.2h2.4v2.4h-2.4zm0-4.8h2.4v2.4h-2.4zm0 9.6h2.4v-2.4h-2.4zM24 4.8v14.4c0 2.64-2.16 4.8-4.8 4.8H4.8C2.16 24 0 21.84 0 19.2V4.8C0 2.16 2.16 0 4.8 0h14.4C21.84 0 24 2.16 24 4.8zM4.8 2.4c-.79 0-1.44.65-1.44 1.44v16.32c0 .79.65 1.44 1.44 1.44h14.4c.79 0 1.44-.65 1.44-1.44V3.84c0-.79-.65-1.44-1.44-1.44H4.8z"/></svg>',
        VK: '<svg viewBox="0 0 24 24" fill="#4a76a8"><path d="M11.685 0C5.23 0 0 5.23 0 11.685c0 6.456 5.23 11.685 11.685 11.685 6.456 0 11.685-5.23 11.685-11.685C23.37 5.23 18.14 0 11.685 0zm6.22 16.986h-1.638c-.689 0-.884-.422-1.404-1.03-.522-.61-1.058-.706-1.72-.332-.663.374-.84 1.362-.84 1.362s.047.426-.28.426h-2.335c-1.583 0-3.03-1.316-3.97-3.138C5.172 12.01 4.44 9.925 4.44 9.925s-.113-.262 0-.403c.113-.14.356-.14.356-.14h1.682c.237 0 .34.131.386.32.047.19.338.992.698 1.724.551 1.121.982 1.546 1.353 1.546.093 0 .196-.047.29-.14.374-.374.327-.89.327-1.58 0-1.584-.233-2.104-.747-2.447-.374-.234-.56-.281-1.074-.374-.327-.047-.374-.14-.327-.28.047-.094.14-.188.28-.188h1.495c.28 0 .374.094.467.28.374.562.374 1.59.374 1.59 0 .375.046 1.122.28 1.31.14.096.264.021.33-.04.103-.095.327-.49.514-1.037.186-.544.14-1.543.14-1.543s0-.28.14-.374c.047-.094.14-.14.28-.14h1.636c.28 0 .374.14.374.28.047.095.14.421 0 .795-.14.468-.69 1.31-1.074 1.724-.28.28-.514.466-.514.607 0 .047.188.233.374.42.888.982 1.16 1.456 1.3 1.78.187.422.14.654.14.654.047.327-.28.467-.467.467z"/></svg>',
        Pinterest: '<svg viewBox="0 0 24 24" fill="#e60023"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.042-3.438.218-.93 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.03-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.25 3.772-5.495 0-2.873-2.064-4.883-5.012-4.883-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.27 1.041-1.002 2.345-1.492 3.14C9.57 22.812 10.763 23 12 23c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>',
    };

    // ---- Theme ----
    const themeToggle = document.getElementById('themeToggle');
    const stored = localStorage.getItem('ss-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', stored);

    themeToggle.addEventListener('click', function () {
        const cur = document.documentElement.getAttribute('data-theme');
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('ss-theme', next);
    });

    // ---- Navbar scroll shadow ----
    function updateNavbar() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // ---- Back to top ----
    function updateBackToTop() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Cookie consent ----
    if (!localStorage.getItem('ss-cookie-consent')) {
        cookieBar.classList.remove('hidden');
    }

    cookieAccept.addEventListener('click', function () {
        localStorage.setItem('ss-cookie-consent', '1');
        cookieBar.classList.add('hidden');
    });

    // ---- Mobile hamburger ----
    navHamburger.addEventListener('click', function () {
        navHamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            navHamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Scroll reveal ----
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
        revealObserver.observe(el);
    });

    // ---- Paste ----
    pasteBtn.addEventListener('click', async function () {
        try {
            const text = await navigator.clipboard.readText();
            urlInput.value = text;
            showToast('Link pasted from clipboard');
        } catch {
            showToast('Could not read clipboard');
        }
    });

    // ---- Main action ----
    downloadBtn.addEventListener('click', startFetch);
    urlInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') startFetch();
    });

    function startFetch() {
        const url = urlInput.value.trim();
        if (!url) {
            showToast('Please paste a URL');
            urlInput.focus();
            return;
        }
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            showToast('Invalid URL — must start with http:// or https://');
            return;
        }

        resetUI();
        showLoader();
        hideError();

        fetch('/api/info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url })
        })
        .then(function (r) {
            if (!r.ok) return r.json().then(function (d) { throw new Error(d.detail || 'Request failed'); });
            return r.json();
        })
        .then(function (data) {
            hideLoader();
            if (data.is_playlist) {
                renderPlaylist(data);
            } else {
                renderSingle(data);
            }
            setTimeout(function () {
                resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        })
        .catch(function (err) {
            hideLoader();
            showError(err.message);
        });
    }

    function renderSingle(data) {
        resultEl.classList.remove('hidden');
        playlistResult.classList.add('hidden');

        const thumb = data.thumbnail || '';
        const title = data.title || 'Unknown';
        const uploader = data.uploader || data.channel || '';
        const duration = formatDuration(data.duration);
        const extractor = data.extractor_key || 'Unknown';

        let html = '<div class="media-header">';
        if (thumb) {
            html += '<div class="thumb-wrap"><img src="' + escapeAttr(thumb) + '" alt="Thumbnail" loading="lazy"></div>';
        } else {
            html += '<div class="thumb-wrap" style="display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:0.78rem;">No thumbnail</div>';
        }
        html += '<div class="media-meta">';
        html += '<h2>' + escapeHtml(title) + '</h2>';
        if (uploader) html += '<p>' + escapeHtml(uploader) + '</p>';
        html += '<div class="stats">';
        if (duration) html += '<span>' + duration + '</span>';
        if (data.view_count != null) html += '<span>' + formatNumber(data.view_count) + ' views</span>';
        if (data.like_count != null) html += '<span>' + formatNumber(data.like_count) + ' likes</span>';
        html += '</div>';
        html += '<span class="extractor-badge">' + escapeHtml(extractor) + '</span>';
        html += '</div></div>';

        const formats = data.formats || [];
        const audios = formats.filter(function (f) { return f.vcodec === 'none' || !f.vcodec || f.resolution === 'audio only'; });
        const videos = formats.filter(function (f) { return f.vcodec && f.vcodec !== 'none'; });

        html += '<div class="format-tabs">';
        html += '<button class="tab active" data-tab="video">Video</button>';
        if (audios.length) html += '<button class="tab" data-tab="audio">Audio</button>';
        html += '</div>';

        html += '<div class="format-list" id="formatList">';
        html += renderFormatItems(videos);
        html += '</div>';

        html += '<div class="size-info hidden" id="sizeInfo"></div>';

        html += '<div class="progress-wrap hidden" id="progressWrap">';
        html += '<div class="progress-bar"><div class="progress-fill" id="progressFill" style="width:0%"></div></div>';
        html += '<div class="progress-info"><span id="progressLabel">Downloading...</span><span id="progressPercent">0%</span></div>';
        html += '</div>';

        html += '<button class="btn btn-download" id="downloadFileBtn">';
        html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
        html += 'Download</button>';

        html += '<div class="download-link hidden" id="downloadLink"></div>';
        html += '<div class="error hidden" id="error"></div>';

        singleResult.innerHTML = html;
        selectedFormatId = null;

        var tabs = singleResult.querySelectorAll('.tab');
        tabs.forEach(function (t) {
            t.addEventListener('click', function () {
                tabs.forEach(function (x) { x.classList.remove('active'); });
                t.classList.add('active');
                var list = singleResult.querySelector('#formatList');
                if (t.dataset.tab === 'video') {
                    list.innerHTML = renderFormatItems(videos);
                } else {
                    list.innerHTML = renderFormatItems(audios);
                }
                attachFormatListeners();
            });
        });

        attachFormatListeners();
        attachDownloadListener(data);
    }

    function renderFormatItems(items) {
        if (!items.length) return '<p style="text-align:center;color:var(--text-muted);padding:12px;">No formats available</p>';
        return items.map(function (f) {
            var label = f.format_note || f.format || 'Unknown';
            var desc = '';
            if (f.vcodec && f.vcodec !== 'none') {
                desc = f.vcodec.toUpperCase();
            } else if (f.acodec && f.acodec !== 'none') {
                desc = f.acodec.toUpperCase();
            }
            if (f.filesize || f.filesize_approx) {
                var sz = f.filesize || f.filesize_approx;
                label += ' (' + formatSize(sz) + ')';
            }
            return '<div class="format-item" data-id="' + f.format_id + '">' +
                '<div class="format-left"><div class="radio"></div>' +
                '<div><div class="format-label">' + escapeHtml(label) + '</div>' +
                '<div class="format-desc">' + escapeHtml(desc) + ' &middot; ' + escapeHtml(f.ext || '') + '</div></div></div>' +
                '</div>';
        }).join('');
    }

    function attachFormatListeners() {
        singleResult.querySelectorAll('.format-item').forEach(function (el) {
            el.addEventListener('click', function () {
                singleResult.querySelectorAll('.format-item').forEach(function (x) { x.classList.remove('selected'); });
                el.classList.add('selected');
                selectedFormatId = el.dataset.id;
            });
        });
    }

    function attachDownloadListener(data) {
        var btn = singleResult.querySelector('#downloadFileBtn');
        if (!btn) return;
        btn.addEventListener('click', function () {
            if (!selectedFormatId) {
                showToast('Please select a format');
                return;
            }
            startDownload(data.url, selectedFormatId, btn);
        });
    }

    function renderPlaylist(data) {
        resultEl.classList.add('hidden');
        playlistResult.classList.remove('hidden');

        var html = '<div class="playlist-title">' + escapeHtml(data.title || 'Playlist') + '</div>';
        if (data.uploader) html += '<div class="playlist-info">' + escapeHtml(data.uploader) + ' &middot; ' + (data.entries ? data.entries.length : 0) + ' videos</div>';
        html += '<div class="playlist-items">';

        (data.entries || []).forEach(function (entry, i) {
            var thumb = entry.thumbnail || '';
            var dur = formatDuration(entry.duration);
            html += '<div class="playlist-item" data-url="' + escapeAttr(entry.url || entry.webpage_url) + '">';
            html += '<span class="pl-index">' + (i + 1) + '</span>';
            if (thumb) html += '<img class="pl-thumb" src="' + escapeAttr(thumb) + '" alt="" loading="lazy">';
            html += '<span class="pl-title">' + escapeHtml(entry.title || 'Untitled') + '</span>';
            if (dur) html += '<span class="pl-duration">' + dur + '</span>';
            html += '</div>';
        });

        html += '</div></div>';
        playlistContent.innerHTML = html;

        playlistContent.querySelectorAll('.playlist-item').forEach(function (el) {
            el.addEventListener('click', function () {
                urlInput.value = el.dataset.url;
                startFetch();
            });
        });
    }

    function startDownload(url, formatId, btn) {
        btn.disabled = true;
        btn.textContent = 'Preparing...';

        var pw = singleResult.querySelector('#progressWrap');
        var pf = singleResult.querySelector('#progressFill');
        var pl = singleResult.querySelector('#progressLabel');
        var pp = singleResult.querySelector('#progressPercent');
        var dl = singleResult.querySelector('#downloadLink');
        var err = singleResult.querySelector('#error');

        if (pw) pw.classList.remove('hidden');
        if (dl) dl.classList.add('hidden');
        if (err) err.classList.add('hidden');
        if (pf) pf.style.width = '0%';
        if (pl) pl.textContent = 'Starting...';
        if (pp) pp.textContent = '0%';

        fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url, format_id: formatId })
        })
        .then(function (r) {
            if (!r.ok) return r.json().then(function (d) { throw new Error(d.detail || 'Download failed'); });
            return r.json();
        })
        .then(function (data) {
            btn.textContent = 'Downloading...';
            pollProgress(data.file_id, btn, pf, pl, pp, dl, err, pw);
        })
        .catch(function (err) {
            btn.disabled = false;
            btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download';
            if (pw) pw.classList.add('hidden');
            if (err) {
                err.textContent = err.message;
                err.classList.remove('hidden');
            } else {
                showError(err.message);
            }
            showToast(err.message);
        });
    }

    function pollProgress(fileId, btn, pf, pl, pp, dl, err, pw) {
        var attempts = 0;
        var maxAttempts = 300;

        function poll() {
            attempts++;
            if (attempts > maxAttempts) {
                if (pw) pw.classList.add('hidden');
                btn.disabled = false;
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download';
                showError('Download timed out');
                return;
            }

            fetch('/api/progress/' + fileId)
            .then(function (r) {
                if (!r.ok) throw new Error('Progress fetch failed');
                return r.json();
            })
            .then(function (data) {
                var pct = data.percent || 0;
                if (pf) pf.style.width = pct + '%';
                if (pp) pp.textContent = pct.toFixed(1) + '%';
                if (pl) pl.textContent = data.status || 'Downloading...';

                if (data.status === 'complete' || pct >= 100) {
                    if (pw) pw.classList.add('hidden');
                    btn.disabled = false;
                    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download';
                    var filename = data.filename || 'download';
                    if (dl) {
                        dl.classList.remove('hidden');
                        dl.innerHTML = '<span class="success-icon">&#10003;</span><div><a href="/api/file/' + fileId + '" download="' + filename + '">' + escapeHtml(filename) + '</a><span class="file-size">' + formatSize(data.filesize || 0) + '</span></div>';
                    }
                    saveHistory(filename, urlInput.value.trim());
                    clearInterval(pollTimer);
                    triggerDownload('/api/file/' + fileId, filename);
                    showToast('Download complete — saving to your device');
                    return;
                }

                if (data.status === 'error') {
                    if (pw) pw.classList.add('hidden');
                    btn.disabled = false;
                    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download';
                    if (err) {
                        err.textContent = data.message || 'Download failed';
                        err.classList.remove('hidden');
                    }
                    showToast(data.message || 'Download failed');
                    clearInterval(pollTimer);
                    return;
                }

                if (pct < 100) {
                    pollTimer = setTimeout(poll, 500);
                }
            })
            .catch(function () {
                pollTimer = setTimeout(poll, 1000);
            });
        }

        poll();
    }

    function saveHistory(title, url) {
        try {
            var arr = JSON.parse(localStorage.getItem('ss-history') || '[]');
            arr.unshift({ title: title, url: url, time: Date.now() });
            if (arr.length > 20) arr = arr.slice(0, 20);
            localStorage.setItem('ss-history', JSON.stringify(arr));
            renderHistory();
        } catch (e) {}
    }

    function renderHistory() {
        try {
            var arr = JSON.parse(localStorage.getItem('ss-history') || '[]');
            if (!arr.length) {
                historySection.classList.add('hidden');
                return;
            }
            historySection.classList.remove('hidden');
            historyList.innerHTML = arr.map(function (item, i) {
                return '<div class="history-item fade-in">' +
                    '<div class="h-info"><div class="h-title">' + escapeHtml(item.title) + '</div><div class="h-meta">' + new Date(item.time).toLocaleString() + '</div></div>' +
                    '<button class="h-remove" data-index="' + i + '">&times;</button>' +
                    '</div>';
            }).join('');
            historyList.querySelectorAll('.h-remove').forEach(function (btn) {
                btn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    removeHistory(parseInt(this.dataset.index));
                });
            });
            historyList.querySelectorAll('.history-item').forEach(function (el) {
                el.addEventListener('click', function () {
                    var idx = parseInt(this.querySelector('.h-remove').dataset.index);
                    try {
                        var arr = JSON.parse(localStorage.getItem('ss-history') || '[]');
                        if (arr[idx]) urlInput.value = arr[idx].url;
                    } catch (e) {}
                });
            });
        } catch (e) {}
    }

    function removeHistory(index) {
        try {
            var arr = JSON.parse(localStorage.getItem('ss-history') || '[]');
            arr.splice(index, 1);
            localStorage.setItem('ss-history', JSON.stringify(arr));
            renderHistory();
        } catch (e) {}
    }

    // ---- Direct download trigger ----
    function triggerDownload(url, filename) {
        var a = document.createElement('a');
        a.href = url;
        a.download = filename || 'download';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () { document.body.removeChild(a); }, 2000);
        if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
            fetch(url)
                .then(function (r) { return r.blob(); })
                .then(function (blob) {
                    if (navigator.canShare && navigator.canShare({ files: [new File([blob], filename)] })) {
                        navigator.share({ files: [new File([blob], filename)], title: filename });
                    }
                })
                .catch(function () {});
        }
    }

    // ---- Toast ----
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.remove('hidden');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(function () { toast.classList.add('hidden'); }, 3000);
    }

    // ---- Helpers ----
    function resetUI() {
        resultEl.classList.add('hidden');
        playlistResult.classList.add('hidden');
        var pw = document.getElementById('progressWrap');
        if (pw) pw.classList.add('hidden');
    }

    function showLoader() { loader.classList.remove('hidden'); }
    function hideLoader() { loader.classList.add('hidden'); }
    function showError(msg) { errorEl.textContent = msg; errorEl.classList.remove('hidden'); }
    function hideError() { errorEl.classList.add('hidden'); }

    function formatDuration(secs) {
        if (!secs && secs !== 0) return '';
        var m = Math.floor(secs / 60);
        var s = Math.floor(secs % 60);
        if (m >= 60) {
            var h = Math.floor(m / 60);
            m = m % 60;
            return h + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
        }
        return m + ':' + String(s).padStart(2, '0');
    }

    function formatSize(bytes) {
        if (!bytes) return '';
        var units = ['B', 'KB', 'MB', 'GB'];
        var i = 0;
        var size = bytes;
        while (size >= 1024 && i < units.length - 1) { size /= 1024; i++; }
        return size.toFixed(i > 0 ? 1 : 0) + ' ' + units[i];
    }

    function formatNumber(n) {
        if (n == null) return '';
        if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
        if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
        if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
        return String(n);
    }

    function escapeHtml(str) {
        if (!str) return '';
        var d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function escapeAttr(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // ---- Platform badges ----
    function renderPlatforms() {
        var html = PLATFORMS.map(function (p) {
            var svg = PLATFORM_SVGS[p.name] || '';
            return '<span class="platform-badge" style="--brand:' + p.color + '">' + svg + escapeHtml(p.name) + '</span>';
        }).join('');
        html += '<span class="platform-badge platform-badge-more">&amp; 1000+ more</span>';
        platformGrid.innerHTML = html;
    }

    // ---- Init ----
    renderHistory();
    renderPlatforms();
})();
