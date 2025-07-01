
const supabaseClient = supabase.createClient('https://kxvpebcparjfkmsvmxud.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4dnBlYmNwYXJqZmttc3ZteHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNjQzOTAsImV4cCI6MjA2Njk0MDM5MH0.mf-A5EA8jFjjP6iw_02E8PN4Hv6lsP7cR6qjajOhc70')


document.getElementById("register-form").addEventListener("submit", async function (event) {
    event.preventDefault()
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let image = document.getElementById("image").value;
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(image);

    const { data, error } = await supabaseClient.auth.signUp ({
        email: email, password: password,
    })

const { error2 } = await supabaseClient
  .from('register')
  .insert({ id: Math.round(Math.random() * 101), username: username, image: image, email: email , password: password, })
  
    if (error) {
        alert(error.message)
    } 
    
    else {
        alert("Signup Successfully")
        localStorage.setItem("name",username)
        localStorage.setItem("image",image)
        window.location.href = "./login.html"
        console.log(data);
    }
}) 
