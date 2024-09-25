export function openModal (popup) {
    popup.classList.add("popup_is-animated");
    setTimeout( function () {
        popup.classList.add('popup_is-opened');
    }, 1);
};

    