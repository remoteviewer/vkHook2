alert("vkHook.js loaded")

var IM {
    onKey: function (e) {
        alert("onKey hook success");
        var inputActive = (e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA' || hasClass(e.target, 'im_editable') || e.target.getAttribute('contenteditable'));
        
        if (false && e.keyCode > 47 && e.keyCode < 58) { // 0 - 9 keys for tab switching
            var num = e.keyCode - 49, i = 0;
            e = e.originalEvent || e;
            if (browser.safari ? e.ctrlKey : (browser.mac ? (e.metaKey || e.ctrlKey) : (e.altKey || e.metaKey || e.ctrlKey))) {
                if (num == -1) num = 9;
                each(ge('im_tabs').childNodes, function () {
                    if (!hasClass(this, 'im_tab') && !hasClass(this, 'im_tab_selected')) return;
                    if (i == num) {
                        IM.activateTab(this.id.match(/-?\d+/)[0]);
                        return false;
                    }
                    i++;
                });
                return cancelEvent(e);
            }
        }
        if (e.keyCode == KEY.UP || e.keyCode == KEY.DOWN) {
            /*if (!Emoji.emojiMove(e)) {
        return false;
      }*/
            if (cur.peer == 0) {
                IM.friendOver(false, e.keyCode);
                return cancelEvent(e);
            }
        } else if (e.keyCode == 13 && (cur.peer == 0 || cur.peer == -2)) {
            var el = geByClass1('im_friend_over', cur.multi ? ge('im_friends_all') : cur.imEl.friends, 'div');
            if (cur.peer == -2 || (cur.searchQ || cur.qDay) && !el) {
                if (!cur.peer) {
                    cur.qDay = cur.qPeer = cur.qPeerShown = false;
                }
                IM.searchMessages();
            } else if (el) {
                if (e.target.blur) {
                    e.target.blur();
                }
                setTimeout(el.onclick, 0);
                return cancelEvent(e);
            }
                } else if ((e.keyCode == KEY.PAGEUP || e.keyCode == KEY.PAGEDOWN) && !e.ctrlKey && !e.metaKey && !browser.opera) {
                    var scrollStep = lastWindowHeight - cur.imEl.head.clientHeight - cur.imEl.nav.offsetHeight - cur.imEl.controls.offsetHeight,
                        st = scrollGetY(true);
                    
                    scrollToY(st + (e.keyCode == KEY.PAGEUP ? -1 : 1) * scrollStep, 0);
                    return cancelEvent();
                    
                } else if (e.keyCode > 40 && !e.ctrlKey && !e.metaKey && !inputActive && !(e.keyCode > 165 && e.keyCode < 184)) {
                    if (cur.editable && !IM.r()) {
                        Emoji.editableFocus(ge('im_editable' + cur.peer), false, true);
                    } else {
                        var el = ge(!IM.r() ? 'im_txt' + cur.peer : 'im_filter');
                        !el.active && elfocus(el);
                    }
                } else if (e.keyCode == KEY.ESC) {
                    if (Emoji.shown) {
                        Emoji.editableFocus(IM.getTxt(cur.peer), false, true);
                        Emoji.ttClick(ge((cur.peer == -3) ? 'imw_smile' : 'im_smile'), true);
                        cur.emojiFocused = false;
                    } else {
                        IM.activateTab(-1);
                    }
                } else if (e.keyCode == KEY.ENTER) {
                    if (!Emoji.emojiEnter(cur.emojiId[cur.peer], e)) {
                        return false;
                    }
                }
                    return true;
    }
};