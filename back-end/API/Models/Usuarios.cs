using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("usuarios")]
    public class Usuarios
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }

        public Usuarios()
        {
            Nome = string.Empty;
            Sobrenome = string.Empty;
            Email = string.Empty;
        }
    }
}
