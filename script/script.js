console.log("sssss")

document.getElementById("signInBtn").addEventListener("click", function(){
    const userName = document.getElementById("userName").value;
    console.log(userName);
    const password = document.getElementById("password").value;
    console.log(password);

    if(userName=="admin" && password =="admin123"){
        window.location.assign("./home.html")
    } else {
        alert("Sign In Failed. Please enter correct username & password")
    }
});

