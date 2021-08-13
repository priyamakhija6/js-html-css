const root = document.documentElement;
const themeBtns = document.querySelectorAll('.theme > button');

//themeBtns.addEventListener("click",handleThemeUpdate);

themeBtns.forEach((btn) => {
    btn.addEventListener('click', handleThemeUpdate)
})

function handleThemeUpdate(e) {
    switch(e.target.value) {
        case 'dark':
            root.style.setProperty('--bgcolor','#26001b');
            root.style.setProperty('--textclr','#eeebdd');
            break;
        case  'calm':
            root.style.setProperty('--bgcolor','#edffec');
            root.style.setProperty('--textclr','#282846');
            break;

        case  'light':
            root.style.setProperty('--bgcolor','#e7e6e1');
            root.style.setProperty('--textclr','#314e52');
            break;
    }
}
