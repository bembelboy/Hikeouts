async function login() {
    try {
        await firebase.login(email, password)
    } catch (error) {
        alert(error.message)
    }
}

export default login;