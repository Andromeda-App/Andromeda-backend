const signupForm = document.querySelector("#SignupForm");

//hides new post button

newPost.classList.toggle("hide");

//gathers form info and sends it to user controller

signupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const userObj={
        user_name:document.querySelector("#usernameSignup").value,
        password:document.querySelector("#passwordSignup").value,
        zipCode:document.querySelector("#zipcodeSignup").value,
        email:document.querySelector("#emailSignup").value,
    }
    fetch("/users/signup",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            const userObj={
                // zipCode:document.querySelector("#zipcodeSignup").value,
                // user_name:document.querySelector("#usernameSignup").value,
                email:document.querySelector("#email").value,
                password:document.querySelector("#password").value,
            }
            fetch("/users/login",{
                method:"POST",
                body:JSON.stringify(userObj),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(res=>{
                if(res.ok){
                   location.href = "/profile"}})
        } else {
            alert("error")
        }
    })
})