using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException(int statusCode, string message, string? details)
    {
        public int StatusCode { get; set; } = statusCode;
        public string? Message { get; set; } = message;
        public string? Details { get; set; } = details;
    }
}