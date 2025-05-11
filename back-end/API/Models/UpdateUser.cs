using System;

namespace API.Models
{
    public class UpdateUserRequest
    {
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }

        public UpdateUserRequest()
        {
            Nome = string.Empty;
            Sobrenome = string.Empty;
            Email = string.Empty;
        }
    }
}
