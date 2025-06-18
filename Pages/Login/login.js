document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/usuarios.csv");
    const data = await response.text();

    const users = data
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith("email")) 
      .map(line => {
        const [userEmail, userPassword, salario, nomeEssenciais, essenciais, nomeNaoEssenciais, naoEssenciais, poupanca] = line.split(",");
        return {
          email: userEmail ? userEmail.trim() : "",
          password: userPassword ? userPassword.trim() : "",
          salario: salario ? salario.trim() : "",
          nomeEssenciais: nomeEssenciais ? nomeEssenciais.trim() : "",
          essenciais: essenciais ? essenciais.trim() : "",
          nomeNaoEssenciais: nomeNaoEssenciais ? nomeNaoEssenciais.trim() : "",
          naoEssenciais: naoEssenciais ? naoEssenciais.trim() : "",
          poupanca: poupanca ? poupanca.trim() : ""
        };
      })
      .filter(user => user.email && user.password);

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      sessionStorage.setItem("usuarioDados", JSON.stringify(user));

      alert("Login bem-sucedido!");
      window.location.href = "/Pages/dashboard/grafico.html";
    } else {
      alert("Email ou senha inválidos.");
    }
  } catch (error) {
    console.error("Erro ao carregar o arquivo CSV:", error);
    alert("Ocorreu um erro ao tentar fazer login.");
  }
});