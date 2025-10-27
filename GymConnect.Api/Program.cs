using GymConnect.Api.Hubs;
using GymConnect.Api.Peristence;
using GymConnect.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//var app = builder.Build();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));



//builder.Services.AddDbContext<AppDbContext>(options =>
//{
//    options
//        .UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
//        .UseSnakeCaseNamingConvention();
//});



// Add Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IGymService, GymService>();
builder.Services.AddScoped<IAuthService, AuthService>();    
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddSignalR();



// Add Controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();




// JWT Authentication
var key = Encoding.UTF8.GetBytes(builder.Configuration["JwtKey"] ?? "super_secret_key_12345");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/hubs/chat");


app.Run();
