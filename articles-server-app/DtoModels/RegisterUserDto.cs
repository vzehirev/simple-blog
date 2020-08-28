﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace articles_server_app.DtoModels
{
    public class RegisterUserDto
    {
        //[Required, EmailAddress]
        public string Email { get; set; }

        //[Required]
        public string Password { get; set; }

        //[Required]
        public string ConfirmPassword { get; set; }
    }
}