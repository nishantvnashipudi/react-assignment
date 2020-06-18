
function passwordStrong(password){
    let strength = 0;
    if(password.match(/[a-z]+/)){
        strength +=1;
    }
    if(password.match(/[A-Z]+/)){
        strength +=1;
    }
    if(password.match(/[0-9]+/)){
        strength +=1;
    } if(password.match(/[!@#$%^&*()]+/)){
        strength +=1;
    }
    if(password.length < 6){
        let minRequired = password.length - strength;
        return `Minimum character for password is 6 is => ${minRequired} `;
    } else if(password.length >= 6 && strength > 3){
        return 'Password strong enough';
    }
}
console.log(passwordStrong('acd0A!'));
console.log(passwordStrong('AaAaa'));