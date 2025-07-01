if (localStorage.getItem("user")) {
    let data = JSON.parse(localStorage.getItem("userData"))
    document.getElementById("btn").innerHTML = `
        <img src="${data.image}">
        <h1>${data.username}<h1>
    `
}