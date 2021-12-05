const loginForm = document.querySelector("#loginForm");

//hide new post button

newPost.classList.toggle("hide");

//send form info to user controller to login

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const userObj={
        email:document.querySelector("#loginEmail").value,
        password:document.querySelector("#loginPassword").value,
    }
    fetch("/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/profile"
        } else {
            alert("Wrong email and/or password")
        }
    })
})