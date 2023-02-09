let Login = async () => {
     let loginData = {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
     };
     let res = await fetch(`https://reqres.in/api/login`, {
          method: "POST",
          body: JSON.stringify(loginData),
          headers: {
               "Content-Type": "application/json",
          },
     });
     let data = await res.json();
     let { email } = loginData;
     let { token } = data;
     getProfile(email, token);
};
let getProfile = async (email, token) => {
     if (token) {
          alert(`welcome ${email}`);
          window.location.assign("admin.html");
     }
};
