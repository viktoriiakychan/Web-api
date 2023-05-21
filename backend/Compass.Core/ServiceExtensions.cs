﻿using Compass.Core.AutoMapper;
using Compass.Core.Interfaces;
using Compass.Core.Services;
using Compass.Core.Services.User;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core
{
    public static class ServiceExtensions
    {
        public static void AddCoreServices(this IServiceCollection services)
        {
            // User service
            services.AddTransient<UserService>();

            // Jwt Service
            services.AddTransient<JwtService>();
            
            // Email Service
            services.AddTransient<EmailService>();

            // Category service
            services.AddTransient<ICategoryService, CategoryService>();
            
            // Course service
            services.AddTransient<ICourseService, CourseService>();
        }

        // Add automapper
        public static void AddAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(AutoMapperUserProfile));
            services.AddAutoMapper(typeof(AutoMapperCategoryAndProductProfile));
            services.AddAutoMapper(typeof(AutoMapperCourseProfile));
        }
    }
}
