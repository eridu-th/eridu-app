const toggleLeftNavBtnWrapper = document.querySelector('.left_toggle_btn');
const toggleLeftNavBtn = toggleLeftNavBtnWrapper.querySelector('input');
toggleLeftNavBtn.onclick = function (event) {
    if (!event.target.checked) {
        toggleLeftNavBtnWrapper.style.left = 0;
        unpinSidenav();
    } else {
        toggleLeftNavBtnWrapper.style.left = `250px`;
        pinSidenav();
    }
}

function pinSidenav() {
    $('.sidenav-toggler').addClass('active');
    $('.sidenav-toggler').data('action', 'sidenav-unpin');
    $('body').removeClass('g-sidenav-hidden').addClass('g-sidenav-show g-sidenav-pinned');
    $('body').append('<div class="backdrop d-xl-none" data-action="sidenav-unpin" data-target=' + $('#sidenav-main').data('target') + ' />');
}

function unpinSidenav() {
    $('.sidenav-toggler').removeClass('active');
    $('.sidenav-toggler').data('action', 'sidenav-pin');
    $('body').removeClass('g-sidenav-pinned').addClass('g-sidenav-hidden');
    $('body').find('.backdrop').remove();
}