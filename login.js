
const supabaseClient = supabase.createClient('https://kxvpebcparjfkmsvmxud.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4dnBlYmNwYXJqZmttc3ZteHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNjQzOTAsImV4cCI6MjA2Njk0MDM5MH0.mf-A5EA8jFjjP6iw_02E8PN4Hv6lsP7cR6qjajOhc70')

async function login(event) {

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });
  const { error2 } = await supabaseClient
  .from('auth')
  .insert({ id: Math.round(Math.random() * 101), email : email , password: password, })

  if (error) {
    alert( error.message );
  } else {
    alert("✅ Login succesfully" );
    localStorage.setItem("isLoggedIn", "true"); 
    localStorage.setItem("user", JSON.stringify(data.user)); 
3
    window.location.href = "./dashboard.html";
  }
}





