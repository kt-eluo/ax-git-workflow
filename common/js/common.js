    // 이미지 클릭 시 전체화면 팝업
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.img img').forEach(function(img) {
          // .img 태그의 자식 img 모두에 안내 문구 적용
          img.addEventListener('click', function(e) {
            // 팝업 오버레이 생성
            const overlay = document.createElement('div');
            overlay.className = 'img-popup-overlay';
            overlay.tabIndex = 0;
            // 닫기 버튼
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', '이미지 닫기');
            overlay.appendChild(closeBtn);
            // 이미지
            const popupImg = document.createElement('img');
            popupImg.src = img.src;
            popupImg.alt = img.alt || '';
            overlay.appendChild(popupImg);
            document.body.appendChild(overlay);
            // 닫기 함수
            function closePopup() {
              overlay.remove();
              document.removeEventListener('keydown', escHandler);
            }
            // ESC로 닫기
            function escHandler(e) {
              if (e.key === 'Escape') closePopup();
            }
            // 바깥 클릭 시 닫기
            overlay.addEventListener('click', function(e) {
              if (e.target === overlay) closePopup();
            });
            closeBtn.addEventListener('click', closePopup);
            document.addEventListener('keydown', escHandler);
            // 포커스 이동
            closeBtn.focus();
          });
          // 안내 문구 오버레이
          let guide;
          function showGuide() {
            if (!guide) {
              guide = document.createElement('div');
              guide.className = 'img-hover-guide';
              guide.innerText = '이미지를 클릭하면 자세히 보실 수 있습니다.';
              // img의 부모(.img)에 추가, 위치는 img 중앙
              img.parentElement.appendChild(guide);
              // guide 위치 조정 (img 기준 중앙)
              const rect = img.getBoundingClientRect();
              guide.style.position = 'absolute';
              guide.style.left = img.offsetLeft + img.offsetWidth/2 + 'px';
              guide.style.top = img.offsetTop + img.offsetHeight/2 + 'px';
              guide.style.transform = 'translate(-50%, -50%)';
            }
            img.parentElement.classList.add('show-guide');
          }
          function hideGuide() {
            img.parentElement.classList.remove('show-guide');
            if (guide) guide.remove();
            guide = null;
          }
          img.addEventListener('mouseenter', showGuide);
          img.addEventListener('mouseleave', hideGuide);
          // 모바일 터치 대응: 짧게 터치하면 안내, 길게/클릭하면 팝업
          let touchTimer;
          img.addEventListener('touchstart', function(e) {
            touchTimer = setTimeout(showGuide, 200);
          });
          img.addEventListener('touchend', function(e) {
            clearTimeout(touchTimer);
            setTimeout(hideGuide, 400); // 잠깐 보여주고 사라짐
          });
        });
      });

    // 복사 버튼 기능 (pre, code 태그 복사)
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('.copy-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          // 인접 pre 또는 code 태그 찾기 (이전 형제)
          let target = btn.previousElementSibling;
          if (!target || (target.tagName.toLowerCase() !== 'pre' && target.tagName.toLowerCase() !== 'code')) {
            // 버튼이 pre/code 태그 내부에 있을 경우, 부모가 pre/code
            if (btn.parentElement && (btn.parentElement.tagName.toLowerCase() === 'pre' || btn.parentElement.tagName.toLowerCase() === 'code')) {
              target = btn.parentElement;
            }
          }
          if (target && (target.tagName.toLowerCase() === 'pre' || target.tagName.toLowerCase() === 'code')) {
            // 내부 .copy-btn 버튼을 모두 임시로 숨기고 텍스트만 복사
            const btns = target.querySelectorAll('.copy-btn');
            btns.forEach(b => b.style.display = 'none');
            const text = target.innerText.trim();
            btns.forEach(b => b.style.display = '');
            navigator.clipboard.writeText(text).then(function() {
              alert('복사 되었습니다.');
            });
          }
        });
      });
    });