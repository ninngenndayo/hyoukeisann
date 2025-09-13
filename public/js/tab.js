(function()
{
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

    function showTab(tab)
    {
        tabs.forEach(t =>
        {
            const panel = document.getElementById(t.getAttribute('aria-controls'));
            if (t === tab)
            {
                t.setAttribute('aria-selected','true');
                t.tabIndex = 0;
                panel.classList.add('active');
                panel.removeAttribute('hidden');
                t.focus();
            }
            else
            { 
                t.setAttribute('aria-selected','false');
                t.tabIndex = -1;
                panel.classList.remove('active');
                panel.setAttribute('hidden','');
            }
        });
    }

    function findNextIndex(currentIndex, dir)
    {
        const n = tabs.length;
        return (currentIndex + dir + n) % n;
    }

    tabs.forEach((tab, index) =>
    {
        tab.addEventListener('click', ()=> showTab(tab));
        tab.addEventListener('keydown', (e) =>
        {
            const key = e.key;
            if (key === 'ArrowRight' || key === 'Right')
            {
                e.preventDefault();
                const next = tabs[findNextIndex(index, +1)];
                showTab(next);
            }
            else if (key === 'ArrowLeft' || key === 'Left')
            {
                e.preventDefault();
                const prev = tabs[findNextIndex(index, -1)];
                showTab(prev);
            }
            else if (key === 'Home')
            {
                e.preventDefault();
                showTab(tabs[0]);
            }
            else if (key === 'End')
            {
                e.preventDefault();
                showTab(tabs[tabs.length-1]);
            }
            else if (key === 'Enter' || key === ' ' /* space */)
            {
                e.preventDefault();
                showTab(tab);
            }
        });
    });

    // 初期状態の tabindex
    tabs.forEach(t =>
    {
        t.tabIndex = (t.getAttribute('aria-selected') === 'true') ? 0 : -1;
    });
})();