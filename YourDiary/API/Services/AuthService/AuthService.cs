using System;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using CryptoHelper;
using Microsoft.IdentityModel.Tokens;
using YourDiary.API.ViewModels.Auth;
using YourDiary.Model;

namespace YourDiary.API.Services.AuthService
{
    public class AuthService : IAuthService
    {
        readonly string jwtSecret;
        readonly int jwtLifespan;
        public AuthService(string jwtSecret, int jwtLifespan)
        {
            this.jwtSecret = jwtSecret;
            this.jwtLifespan = jwtLifespan;
        }
        
        public AuthData GetAuthData(User userData)
        {
            var expirationTime = DateTime.UtcNow.AddSeconds(jwtLifespan);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, userData.Id)
                }),
                Expires = expirationTime,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)), 
                    SecurityAlgorithms.HmacSha256Signature
                )
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
                        
            return new AuthData{
                Token = token,
                TokenExpirationTime = ((DateTimeOffset)expirationTime).ToUnixTimeSeconds(),
                Id = userData.Id,
                Email = userData.Email,
                Username = userData.Username
            };
        }
        
        public string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }
        
        public bool VerifyPassword(string actualPassword, string hashedPassword)
        {
            return Crypto.VerifyHashedPassword(hashedPassword, actualPassword);
        }
    }
}