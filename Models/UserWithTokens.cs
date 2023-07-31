namespace Practica2023React.Models
{
    public class UserWithTokens
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public string RefToken { get; set; }
        public int RefTokenExp { get; set; }
    }
}
