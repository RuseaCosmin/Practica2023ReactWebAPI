using Microsoft.Extensions.DependencyInjection;
using test.Business.Contracts;
using test.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Practica2023React.Business.Contracts;
using Practica2023React.Data.Repositories;

namespace test.Data
{
    public static class DataConfig
    {
        public static void ApplyDataServices(this IServiceCollection services)
        {
            services.AddTransient<ICategoryRepository,CategoryRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IJWTTokenServices,JWTServiceManage>();
            services.AddTransient<ICartRepository,CartRepository>();

        }
    }
}
