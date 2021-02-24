const axios = require('axios');

//queries are case sensitive
const characterInfoByName = (characterName, callback) => {
    const url = `https://www.breakingbadapi.com/api/characters?name=${characterName}`;

    axios
        .get(url)
        .then(function (response) {
            //handle success
            // console.log(response.data);
            if (response.data.length !== 0) {
                callback({
                    id: response.data[0].char_id,
                    name: response.data[0].name,
                    image: response.data[0].img,
                    nickname: response.data[0].nickname,
                    status: response.data[0].status,
                });
            }
        })
        .catch(function (e) {
            //handle error
            console.log(e.message);
            console.log('error');
        });
};

module.exports = characterInfoByName;
