using API.Models;
using API.Data;

namespace API.Data
{
    public class Repository
    {
        private readonly MainDbContext _context;

        public Repository(MainDbContext context)
        {
            _context = context;
        }

        // Endpoint para lista de usuários
        public List<Usuarios> GetUsers()
        {
            return _context.Users.ToList();
        }

        // Endpoint usuário por id
        public Usuarios GetUserById(int id)
        {
            return _context.Users.Find(id);
        }

        // Endpoint atualizar usuário por id
        public bool UpdateUser(int id, UpdateUserRequest request)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                user.Nome = request.Nome;
                user.Sobrenome = request.Sobrenome;
                user.Email = request.Email;
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        // Endpoint deletar usuário por id
        public bool DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
                return true; // Retorna verdadeiro se a exclusão for bem-sucedida
            }
            return false; // Retorna falso se o usuário não for encontrado
        }

        // Endpoint para login
        public bool CheckEmailExists(string email)
        {
            return _context.Users.Any(u => u.Email == email);
        }

    }
}
