using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;

namespace Application.Events.Dto
{
    public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null)
        : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
    {
        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (validator == null) return await next();

            var validationResult = await validator.ValidateAsync(request, cancellationToken);

            if (!validationResult.IsValid)
            {
                // Console.WriteLine("Validator is running for: " + typeof(TRequest).Name);
                // foreach (var error in validationResult.Errors)
                // {
                //     Console.WriteLine($"{error.PropertyName} → {error.ErrorMessage}");
                // }
                throw new ValidationException(validationResult.Errors);
            }
            return await next();
        }
    }
}