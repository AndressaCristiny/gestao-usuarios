using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Repository _repository;

        public UsersController(Repository repository)
        {
            _repository = repository;
        }


        // Endpoint para lista de usuários
        [HttpGet]
        public IActionResult GetUsers()
        {
            try
            {
                var users = _repository.GetUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Endpoint usuário por id
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            try
            {
                var user = _repository.GetUserById(id);
                if (user != null)
                    return Ok(user);
                return NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Endpoint atualizar usuário por id
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UpdateUserRequest request)
        {
            try
            {
                var success = _repository.UpdateUser(id, request);
                if (success)
                    return Ok(); // Retorna 200 OK se a atualização for bem-sucedida
                else
                    return NotFound(); // Retorna 404 Not Found se o usuário não for encontrado
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Retorna 500 Internal Server Error se ocorrer um erro interno
            }
        }

        // Endpoint para deletar usuário por id
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                var success = _repository.DeleteUser(id);
                if (success)
                    return Ok(); // Retorna 200 OK se a exclusão for bem-sucedida
                else
                    return NotFound(); // Retorna 404 Not Found se o usuário não for encontrado
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Retorna 500 Internal Server Error se ocorrer um erro interno
            }
        }

        // Endpoint para login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            bool emailExists = _repository.CheckEmailExists(request.Email);

            if (emailExists)
            {
                var msg = "Email existe! Login efetuado com sucesso.";
                return Ok(new { msg });
            }
            else
            {
                return NotFound(); // Retorna 404 Not Found se o email não for encontrado
            }

            // Se as credenciais estiverem incorretas ou o usuário não existir, retorne um status de não autorizado (401)
            return Unauthorized();
        }

    }
}
