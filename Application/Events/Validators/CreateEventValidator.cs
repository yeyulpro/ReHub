using Application.Activities.Validator;
using Application.Events.Commands;
using Application.Events.Dto;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Application.Events.Validators
{
	public class CreateEventValidator : BaseEventValidator<CreateEvent.Command,CreateEventDto>
	{
		public CreateEventValidator() : base(x => x.EventDto)
		{
			


		}
	}
}
