using System;

namespace API.Models
{
    public class LoginRequest
    {
        public string Email { get; set; }

        public LoginRequest()
        {
            Email = string.Empty;
        }
    }
}
