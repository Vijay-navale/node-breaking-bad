const form = document.querySelector('form');
const search = document.querySelector('input');
const loading = document.getElementById('loading');
const char_data = document.getElementById('char_data');

const getCharInfo = (char_name) => {
    fetch(`/getbbchar?character_name=${char_name}`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            console.log(data);
            const charInfo = data;
            if (charInfo.error) {
                loading.textContent = '';
                char_data.innerHTML = `Search Result not found`;
            } else {
                char_data.innerHTML = `
            <h1>${charInfo.charName}</h1>
            <h3>${charInfo.nickname}</h3>
            <img src="${charInfo.image}" class='char_img' alt="">
            `;
            }
            loading.textContent = '';
        })
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const charName = search.value;
    console.log(charName);
    loading.textContent = 'Loading...';
    char_data.innerHTML = ''
    getCharInfo(charName);
    search.value = '';
});
